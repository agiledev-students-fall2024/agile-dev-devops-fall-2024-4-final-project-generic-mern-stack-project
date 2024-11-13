require('dotenv').config();
const { AssemblyAI } = require('assemblyai');

const client = new AssemblyAI({
  apiKey: `${process.env.TRANSCRIBE_API_KEY}`
})

const transcribe = async (audioFile) => {
    let params = {
        audio: audioFile,
        speaker_labels: true
      }
  const transcript = await client.transcripts.transcribe(params)

  if (transcript.status === 'error') {
    console.error(`Transcription failed: ${transcript.error}`)
    process.exit(1)
  }

  console.log(transcript.text);

  if (Array.isArray(transcript.utterances)) {
    for (let utterance of transcript.utterances) {
        console.log(`Speaker ${utterance.speaker}: ${utterance.text}`);
    }
    }
    else{
        console.log("File could not be transcribed");
    }

    return transcript;

}

module.exports = {transcribe};


