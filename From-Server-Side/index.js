require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2a9l2qr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    // server link start
    const usersFromCollection = client.db('From').collection('usersFrom');
    // server link end 

    //  usersFrom added post mongoDB start
    app.post('/from', async (req, res) => {
      const newAdd = req.body;
      const result = await usersFromCollection.insertOne(newAdd)
      res.send(result);
    });
    //  usersFrom added post mongoDB end

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('From server is running')
})

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
})

