import express, { Request, Response, Router } from 'express';
import pool from '../db/db';  

const router: Router = express.Router();


// READ (all):

router.get('/recipes', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM recipes');
        res.json(result.rows);
    } catch (error) {
        console.error(error);  
        res.status(500).json({ message: 'Virhe haettaessa reseptejä' });
    }
});

// CREATE:

router.post('/recipes', async (req: Request, res: Response) => {
    try {
        const { name, picture_url, guide, review } = req.body;  
        const query = `
            INSERT INTO recipes (name, picture_url, guide, review)
            VALUES ($1, $2, $3, $4)
            RETURNING *;`;
        
        const values = [name, picture_url, guide, review];

        const result = await pool.query(query, values);

        res.status(201).json(result.rows[0]);

    } catch (error) {
         console.error(error);  
         res.status(500).json({ message: 'Virhe reseptin lisäämisessä'});
    }
});

// DELETE:

router.delete('/recipes/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const deleteQuery = 'DELETE FROM recipes WHERE id = $1 RETURNING *;';

        const result = await pool.query(deleteQuery, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Reseptiä ei löydy!' });
        }

        res.status(200).json({ message: 'Resepti poistettu onnistuneesti!', deletedRecipe: result.rows[0] });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Reseptiä ei voitu poistaa!' });
    }
})

// UPDATE:

router.patch('/recipes/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { name, picture_url, guide, review } = req.body;

        const values = [];
        const updates = [];
        
        if (name) {
            values.push(name);
            updates.push(`name = $${values.length}`);
        }
        if (picture_url) {
            values.push(picture_url)
            updates.push(`picture_url = $${values.length}`);
        }
        if (guide) {
            values.push(guide);
            updates.push(`guide = $${values.length}`);
        }
        if (review !== undefined) {
            values.push(review);
            updates.push(`review = $${values.length}`);
        }

        if (updates.length === 0) {
            return res.status(400).json({ message: 'Ei päivitettäviä tietoja!' });
        }

        const query = `
            UPDATE recipes
            SET ${updates.join(', ')}
            WHERE id = $${updates.length + 1}
            RETURNING *;`;

        values.push(id);

        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(200).json({ message: 'Reseptiä ei löydy!' });
        }

        res.status(200).json(result.rows[0]);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Virhe päivittäessä reseptiä!' });
    }
})



export default router;  