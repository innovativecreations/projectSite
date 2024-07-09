const toggleButton = document.getElementById('toggleButton');

function setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
    toggleButton.textContent = theme === 'dark' ? 'Light' : 'Dark';
}

toggleButton.addEventListener('click', () => {
    let currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme') || 'light';
    setTheme(theme);
});
