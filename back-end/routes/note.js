const express = require('express');
const Note = require('../models/note');
const { verifyToken } = require('../middleware/auth'); //  token-verification
const router = express.Router();


router.post('/', verifyToken, async (req, res) => {

    console.log('Body', req.body);

    const { title, content, tags, category, preview, updatedAt, user} = req.body;
    console.log("Create new note post");
    const newNote = new Note({
        title,
        content,
        tags,
        author: req.userId,
        category,
        preview,
        updatedAt,
        user,
    });

    try {
        await newNote.save(); // for the database part
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        console.log('hello');
        res.status(200);
        // const notes = await Note.find({ author: req.userId }).populate('author', 'username email');
        // res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.get('/:id', verifyToken, async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, author: req.userId }).populate('author', 'username email');
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    const { title, content, tags } = req.body;

    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, author: req.userId },
            { title, content, tags, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.status(200).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, author: req.userId });
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
