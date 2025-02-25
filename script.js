// Load environment variables from .env file
require('dotenv').config();

const users = [
    { username: process.env.GAST_USER, pin: process.env.GAST_PIN, rank: 'Gast' },
    { username: process.env.INHABER_USER, pin: process.env.INHABER_PIN, rank: 'Inhaber' },
];

let currentUser = null;

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const pin = document.getElementById('pin').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, pin }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentUser = data.user;
            updateHeader();
            showStartPage();
            checkPartnershipButtonVisibility();
            checkModeratorButtonVisibility();
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Update the header with the current user's information
function updateHeader() {
    const header = document.getElementById('user-info');
    if (currentUser) {
        header.textContent = `User: ${currentUser.username} | Rank: ${currentUser.rank}`;
    } else {
        header.textContent = `User: Nicht eingeloggt | Rank: -`;
    }
}

// Show the start page and hide the login container
function showStartPage() {
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('start-page').classList.remove('hidden');
}

// Handle logout
function logout() {
    currentUser = null;
    updateHeader();
    document.getElementById('login-container').classList.remove('hidden');
    document.getElementById('start-page').classList.add('hidden');
    document.getElementById('Partnership-page').classList.add('hidden');
    document.getElementById('Moderator-page').classList.add('hidden');
    document.getElementById('partnership-button').classList.add('hidden');
    document.getElementById('moderator-button').classList.add('hidden');
}

// Check if the partnership button should be visible
function checkPartnershipButtonVisibility() {
    if (currentUser.rank === 'Support' || currentUser.rank === 'Inhaber') {
        document.getElementById('partnership-button').classList.remove('hidden');
    } else {
        document.getElementById('partnership-button').classList.add('hidden');
    }
}

// Check if the moderator button should be visible
function checkModeratorButtonVisibility() {
    if (currentUser.rank === 'Admin' || currentUser.rank === 'Inhaber') {
        document.getElementById('moderator-button').classList.remove('hidden');
    } else {
        document.getElementById('moderator-button').classList.add('hidden');
    }
}

// Show the partnership page and hide the start page
function showPartnershipPage() {
    document.getElementById('start-page').classList.add('hidden');
    document.getElementById('Partnership-page').classList.remove('hidden');
}

// Show the start page from the partnership page
function showStartPageFromPartnership() {
    document.getElementById('Partnership-page').classList.add('hidden');
    document.getElementById('start-page').classList.remove('hidden');
}

// Show the moderator page and hide the start page
function showModeratorPage() {
    document.getElementById('start-page').classList.add('hidden');
    document.getElementById('Moderator-page').classList.remove('hidden');
}

// Show the start page from the admin page
function showStartPageFromAdmin() {
    document.getElementById('Moderator-page').classList.add('hidden');
    document.getElementById('start-page').classList.remove('hidden');
}