// import and instantiate express
import express from 'express'
const router = express.Router();
import Setting from "../models/setting.model.js";

// muted words
router.get("/api/muted-words", async (req, res) => {
    const words = []

    // replace with getting user id from cookies
    const id = '6740c351fdcb802f3f7ec5e7'

    const user = await Setting.findOne({ userId: id });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const mutedWordData = user.mutedWords;

    // read data in from file
    mutedWordData.forEach(x => {
        words.push(x)
    })

    try {
        res.json(words);
    } catch (error) {
        res.status(500).json({ error: "Could not get data." })
    }
});

// mute and unmute words
router.post("/api/muted-words", async (req, res) => {
    const request = req.body.request
    let words = req.body.words;

    if (request === 'unmute') {
        const wordId = req.body.id;

        try {
            words = words.filter(word => word.id !== wordId);

            mutedWordData.length = 0;
            mutedWordData.push(...words);

            res.status(200).json(words)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to unblock community' });
        }
    }
    else if (request === 'mute') {
        const word = req.body.word;
        const lastId = mutedWordData.length ? mutedWordData[mutedWordData.length - 1].id : 0;

        try {
            // preventing duplicates
            const wordInList = words.find(w => w.muted_word === word);

            if (wordInList) {
                return res.status(200).json({
                    words: mutedWordData,
                    message: "You have already blocked this commmunity.",
                });
            }

            const newWord = {
                id: lastId + 1,
                muted_word: word
            }
            words.push(newWord)

            mutedWordData.length = 0;
            mutedWordData.push(...words);

            res.status(200).json({ words: mutedWordData, message: "Muted word successfully!" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to mute word' });
        }
    }
});

export default router;