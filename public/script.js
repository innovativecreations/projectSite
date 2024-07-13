const toggleButton = document.getElementById('toggleButton');

function setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
    toggleButton.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
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

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', () => {
            document.getElementById('saveButton').style.display = 'block';
        });
    });
});
