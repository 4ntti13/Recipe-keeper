import express, {Request, Response, Router} from 'express';

const router: Router = express.Router();

router.get('/recipes', (req: Request, res: Response) => {
    res.json({message: 'Hae kaikki reseptit'});
})

export default Router;