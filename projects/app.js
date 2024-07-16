const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017';
const dbName = 'Mayank';

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    let client;
    try {
        client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        const projectsCollection = db.collection('projects');
        const projects = await projectsCollection.find({}).toArray();
        res.render('index', { projects });
    } catch (err) {
        console.error(err);
    } finally {
        if (client) {
            client.close();
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
