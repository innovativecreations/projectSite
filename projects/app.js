const express = require('express');
const app = express();
const port = 3000;

const projects = [
    { title: "First Project", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies nisl a enim consequat mattis. Proin tempor ullamcorper justo. Nulla eu maximus lorem. Aenean eu interdum diam. Quisque cursus urna id orci rutrum, at convallis sem congue. Curabitur sit amet est nisl. Quisque convallis tempus est ut maximus. Vivamus vita", thumbnail: "https://dummyimage.com/600x400/000/fff" },
    { title: "Second Project", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies nisl a enim consequat mattis. Proin tempor ullamcorper justo. Nulla eu maximus lorem. Aenean eu interdum diam. Quisque cursus urna id orci rutrum, at convallis sem congue. Curabitur sit amet est nisl. Quisque convallis tempus est ut maximus. Vivamus vita", thumbnail: "https://dummyimage.com/600x400/000/fff" },
];

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
