const express = require('express');
const router = express.Router();
const {transcribe} = require('./transcriberAI')
const multer = require('multer');
const uploadMulter = multer({ dest: 'uploads/' });
const bodyParser = require('body-parser');
const { summarizeText } = require('./routes/aiFeatures');
const noteRouter = require('./routes/note');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use('/notes', noteRouter);

router.post('/transcribe', uploadMulter.single('audio'), async (req, res) => {
    try {
        console.log("Body", req.body);
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
        return res.send({ actualTranscript });

    } catch (error) {
        console.error("Transcription Error", error);
        res.status(500).json({ error: 'Failed to transcribe' });
    }})


router.post('/summarize', async (req, res) => {
    const { text } = req.body;
    try {
        const summary = await summarizeText(text);
        res.json({ summary });
    } catch (error) {
        res.status(500).json({ error: 'Failed to summarize text', message: error.message });
    }
});

module.exports = router;
