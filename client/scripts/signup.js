// signup.js: Handles signup form submission and redirects to login

document.addEventListener('DOMContentLoaded', function () {
    const roleSelect = document.getElementById('role');
    const candidateFields = document.getElementById('candidateFields');
    const nameInput = document.getElementById('name');
    if (roleSelect && nameInput && candidateFields) {
        roleSelect.addEventListener('change', function() {
            if (roleSelect.value === 'candidate') {
                candidateFields.style.display = '';
                nameInput.required = true;
            } else {
                candidateFields.style.display = 'none';
                nameInput.required = false;
            }
        });
        // Trigger once on load
        roleSelect.dispatchEvent(new Event('change'));
    }
    const signupForm = document.getElementById('signupForm');
    if (!signupForm) return;
    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const role = document.getElementById('role').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        let payload;
if (role === 'candidate') {
    const name = document.getElementById('name').value;
    payload = {
        personalInfo: { name, email, password },
    };
} else {
    payload = { email, password };
}
        if (role === 'employer') {
            payload.companyName = document.getElementById('companyName').value;
            payload.industry = document.getElementById('industry').value;
        }
        const signupMessage = document.getElementById('signup-message');
        signupMessage.textContent = '';
        try {
            const endpoint = role === 'candidate' ? '/api/candidates/register' : '/api/employers/register';
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (res.ok) {
                signupMessage.textContent = 'Signup successful! Redirecting to login...';
                signupMessage.className = 'status-success';
                setTimeout(() => {
                    window.location.href = 'login.html';
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
