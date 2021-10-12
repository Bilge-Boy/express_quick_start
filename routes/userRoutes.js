const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Get all users --done!
router.get('/', async (req, res) => {
    const users = await userService.getUsers();
    res.send(users);
})

// Get a specific user -- done!
router.get('/:name', async (req, res) => { // user/michael@gmail.com
    const { name } = req.params;
    const user = await userService.getUser(name);
    if(!user) {
        res.status(404).send();
    }
    else {
        res.send(user);
    }
    
})

// Create a user
router.post('/', async (req, res) => { // add a user
    const user = req.body;
    const isUserAdded = await userService.add(user);
    console.log(isUserAdded)
    if(isUserAdded){
        const allUsersReserved = await userService.getUsers();
        res.status(200).send("added successfully! \n here is the usrs="+ allUsersReserved.);
    } else {
        res.status(404).send();
    }

    //console.log(req.body)
    // if (user.email && user.password && user.name) {
    //     const success = await userService.add(user);
    //     if (success) {
    //         res.status(201).send('User added successfully');
    //     } else {
    //         res.status(203).send('Rejected')
    //     }
    // } else {
    //     res.status(203).send('Rejected')
    // }
})

// Delete a user
router.delete('/:email', (req, res) => {
    const { email } = req.params;
    const i = userService.deleteUser(email);
    res.send("done");
})

// Update a user
router.put('/:email', (req, res) => {
    const toUpdate = req.body;
    const { email } = req.params;
    const updatedUser = userService.update(email, toUpdate);
    console.log(updatedUser)
    if (updatedUser) {
        res.send(updatedUser);
    } else {
        res.status(400).send();
    }
})


module.exports = router;