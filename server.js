// =============================================================================
// EECE/CS 3093C Software Engineering — Lab 4
// server.js — code skeleton provided by Phu Phung
// complete implementation by Skylar Bleau
// =============================================================================
const express     = require('express');
const app     = express();
const { MongoClient } = require('mongodb');

app.use(express.urlencoded({ extended: false }));
const cors = require('cors');
app.use(cors());

const uri = "mongodb+srv://bleauskylar_db_user:MlEQq7DesH6SkTGN@swe-summer26.yj0uny1.mongodb.net/?appName=SWE-Summer26"; 
const mongoclient = new MongoClient(uri);

// Declare global handles so all express routes can access them
let db, uscities;

// Common fields projection
const fields = {
  _id: 0,
  city: 1,
  state_id: 1,
  state_name: 1,
  county_name: 1,
  timezone: 1,
  zips: 1
};

async function mongoconnect() {
  await mongoclient.connect();
  console.log('Debug> connected to MongoDB server!');
}

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await mongoconnect();
    
    // Initialize database and collection handles globally upon connection
    db = mongoclient.db('uscities-microservices');
    uscities = db.collection('uscities');

    app.listen(PORT, () => 
      console.log('Server running on port ' + PORT));
  } catch (err) {
    console.log('Error>server.js: failed to start — database connection error', err);
    process.exit(1);
  }
})();

//Search by zip
app.get(/^\/uscities-search\/(\d{1,5})$/, async (req, res) => {
  const zipCode = req.params[0];
  console.log(`Debug> zipCode= ${zipCode}`);
  try {
    const zipRegEx = new RegExp(zipCode);
    const result = await uscities.find({ zips: zipRegEx }).project(fields).toArray();
    res.json(result);
  } catch (error) {
    console.error('ZIP search error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Search by name
app.get('/uscities-search/:city', async (req, res) => {
  console.log(`Debug: /uscities-search/ -> city= ${req.params.city}`);
  try {
    const cityRegEx = new RegExp(req.params.city, 'i');
    const result = await uscities.find({ city: cityRegEx }).project(fields).toArray();
    res.json(result);
  } catch (error) {
    console.error('City search error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});