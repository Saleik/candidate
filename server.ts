import express from 'express'
import mongoose from 'mongoose'
import{config} from 'dotenv'

const dotenv = config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err:any, req:any, res:any, next:any) => {
    res.status(500).send({
        message: err.message
    })
})

const port =  process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
})
