const express = require('express');
const app = express();
const port = 3000;

const projects = [
    { title: "M", description: "Descroption" },
];

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
