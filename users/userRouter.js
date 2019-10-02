const express = require('express');
const userModel = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
const userData = req.body;
userModel
.insert(userData)
.then(user=>{
    res.status(201).json(user)
})
.catch(error=>{
    res.status(500).json({ errorMessage: "User could not be created."})
})
});

router.post('/:id/posts', (req, res) => {
const id = req.params.id;
const userPost = req.body;
userModel
.insert(id, userPost)
.then(user=>{
    res.status(200).json(user)
})
.catch(error=>{
    res.status(500).json({ errorMessage: "This post could not be created."})
})
});

router.get('/', (req, res) => {
    userModel
    .get()
    .then(users=> {
        res.json(users);
    })
    .catch(error=>{
        res.status(500).json({ errorMessage: "User data could not be retrieved."})
    })
});

router.get('/:id', (req, res) => {
const id = req.params.id;
userModel
.getById(id)
.then(users=>{
    res.status(200).json(users)
})
.catch(error=>{
    res.status(500).json({ errorMessage: "The posts information could not be retrieved"})
})
});

router.get('/:id/posts', (req, res) => {
const id=req.params.id;
userModel
.getUserPosts(id)
.then(users=>{
    res.status(201).json(users)
})
.catch(error=>{
    res.status(500).json({ errorMessage: "Could not get user posts."})
})
});

router.delete('/:id', (req, res) => {
id= req.params.id;
userModel
.remove(id)
.then(users=>{
    res.status(204).json(users)
})
.catch(error=>{
    res.status(500).json({ errorMessage: "User data could not be removed."})
})
});

router.put('/:id', (req, res) => {
const id = req.params.id;
const changes = req.body;
userModel
.update(id, changes)
.then(users=>{
    res.status(201).json(users)
})
.catch(error=>{
    res.status(500).json({ errorMessage: "user could not be updated."})
})
});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
