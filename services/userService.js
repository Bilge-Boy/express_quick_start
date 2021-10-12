const fs = require('fs');
const { usersCollection } = require('../db');

/*
    given an interface of user (from above) make the following functions:
    add, delete, get, update
*/

async function getUsers() {
    return await usersCollection().find({}).toArray();
}

async function setUsers(users) {
    await usersCollection().insertMany(users);
}

async function getUser(name) {
    const foundUser = await usersCollection().findOne({name}); //= users.find(existingUser => existingUser.name === name);
    return foundUser;
}

async function add(user) {
    if (isUserExist(user)) {
        return false;
    } else if(user.name && user.email && user.password){
        usersCollection().insertOne({name:user.name, "email":user.email, "password":user.password});
        return true;
    }
}

function isUserExist(user){
    const isIt =  getUser(user.name);
    console.log(isIt)
    if(isIt){
        return false;
    } else {
        console.log("u are true");
        return true;
    }
}

async function deleteUser(email) {
    // const users = getUsers();
    // const filteredUsers = users.filter(existingUser => existingUser.email !== email);
    //setUsers(filteredUsers);
    return await usersCollection().deleteOne({"email":email})
}
async function update(email, data) {
    const foundUser = await getUser(email);
    if (!foundUser) return false;
    Object.keys(foundUser).forEach(key => {
        if (data[key]) {
            foundUser[key] = data[key];
        }
    });
    setUsers(users);
    return foundUser;
}


module.exports = {
    update,
    getUser,
    deleteUser,
    add,
    getUsers
}









