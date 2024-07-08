const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

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

let projects = [
    { name: "Project One", repo: "https://github.com/user/project-one", thumbnail: "https://via.placeholder.com/150" },
    { name: "Project Two", repo: "https://github.com/user/project-two", thumbnail: "https://via.placeholder.com/150" },
    { name: "Project Three", repo: "https://github.com/user/project-three", thumbnail: "https://via.placeholder.com/150" }
];

const password = "123";

app.get('/login', (req, res) => {
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

app.get('/database', (req, res) => {
    if (req.session.loggedIn) {
        res.render('database', { projects, editable: true });
    } else {
        res.render('database', { projects, editable: false });
    }
});

app.post('/edit', (req, res) => {
    if (req.session.loggedIn) {
        const { index, name, repo, thumbnail } = req.body;
        projects[index] = { name, repo, thumbnail };
    }
    res.redirect('/database');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
