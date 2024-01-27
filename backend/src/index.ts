import express from 'express';
import router from './api/api'

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', router);


app.get('/', (req, res) => {
    res.send('Works works?!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})

