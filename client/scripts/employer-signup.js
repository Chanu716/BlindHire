document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    let currentStep = 1;
    const totalSteps = 3;

    // Step navigation
    function showStep(stepNumber) {
        // Hide all steps
        steps.forEach(step => step.classList.remove('active'));
        
        // Show current step
        document.getElementById(`step${stepNumber}`).classList.add('active');
        
        // Update progress indicator
        progressSteps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index + 1 < stepNumber) {
                step.classList.add('completed');
            } else if (index + 1 === stepNumber) {
                step.classList.add('active');
            }
        });
        
        currentStep = stepNumber;
    }

    // Validation functions
    function validateStep1() {
        const companyName = document.getElementById('companyName').value.trim();
        const industry = document.getElementById('industry').value;
        const companySize = document.getElementById('companySize').value;
        
        if (!companyName || !industry || !companySize) {
            showMessage('Please fill in all required fields in Company Information.', 'error');
            return false;
        }
        
        if (companyName.length < 2) {
            showMessage('Company name must be at least 2 characters long.', 'error');
            return false;
        }
        
        return true;
    }

    function validateStep2() {
        const contactPersonName = document.getElementById('contactPersonName').value.trim();
        const jobTitle = document.getElementById('jobTitle').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const location = document.getElementById('location').value.trim();
        
        if (!contactPersonName || !jobTitle || !email || !phone || !location) {
            showMessage('Please fill in all required fields in Contact & Location.', 'error');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return false;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
            showMessage('Please enter a valid phone number.', 'error');
            return false;
        }
        
        return true;
    }

    function validateStep3() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (!password || !confirmPassword) {
            showMessage('Please fill in all password fields.', 'error');
            return false;
        }
        
        if (password !== confirmPassword) {
            showMessage('Passwords do not match.', 'error');
            return false;
        }
        
        // Password strength validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            showMessage('Password must be at least 8 characters with uppercase, lowercase, and numbers.', 'error');
            return false;
        }
        
        return true;
    }

    // Step navigation event listeners
    document.getElementById('nextStep1').addEventListener('click', function() {
        if (validateStep1()) {
            showStep(2);
        }
    });

    document.getElementById('nextStep2').addEventListener('click', function() {
        if (validateStep2()) {
            showStep(3);
        }
    });

    document.getElementById('prevStep2').addEventListener('click', function() {
        showStep(1);
    });

    document.getElementById('prevStep3').addEventListener('click', function() {
        showStep(2);
    });

    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateStep3()) {
            return;
        }

        // Collect all form data
        const formData = {
            companyName: document.getElementById('companyName').value.trim(),
            industry: document.getElementById('industry').value,
            companySize: document.getElementById('companySize').value,
            website: document.getElementById('website').value.trim(),
            contactPersonName: document.getElementById('contactPersonName').value.trim(),
            jobTitle: document.getElementById('jobTitle').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            location: document.getElementById('location').value.trim(),
            headquarters: document.getElementById('headquarters').value.trim(),
            password: document.getElementById('password').value,
            hiringGoals: document.getElementById('hiringGoals').value,
            companyDescription: document.getElementById('companyDescription').value.trim(),
            subscribeUpdates: document.getElementById('subscribeUpdates').checked
        };

        // Show loading state
        const submitBtn = document.getElementById('submitForm');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="icon">⏳</span>Creating Account...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            try {
                // Store employer data in localStorage (in real app, this would be sent to server)
                const employerData = {
                    ...formData,
                    id: 'EMP-' + Date.now(),
                    registrationDate: new Date().toISOString(),
                    status: 'active'
                };
                
                // Remove password from stored data
                delete employerData.password;
                
                localStorage.setItem('employerData', JSON.stringify(employerData));
                localStorage.setItem('userType', 'employer');
                localStorage.setItem('isLoggedIn', 'true');

                showMessage('Account created successfully! Redirecting to dashboard...', 'success');
                
                // Redirect to employer dashboard after 2 seconds
                setTimeout(() => {
                    window.location.href = 'employer.html';
                }, 2000);
                
            } catch (error) {
                showMessage('An error occurred during registration. Please try again.', 'error');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }, 2000);
    });

    // Message display function
    function showMessage(message, type) {
        const messageDiv = document.getElementById('signup-message');
        messageDiv.textContent = message;
        messageDiv.className = type === 'success' ? 'message success' : 'message error';
        messageDiv.style.display = 'block';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }

    // Real-time password validation
    document.getElementById('password').addEventListener('input', function() {
        const password = this.value;
        const requirements = document.querySelector('.password-requirements small');
        
        const hasLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        
        if (hasLength && hasUpper && hasLower && hasNumber) {
            requirements.style.color = 'var(--success-color)';
            requirements.textContent = '✓ Password meets all requirements';
        } else {
            requirements.style.color = 'var(--text-light)';
            requirements.textContent = 'Password must be at least 8 characters with uppercase, lowercase, and numbers';
        }
    });

    // Confirm password validation
    document.getElementById('confirmPassword').addEventListener('input', function() {
        const password = document.getElementById('password').value;
        const confirmPassword = this.value;
        
        if (confirmPassword && password !== confirmPassword) {
            this.style.borderColor = 'var(--error-color)';
        } else {
            this.style.borderColor = 'var(--border-color)';
        }
    });

    // Initialize first step
    showStep(1);
});
