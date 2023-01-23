import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import errorHandler from './middleware/error-handler.js';
import notFound from './middleware/not-found.js';

const app = express();

const port = process.env.PORT ||5000;

app.get("/", (req, res) => {
    res.send('HomePage') 
})

app.use(notFound)
app.use(errorHandler)                

app.listen(port, () => { console.log(`server listening on port... ${port}`); })

