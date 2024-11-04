import './config.mjs';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
const PORT = process.env.backPORT;

app.use(cors({
  origin: `${process.env.frontPORT}`,
  credentials: true
}));

app.use(bodyParser.json());


app.listen(PORT, () => {
    console.log(process.env.backPORT)
    console.log(`Server is running on http://localhost:${PORT}`);
});
