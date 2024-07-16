const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017';
const dbName = 'Mayank';

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    let client;
    client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const projectsCollection = db.collection('projects');
    const projects = await projectsCollection.find({}).toArray();
    res.render('index', { projects });
    client.close();
});

app.get('/project/:id', async (req, res) => {
    let client;
    client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const projectsCollection = db.collection('projects');
    const project = await projectsCollection.findOne({ _id: new ObjectId(req.params.id) });
    res.render('individual_page', { project });
    client.close();
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
