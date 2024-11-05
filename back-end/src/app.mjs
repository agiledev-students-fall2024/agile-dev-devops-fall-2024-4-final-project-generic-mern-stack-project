import './config.mjs';
import express from 'express';
import multer from 'multer';
import axios from 'axios';
import cors from 'cors';
// import bodyParser from 'body-parser';


const app = express();
const PORT = process.env.backPORT || 5000;

app.use(cors({
  origin: `${process.env.frontPORT}`,
  credentials: true
}));

// app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)=>{
  res.send('Hi');
})

//APIs for backend
app.get('/api/activity-tracker', async (req, res) => {
  try {
    const { data } = await axios.get('https://my.api.mockaroo.com/activities_tracker?key=594b4990');
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    res.status(500).json({ error: 'Failed to fetch activity tracker data' });
  }
});

app.get('/api/challenges', async (req,res) => {
  try{
    const { data } = await axios.get('https://my.api.mockaroo.com/challenges?key=594b4990');
    res.json(data);
  }catch (error){
    console.error('Error fetching data from API:', error.message);
    res.status(500).json({ error: 'Failed to fetch activity tracker data' });
  }
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
