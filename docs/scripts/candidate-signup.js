// candidate-signup.js: Handles candidate signup form submission

document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    if (!signupForm) return;
    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const signupMessage = document.getElementById('signup-message');
        signupMessage.textContent = '';
        try {
            const res = await fetch(API_BASE_URL + '/api/candidates/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ personalInfo: { name, email, password } })
            });
            const data = await res.json();
            if (res.ok) {
                signupMessage.textContent = 'Signup successful! Redirecting to login...';
                signupMessage.className = 'status-success';
                setTimeout(() => {
                    window.location.href = 'candidate-login.html';
                }, 1200);
            } else {
                signupMessage.textContent = data.error || 'Signup failed.';
                signupMessage.className = 'status-error';
            }
        } catch (err) {
            signupMessage.textContent = 'Network error.';
            signupMessage.className = 'status-error';
        }
    });
});
