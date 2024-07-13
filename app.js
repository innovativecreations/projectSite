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
const client = new MongoClient(uri);

let projects = [];

const password = "123";

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db(dbName);
        const collection = db.collection("projects");

        projects = await collection.find().sort({ serialNo: 1 }).toArray();

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
                projects = await collection.find().sort({ serialNo: 1 }).toArray();
                res.render('database', { projects, editable: true });
            } else {
                projects = await collection.find().sort({ serialNo: 1 }).toArray();
                res.render('database', { projects, editable: false });
            }
        });

        app.post('/edit', async (req, res) => {
            if (req.session.loggedIn) {
                const updatedProjects = req.body.projects.map(project => ({
                    ...project,
                    serialNo: parseInt(project.serialNo, 10)
                }));

                for (const project of updatedProjects) {
                    const existingProject = await collection.findOne({ serialNo: project.serialNo });
                    if (existingProject && existingProject._id.toString() !== project._id) {
                        await collection.updateOne({ _id: existingProject._id }, { $set: { serialNo: project.originalSerialNo } });
                    }
                    await collection.updateOne({ _id: project._id }, { $set: project });
                }

                projects = await collection.find().sort({ serialNo: 1 }).toArray();
                res.redirect('/database');
            } else {
                res.redirect('/database');
            }
        });

        app.post('/add', async (req, res) => {
            if (req.session.loggedIn) {
                let { serialNo, name, description, repo, link, readme, thumbnail } = req.body;
                serialNo = parseInt(serialNo, 10);

                if (isNaN(serialNo)) {
                    const lastProject = await collection.find().sort({ serialNo: -1 }).limit(1).next();
                    serialNo = lastProject ? lastProject.serialNo + 1 : 1;
                }

                const newProject = { serialNo, name, description, repo, link, readme, thumbnail };

                const existingProject = await collection.findOne({ serialNo: newProject.serialNo });
                if (!existingProject) {
                    await collection.insertOne(newProject);
                } else {
                    const projectsToShift = await collection.find({ serialNo: { $gte: newProject.serialNo } }).sort({ serialNo: 1 }).toArray();
                    for (let project of projectsToShift) {
                        await collection.updateOne({ _id: project._id }, { $set: { serialNo: project.serialNo + 1 } });
                    }
                    await collection.insertOne(newProject);
                }

                projects = await collection.find().sort({ serialNo: 1 }).toArray();
                
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
