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
    { name: "Project One", description: "Description One", repo: "https://github.com/user/project-one", link: "https://example.com/project-one", readme: "https://example.com/project-one/readme", thumbnail: "https://via.placeholder.com/150" },
    { name: "Project Two", description: "Description Two", repo: "https://github.com/user/project-two", link: "https://example.com/project-two", readme: "https://example.com/project-two/readme", thumbnail: "https://via.placeholder.com/150" },
    { name: "Project Three", description: "Description Three", repo: "https://github.com/user/project-three", link: "https://example.com/project-three", readme: "https://example.com/project-three/readme", thumbnail: "https://via.placeholder.com/150" }
];

const password = "123";

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

app.get('/database', (req, res) => {
    if (req.session.loggedIn) {
        res.render('database', { projects, editable: true });
    } else {
        res.render('database', { projects, editable: false });
    }
});

app.post('/edit', (req, res) => {
    if (req.session.loggedIn) {
        const { index, name, description, repo, link, readme, thumbnail } = req.body;
        projects[index] = { name, description, repo, link, readme, thumbnail };
    }
    res.redirect('/database');
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/login');
});
