// employer-login.js: Handles employer login form submission

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const loginMessage = document.getElementById('login-message');
        loginMessage.textContent = '';
        try {
            const res = await fetch('/api/employers/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('employerToken', data.token);
                loginMessage.textContent = 'Login successful! Redirecting...';
                loginMessage.className = 'status-success';
                setTimeout(() => {
                    window.location.href = 'employer.html';
                }, 1000);
            } else {
                loginMessage.textContent = data.error || 'Login failed.';
                loginMessage.className = 'status-error';
            }
        } catch (err) {
            loginMessage.textContent = 'Network error.';
            loginMessage.className = 'status-error';
        }
    });
});
