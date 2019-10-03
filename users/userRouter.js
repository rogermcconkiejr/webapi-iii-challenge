const express = require('express');
const userModel = require('./userDb');
const postModel = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
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

router.post('/:id/posts', validatePost, (req, res) => {
const userPost = req.body;
postModel
.insert(userPost)
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

router.get('/:id', validateUserId, (req, res) => {
const id = req.user;
userModel
.getById(id)
.then(users=>{
    res.status(200).json(users)
})
.catch(error=>{
    res.status(500).json({ errorMessage: "The posts information could not be retrieved"})
})
});

router.get('/:id/posts',validateUserId, (req, res) => {
const id=req.user;
userModel
.getUserPosts(id)
.then(users=>{
    res.status(201).json(users)
})
.catch(error=>{
    res.status(500).json({ errorMessage: "Could not get user posts."})
})
});

router.delete('/:id',validateUserId, (req, res) => {
id= req.user;
userModel
.remove(id)
.then(users=>{
    res.status(204).json(users)
})
.catch(error=>{
    res.status(500).json({ errorMessage: "User data could not be removed."})
})
});

router.put('/:id',validateUserId, (req, res) => {
const id = req.user;
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
const userId = req.params.id;
if(!userId){
    res.status(400).json({ message: "invalid user id"})
} else {
    req.user = userId;
    next();
}

};

function validateUser(req, res, next) {
if (!req.body){
    res.status(400).json({ message: "missing user data"})
} else if (!req.body.name){
    res.status(400).json({ message: "missing required text field"})
} else {
    next();
}
};

function validatePost(req, res, next) {
if (!req.body){
    res.status(400).json({ message: "missing post data"})
} else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field"})
} else {
    next();
}
};

module.exports = router;
