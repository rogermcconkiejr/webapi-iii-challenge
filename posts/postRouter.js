const express = require('express');
const postModel = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
postModel
.get()
.then(posts => {
    res.json(posts);
})
.catch(error =>{
    res.status(500).json({ errorMessage: "The posts information could not be retrieved."})
})
});

router.get('/:id', (req, res) => {
const id = req.params.id;
postModel
.getById(id)
.then(posts=>{
    if (!posts) {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
    else{res.json(posts)}
})
.catch(error=>{
    res.status(500).json({ errorMessage: "The posts information could not be retrieved"})
})
});

router.delete('/:id', (req, res) => {
const id = req.params.id;
postModel
.remove(id)
.then(posts=>{
    res.status(204).json(posts)
})
.catch(error=>{
    res.status(500).json({ errorMessage: "The post could not be removed."});
})
});

router.put('/:id', (req, res) => {
const id = req.params.id;
const changes = req.body;
postModel
.update(id, changes)
.then(posts=>{
    res.status(201).json(posts)
})
.catch(error=>{
    res.status(500).json({ errorMessage: "The post could not be edited."})
})
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;