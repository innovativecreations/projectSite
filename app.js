const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const projects = [
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
        res.redirect('/database');
    } else {
        res.send('Incorrect password');
    }
});

app.get('/database', (req, res) => {
    res.render('database', { projects });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
