const router = require('express').Router();

const { response } = require('express');
const fs = require('fs');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);
const uuid = require('uuid/v1');

//api route
router.get('/notes', (req, res) => {
    readFromFile('db/db.json').then((notes) => {
        let parsedNotes = JSON.parse(notes);
        console.log(parsedNotes);
        return res.json(parsedNotes);
    });
});

router.post('/notes', (req, res) => {
    readFromFile('db/db.json').then((notes) => {
        let parsedNotes = JSON.parse(notes);
        let { title, text } = req.body;
        let newNote = {
            title,
            text,
            id: uuid(),
        };
        parsedNotes.push(newNote);
        writeToFile('db/db.json', JSON.stringify(parsedNotes)).then((notes) => {
            res.json(notes);
        });
    });
});

router.delete('/notes/:id', (req, res) => {
    idToDelete = req.params.id;

    readFromFile('db/db.json').then((notes) => {
        let parsedNotes = JSON.parse(notes);
        const filtered = parsedNotes.filter((note) => note.id !== idToDelete);

        writeToFile('db/db.json', JSON.stringify(filtered)).then(() => {
            res.sendStatus(204);
        });
    });
});

module.exports = router;
