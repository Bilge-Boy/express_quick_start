const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let users;


    async function connect() {
        await client.connect();
        console.log('mongobd is connected');
        const database = client.db('mongo-first');
        
        users = database.collection('users');
    }
    
     function usersCollection(){
        return users;
    }

    module.exports = {
        connect,
        usersCollection,
        
    }

















       // const movies = database.collection('movies');
      // Query for a movie that has the title 'Back to the Future'
     // const query = { title: 'Back to the Future' };
    // const movie = await movies.insertOne(query);
   // console.log(movie);