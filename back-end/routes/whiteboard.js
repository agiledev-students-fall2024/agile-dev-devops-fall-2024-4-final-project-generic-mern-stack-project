// routes/whiteboard.js
const express = require('express');
const Whiteboard = require('../models/Whiteboard');
const router = express.Router();

// Whiteboard route
router.get('/whiteboard', async (req, res) => {
    // Logic for Accessing whiteboard id
    try {
        const wbName = req.query.name;
        const whiteboard = await Whiteboard.findOne({name: wbName});
    
        if(whiteboard) {
            res.status(200).json({ 
                id: whiteboard.id,
                name: whiteboard.name 
            });
        }
        else {
            res.status(400).json({ message: 'no whiteboard found'});
        }
    }
    catch (e) {
        res.status(500).json({ 
            message: "internal server error",
            error: e
        });
    }
    
});

// Create whiteboard route
router.post('/whiteboard', async (req, res) => {
    // Logic for Creating whiteboard id

    try {
        const { wbName } = req.body;

        const existingWhiteboard = await Whiteboard.findOne({name: wbName});
        if (existingWhiteboard) {
            res.status(400).json({ message: "whiteboard already exists"})
        }
        const newWhiteboard = new Whiteboard({name: wbName});
        await newWhiteboard.save();
        res.status(201).json({ message: 'whiteboard successfully created' }); 
    }
    catch (e) {
        res.status(500).json({ 
            message: "internal server error",
            error: e
        });
    }

});

// Delete whiteboard route
router.delete('/whiteboard', async (req, res) => {
    // Logic for Accessing whiteboard id
    try {
        const wbName = req.query.name;
        const whiteboard = await Whiteboard.findOne({name: wbName});
    
        if(whiteboard) {
            await Whiteboard.deleteOne({name: wbName});
            res.status(200).json({ 
                message: "whiteboard successfully deleted"
            });
        }
        else {
            res.status(400).json({ message: 'no whiteboard found'});
        }
    }
    catch (e) {
        res.status(500).json({ 
            message: "internal server error",
            error: e
        });
    }
    
});

module.exports = router;