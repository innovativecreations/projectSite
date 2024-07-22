// const express = require('express');
// const { MongoClient, ObjectId } = require('mongodb');
// const app = express();
// const port = 3000;

// const url = 'mongodb://localhost:27017';
// const dbName = 'Mayank';

// app.set('view engine', 'ejs');
// app.use(express.static('public'));

// app.get('/', async (req, res) => {
//     let client;
//     client = await MongoClient.connect(url);
//     const db = client.db(dbName);
//     const projectsCollection = db.collection('projects');
//     const projects = await projectsCollection.find({}).toArray();
//     res.render('index', { projects });
//     client.close();
// });

// app.get('/project/:id', async (req, res) => {
//     let client;
//     client = await MongoClient.connect(url);
//     const db = client.db(dbName);
//     const projectsCollection = db.collection('projects');
//     const project = await projectsCollection.findOne({ _id: new ObjectId(req.params.id) });
//     res.render('individual_page', { project });
//     client.close();
// });

// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });


const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const axios = require('axios');
const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017';
const dbName = 'Mayank';

const GITHUB_API_BASE_URL = 'https://api.github.com';
const GITHUB_TOKEN = 'yo';

app.set('view engine', 'ejs');
app.use(express.static('public'));

const readmeData = async (readmeUrl) => {
    const urlObj = new URL(readmeUrl);
    const parts = urlObj.pathname.split('/');
    const owner = parts[1];
    const repo = parts[2];
    const path = parts.slice(5).join('/');
    const apiUrl = `${GITHUB_API_BASE_URL}/repos/${owner}/${repo}/contents/${path}`;
    
    console.log(`API URL: ${apiUrl}`);

    const response = await axios.get(apiUrl, {
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3.raw'
        }
    });
    return response.data;
};

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

    let readmeContent = '';
    if (project.readme) {
        readmeContent = await readmeData(project.readme);
        if (!readmeContent) {
            readmeContent = 'Error fetching README content.';
        }
    } else {
        readmeContent = 'No README file available for this project.';
    }
    
    res.render('individual_page', { project, readmeContent });
    client.close();
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});