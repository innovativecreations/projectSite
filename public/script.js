const toggleButton = document.getElementById('toggleButton');

function setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
}

toggleButton.addEventListener('click', () => {
    let currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        setTheme('light');
        document.getElementById("toggleButton").innerText = "Dark";
    } else {
        setTheme('dark');
        document.getElementById("toggleButton").innerText = "Light";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme') || 'light';
    setTheme(theme);
});
