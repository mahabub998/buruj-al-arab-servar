const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
require('dotenv').config()
console.log(process.env.DB_USER)

const port =process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.33vow.mongodb.net/${process.env.DB_NAME}=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log('connection err',err)
  const eventCollection = client.db("volunteerNetworkTwo").collection("events");
 app.post('/addEvent',(req,res)=>{
   const newEvent = req.body;
   console.log('addeing  new event',newEvent)
   eventCollection.insertOne(newEvent)
   .then(result => {
     console.log('inserted count',result.insertedCount)
     res.send(result.insertedCount >0)
     
   })
 })
 

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})