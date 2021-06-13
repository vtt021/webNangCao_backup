const express = require('express');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

const router = express.Router();
// const schema = require('../schema/user.json');
const saltRounds = 10;

router.get('/', async (req, res) => {
    const list = await userModel.getAllUsers();
    return res.json(list);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id || 0;
    const user = await userModel.getUserById(id);
    if (user === null) {
        return res.status(204).end();
    }
    return res.json(user);

});

router.post('/', async (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, saltRounds);
    const ids = await userModel.addUser(user);
    user.id = ids[0];
    delete user.password;
    res.status(201).json(user);
})

router.put('/', async (req, res) => {

    const id = req.body.id;
    const user = req.body.user;
    const ret = await userModel.update(id, user);

    return res.status(200).json(ret);

})

router.delete('/', async (req, res) => {

    const id = req.body.id;
    const ret = await userModel.delete(id);
    return res.status(200).json(ret);

})

module.exports = router;