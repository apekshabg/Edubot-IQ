// User authentication functions

// Check if user is logged in
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('edubot_user'));
    if (user) {
        // Update UI with user info
        document.querySelectorAll('.username-display').forEach(el => {
            if (el) el.textContent = user.username;
        });
        document.querySelectorAll('.user-role').forEach(el => {
            if (el) el.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
        });

        // Show admin link if user is teacher or admin
        if (user.role === 'teacher' || user.role === 'admin') {
            document.querySelector('.admin-panel-link').style.display = 'block';
        } else {
            document.querySelector('.admin-panel-link').style.display = 'none';
        }
    } else {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
    }
}

// Login function
function login(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const messageEl = document.getElementById('login-message');

    // Clear previous messages
    messageEl.textContent = '';
    messageEl.className = 'message';

    if (!username || !password) {
        messageEl.textContent = 'Please enter both username and password';
        messageEl.classList.add('error');
        return;
    }

    // Simulate login (in real app, this would be an API call)
    const user = {
        username: username,
        role: username === 'teacher' ? 'teacher' : (username === 'admin' ? 'admin' : 'student')
    };

    localStorage.setItem('edubot_user', JSON.stringify(user));

    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}

// Register function
function register(event) {
    event.preventDefault();
    const username = document.getElementById('new-username').value.trim();
    const email = document.getElementById('new-email').value.trim();
    const password = document.getElementById('new-password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    const role = document.querySelector('input[name="role"]:checked').value;
    const messageEl = document.getElementById('register-message');

    // Clear previous messages
    messageEl.textContent = '';
    messageEl.className = 'message';

    // Validation
    if (!username || !email || !password || !confirmPassword) {
        messageEl.textContent = 'Please fill all fields';
        messageEl.classList.add('error');
        return;
    }

    if (password !== confirmPassword) {
        messageEl.textContent = 'Passwords do not match';
        messageEl.classList.add('error');
        return;
    }

    if (password.length < 6) {
        messageEl.textContent = 'Password must be at least 6 characters';
        messageEl.classList.add('error');
        return;
    }

    // Save user to localStorage
    const user = {
        username: username,
        email: email,
        role: role
    };

    localStorage.setItem('edubot_user', JSON.stringify(user));

    // Show success message
    messageEl.textContent = 'Registration successful! Redirecting...';
    messageEl.classList.add('success');

    // Redirect to dashboard after a delay
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

// Logout function
function logout() {
    localStorage.removeItem('edubot_user');
    window.location.href = 'login.html';
}

// Toggle between login and register forms
function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';

    // Update tab styles
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector('.tab[data-tab="register"]').classList.add('active');
}

function showLoginForm() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';

    // Update tab styles
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector('.tab[data-tab="login"]').classList.add('active');
}

// Initialize auth page
function initAuthPage() {
    // Add event listeners to tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            if (tabName === 'login') {
                showLoginForm();
            } else {
                showRegisterForm();
            }
        });
    });

    // Add form submit handlers
    document.getElementById('login-form').addEventListener('submit', login);
    document.getElementById('register-form').addEventListener('submit', register);

    // Check if we should show register form directly
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('register') === 'true') {
        showRegisterForm();
    }
}

// Initialize auth page if we're on login.html
if (window.location.pathname.includes('login.html')) {
    document.addEventListener('DOMContentLoaded', initAuthPage);
}