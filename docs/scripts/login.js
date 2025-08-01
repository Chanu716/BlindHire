// login.js: Handles login form submission and redirects to dashboards

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const role = document.getElementById('role').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const loginMessage = document.getElementById('login-message');
        loginMessage.textContent = '';
        try {
            const endpoint = role === 'candidate' ? `${API_BASE_URL}/api/candidates/login` : `${API_BASE_URL}/api/employers/login`;
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok && data.token) {
                localStorage.setItem(`${role}_jwt`, data.token);
                // Redirect based on role
                if (role === 'candidate') {
                    window.location.href = 'candidate.html';
                } else if (role === 'employer') {
                    window.location.href = 'employer.html';
                }
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
