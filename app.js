const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const { MongoClient } = require('mongodb');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const uri = 'mongodb://localhost:27017';
const dbName = 'Mayank';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let projects = [];

const password = "123";

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db(dbName);
        const collection = db.collection("projects");

        projects = await collection.find().toArray();

        app.get('/login', (req, res) => {
            if (req.session.loggedIn) {
                return res.redirect('/database');
            }
            res.render('login');
        });

        app.post('/auth', (req, res) => {
            const userPassword = req.body.password;
            if (userPassword === password) {
                req.session.loggedIn = true;
                res.redirect('/database');
            } else {
                res.send('Incorrect password');
            }
        });

        app.get('/database', async (req, res) => {
            if (req.session.loggedIn) {
                projects = await collection.find().toArray();
                res.render('database', { projects, editable: true });
            } else {
                projects = await collection.find().toArray();
                res.render('database', { projects, editable: false });
            }
        });

        app.post('/edit', async (req, res) => {
            if (req.session.loggedIn) {
                const { index, name, description, repo, link, readme, thumbnail } = req.body;
                const project = { name, description, repo, link, readme, thumbnail };
                const id = projects[index]._id;

                await collection.updateOne({ _id: id }, { $set: project });

                projects = await collection.find().toArray();
                console.log("This data is updated:", project);
                res.redirect('/database');
            } else {
                res.redirect('/database');
            }
        });

        app.post('/add', async (req, res) => {
            if (req.session.loggedIn) {
                const { name, description, repo, link, readme, thumbnail } = req.body;
                const newProject = { name, description, repo, link, readme, thumbnail };

                const existingProject = await collection.findOne({ name, repo });
                if (!existingProject) {
                    await collection.insertOne(newProject);
                    projects = await collection.find().toArray();
                    console.log("This data is inserted:", newProject);
                } else {
                    console.log("Duplicate entry found. Skipping insertion.");
                }
                
                res.redirect('/database');
            } else {
                res.redirect('/database');
            }
        });

        app.get('/logout', (req, res) => {
            req.session.destroy(() => {
                res.redirect('/login');
            });
        });

        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000/login');
        });
    } catch (err) {
        console.error(err);
    }
}

run().catch(console.dir);