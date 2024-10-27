const express = require('express');
const router = express.Router();
const {transcribe} = require('./transcriberAI')
const multer = require('multer');
const uploadMulter = multer({ dest: 'uploads/' });
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

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
    }
});

module.exports = router;