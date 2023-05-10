const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { findById } = require('../models/User');
const note = require('../models/Notes');
const { body, validationResult } = require('express-validator');


//Route 1 : Fetch specific user data by just get request (we send token in header)
router.get('/fetchnotes', fetchuser, async (req, res) => {
    let notes = await note.find({ user: req.user.id });

    res.json(notes);
})


//Route 2 : Add New note 
router.post('/addnote', fetchuser,
    [
        body('title', "Enter valid title").isLength({ min: 3 }),
        body('description', "Enter description").isLength({ min: 5 }),

    ],
    async (req, res) => {
        // console.log(req.body);
        const { title, description, tag } = req.body;

        // to give error if user gives wrong information....

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            //Creating new note here....... with given info

            const note1 = new note({
                title, tag, description, user: req.user.id
            })

            //To save the created note in database.....

            const saveNote = await note1.save();
            res.json(saveNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ message: error.message });
        }
    })

//Route 3 : Update exesting note.......
router.put('/updatenote/:id', fetchuser,
    [
        body('title', "Enter valid title").isLength({ min: 3 }),
        body('description', "Enter description").isLength({ min: 5 }),

    ],
    async (req, res) => {

        // to give error if user gives wrong information....

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, tag, description } = req.body;

        try {

            let note1 = await note.findById(req.params.id);
             if(!note1){return res.status(404).send("not found")}
            // console.log(note1);

            //not necessary but still check if user is updating is valid user or not .......()
            if (note1.user.toString() !== req.user.id) { return res.status(401).send("Nikal lavde chutiyapa nahi") }

            //creating extra collection to change with original.....
            let note2 = {}
            if (title) { note2.title = title }
            if (description) { note2.description = description }
            if (tag) { note2.tag = tag }

            //new syntax :
            note1 = await note.findByIdAndUpdate(req.params.id, { $set: note2 }, { new: true })

            res.send(note1);
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ sorry :"internal server error", message: error.message });
        }
    })


//Route 4 : Update exesting note.......
router.delete('/deletenote/:id', fetchuser,

    async (req, res) => {

        try {

            let note1 = await note.findById(req.params.id);
            if(!note1){return res.status(404).send("not found")}
            // console.log(note1);

            //not necessary but still check if user is updating is valid user or not .......()
            if (note1.user.toString() !== req.user.id) { return res.status(401).send("Nikal lavde chutiyapa nahi") }

            //new syntax :
            note1 = await note.findByIdAndDelete(req.params.id)

            res.send(note1);
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ message: error.message });
        }
    })

module.exports = router