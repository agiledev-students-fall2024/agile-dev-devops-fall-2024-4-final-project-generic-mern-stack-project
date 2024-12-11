const express = require('express');
const router = express.Router();
const {transcribe} = require('./transcriberAI')
const multer = require('multer');
const uploadMulter = multer({ dest: 'uploads/' });
const bodyParser = require('body-parser');
const { summarizeText } = require('./aiFeatures');
const noteRouter = require('./note');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use('/notes', noteRouter);

router.post('/transcribe', uploadMulter.single('audio'), async (req, res) => {
    try {
        // console.log("Body", req.body); // for debugging
        let audioSRC;
        if (req.file) {
            audioSRC = req.file.path;
        }
         else if(req.body.audio){
             audioSRC = req.body.audio;
        }
        else{
            return res.status(400).json({ error: 'No file uploaded or URL provided' });
        }
        const transcript = await transcribe(audioSRC);
        const actualTranscript = transcript.text;
        res.status(200).send({ actualTranscript });

    } catch (error) {
        console.error("Transcription Error", error);
        res.status(500).json({ error: 'Failed to transcribe' });
    }})


router.post('/summarize', async (req, res) => {
    console.log('Request Headers:', req.headers); // Log request headers
    console.log('Request Body:', req.body);       // Log entire request body
    
    const textData = req.body.text;
    
    if (!textData) {
        return res.status(400).json({ error: 'Text is required for summarization' });
    }
    try {
        const summary = await summarizeText(textData);
        res.json({ summary });
    } catch (error) {
        res.status(500).json({ error: 'Failed to summarize text', message: error.message });
    }
});

module.exports = router;
