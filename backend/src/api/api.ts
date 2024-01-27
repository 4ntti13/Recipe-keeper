// api.ts:

import express, {Request, Response, Router} from 'express';
import pool from '../db/db'

const router: Router = express.Router();



router.get('/recipes', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM recipes');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Virhe haettaessa reseptejä' });
    }
})




export default Router;