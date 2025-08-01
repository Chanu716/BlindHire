document.addEventListener('DOMContentLoaded', () => {
    // Modal logic for index.html only
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const openLoginModal = document.getElementById('openLoginModal');
    const openSignupModal = document.getElementById('openSignupModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const closeSignupModal = document.getElementById('closeSignupModal');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    // Enhanced modal show function with smooth animation
    function showModal(modal) {
        modal.style.display = 'flex';
        modal.style.opacity = '0';
        
        // Force reflow for animation
        modal.offsetHeight;
        
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '1';
        
        // Add blur effect to background
        if (main) main.style.filter = 'blur(2px)';
        if (footer) footer.style.filter = 'blur(2px)';
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus trap for accessibility
        const modalBox = modal.querySelector('.modal-box');
        if (modalBox) {
            modalBox.focus();
        }
    }

    // Enhanced modal hide function with smooth animation
    function hideModal(modal) {
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
            
            // Remove blur effect
            if (main) main.style.filter = 'none';
            if (footer) footer.style.filter = 'none';
            
            // Restore body scroll
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Event listeners for modal triggers
    if (openLoginModal && loginModal) {
        openLoginModal.addEventListener('click', () => {
            hideModal(signupModal); // Close signup modal if open
            showModal(loginModal);
        });
    }
    
    if (openSignupModal && signupModal) {
        openSignupModal.addEventListener('click', () => {
            hideModal(loginModal); // Close login modal if open
            showModal(signupModal);
        });
    }
    
    if (closeLoginModal && loginModal) {
        closeLoginModal.addEventListener('click', () => hideModal(loginModal));
    }
    
    if (closeSignupModal && signupModal) {
        closeSignupModal.addEventListener('click', () => hideModal(signupModal));
    }

    // Close modal when clicking outside the modal box
    [loginModal, signupModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', function (e) {
                if (e.target === modal) {
                    hideModal(modal);
                }
            });
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (loginModal && loginModal.style.display === 'flex') {
                hideModal(loginModal);
            }
            if (signupModal && signupModal.style.display === 'flex') {
                hideModal(signupModal);
            }
        }
    });

    // Add smooth scroll to action buttons
    const actionButtons = document.querySelectorAll('.btn');
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // Add feature card animations on scroll (intersection observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards for scroll animations
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Initialize application
    console.log('BlindHire application loaded successfully');
    
    // Add loading state to buttons when clicked
    const modalActions = document.querySelectorAll('.modal-action');
    modalActions.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('loading');
            button.disabled = true;
            
            // Simulate loading for 500ms (you can remove this in production)
            setTimeout(() => {
                // Navigation will happen before this completes
                button.classList.remove('loading');
                button.disabled = false;
            }, 500);
        });
    });
});

// Additional event listeners for other pages
document.addEventListener('DOMContentLoaded', () => {
    // These are for other pages - keeping existing functionality

    // Store JWT on login
    const employerLoginForm = document.getElementById('employerLoginForm');
    if (employerLoginForm) {
        employerLoginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmployerEmail').value.trim();
            const password = document.getElementById('loginEmployerPassword').value;
            const statusDiv = document.getElementById('employerLoginStatus');
            statusDiv.innerHTML = 'Processing...';
            try {
                const res = await fetch('/employers/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (!res.ok) {
                    statusDiv.innerHTML = `<span style='color:red;'>${data.error || 'Login failed.'}`;
                    return;
                }
                // Store JWT in localStorage
                localStorage.setItem('employerToken', data.token);
                statusDiv.innerHTML = `<span style='color:green;'>${data.message} (Employer ID: ${data.employerId})</span>`;
                employerLoginForm.reset();
            } catch (err) {
                statusDiv.innerHTML = `<span style='color:red;'>Error logging in.</span>`;
            }
        });
    }

    // Use JWT for authenticated employer actions
    async function authFetch(url, options = {}) {
        const token = localStorage.getItem('employerToken');
        options.headers = options.headers || {};
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }
        return fetch(url, options);
    }

    // Admin Login
    const adminLoginForm = document.getElementById('admin-login-form');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('admin-login-email').value;
            const password = document.getElementById('admin-login-password').value;
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            const msgDiv = document.getElementById('admin-login-message');
            if (res.ok && data.token) {
                localStorage.setItem('admin_jwt', data.token);
                msgDiv.textContent = 'Admin login successful!';
                showAdminPanel();
            } else {
                msgDiv.textContent = data.error || 'Login failed.';
            }
        });
    }

    // Helper for admin-authenticated fetch
    async function adminAuthFetch(url, options = {}) {
        const token = localStorage.getItem('admin_jwt');
        options.headers = options.headers || {};
        if (token) {
            options.headers['Authorization'] = 'Bearer ' + token;
        }
        return fetch(url, options);
    }

    // Example: fetch admin jobs (to be called after login or on admin panel load)
    async function fetchAdminJobs() {
        const res = await adminAuthFetch('/api/admin/jobs');
        if (res.ok) {
            const data = await res.json();
            // Render admin jobs to UI
            // ...
        } else {
            // Handle error
        }
    }

    // Show/hide admin panel based on login
    function showAdminPanel() {
        document.getElementById('admin-login-section').style.display = 'none';
        document.getElementById('admin-panel-section').style.display = 'block';
        fetchAndRenderAdminJobs();
    }
    function hideAdminPanel() {
        document.getElementById('admin-login-section').style.display = 'block';
        document.getElementById('admin-panel-section').style.display = 'none';
        localStorage.removeItem('admin_jwt');
    }

    // On page load, show admin panel if JWT exists
    if (localStorage.getItem('admin_jwt')) {
        showAdminPanel();
    }

    // Admin logout button
    const adminLogoutBtn = document.getElementById('admin-logout-btn');
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', () => {
            hideAdminPanel();
        });
    }

    // Fetch and render admin jobs
    async function fetchAndRenderAdminJobs() {
        const jobsDiv = document.getElementById('admin-jobs-list');
        jobsDiv.innerHTML = '<em>Loading jobs...</em>';
        const res = await adminAuthFetch('/api/admin/jobs');
        if (res.ok) {
            const data = await res.json();
            if (data.jobs && data.jobs.length > 0) {
                jobsDiv.innerHTML = '<h3>All Jobs</h3>' + data.jobs.map(job => `<div><b>${job.title}</b> (by ${job.employer?.companyName || 'N/A'}) <button onclick="fetchAndRenderCandidates('${job._id}')">View Candidates</button></div>`).join('');
            } else {
                jobsDiv.innerHTML = '<em>No jobs found.</em>';
            }
        } else {
            jobsDiv.innerHTML = '<span style="color:red;">Failed to load jobs.</span>';
        }
    }

    // Fetch and render candidates for a job
    async function fetchAndRenderCandidates(jobId) {
        const candidatesDiv = document.getElementById('admin-candidates-list');
        candidatesDiv.innerHTML = '<em>Loading candidates...</em>';
        const res = await adminAuthFetch(`/api/admin/candidates/${jobId}`);
        if (res.ok) {
            const data = await res.json();
            if (data.candidates && data.candidates.length > 0) {
                candidatesDiv.innerHTML = '<h3>Candidates</h3>' + data.candidates.map(c => `<div>ID: ${c.candidateId} | Skills: ${c.skills?.map(s=>s.name).join(', ')} | Score: ${c.assessmentScores?.map(a=>a.score).join(', ')}</div>`).join('');
            } else {
                candidatesDiv.innerHTML = '<em>No candidates found.</em>';
            }
        } else {
            candidatesDiv.innerHTML = '<span style="color:red;">Failed to load candidates.</span>';
        }
    }

    // Blind profile form logic
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const candidateId = document.getElementById('candidateId').value.trim();
            const profileDiv = document.getElementById('blindProfile');
            profileDiv.innerHTML = 'Loading...';
            try {
                const res = await fetch(`/candidates/profile/${candidateId}`);
                if (!res.ok) {
                    const error = await res.json();
                    profileDiv.innerHTML = `<span style='color:red;'>${error.error || 'Profile not found.'}</span>`;
                    return;
                }
                const data = await res.json();
                profileDiv.innerHTML = renderBlindProfile(data);
            } catch (err) {
                profileDiv.innerHTML = `<span style='color:red;'>Error loading profile.</span>`;
            }
        });
    }

    // Assessment progress logic
    const progressBtn = document.getElementById('viewProgressBtn');
    if (progressBtn) {
        progressBtn.addEventListener('click', async () => {
            const candidateId = document.getElementById('candidateId').value.trim();
            const progressDiv = document.getElementById('assessmentProgress');
            if (!candidateId) {
                progressDiv.innerHTML = '<span style="color:red;">Please enter your Candidate ID above.</span>';
                return;
            }
            progressDiv.innerHTML = 'Loading...';
            try {
                const res = await fetch(`/candidates/progress/${candidateId}`);
                if (!res.ok) {
                    const error = await res.json();
                    progressDiv.innerHTML = `<span style='color:red;'>${error.error || 'Progress not found.'}</span>`;
                    return;
                }
                const data = await res.json();
                progressDiv.innerHTML = renderAssessmentProgress(data.assessmentScores);
            } catch (err) {
                progressDiv.innerHTML = `<span style='color:red;'>Error loading progress.</span>`;
            }
        });
    }

    // Employer shortlist form logic
    const shortlistForm = document.getElementById('shortlistForm');
    if (shortlistForm) {
        shortlistForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const employerId = document.getElementById('employerId').value.trim();
            const jobId = document.getElementById('jobId').value.trim();
            const candidateId = document.getElementById('candidateIdShortlist').value.trim();
            const statusDiv = document.getElementById('shortlistStatus');
            statusDiv.innerHTML = 'Processing...';
            try {
                const res = await authFetch('/employers/shortlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ employerId, jobId, candidateId })
                });
                const data = await res.json();
                if (!res.ok) {
                    statusDiv.innerHTML = `<span style='color:red;'>${data.error || 'Shortlisting failed.'}</span>`;
                    return;
                }
                statusDiv.innerHTML = `<span style='color:green;'>${data.message}</span>`;
            } catch (err) {
                statusDiv.innerHTML = `<span style='color:red;'>Error shortlisting candidate.</span>`;
            }
        });
    }

    // View shortlist form logic
    const viewShortlistForm = document.getElementById('viewShortlistForm');
    if (viewShortlistForm) {
        viewShortlistForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const employerId = document.getElementById('employerIdView').value.trim();
            const jobId = document.getElementById('jobIdView').value.trim();
            const displayDiv = document.getElementById('shortlistDisplay');
            displayDiv.innerHTML = 'Loading...';
            try {
                const res = await fetch(`/employers/${employerId}/shortlist/${jobId}`);
                const data = await res.json();
                if (!res.ok) {
                    displayDiv.innerHTML = `<span style='color:red;'>${data.error || 'Could not fetch shortlist.'}</span>`;
                    return;
                }
                displayDiv.innerHTML = renderShortlist(data.candidateIds);
            } catch (err) {
                displayDiv.innerHTML = `<span style='color:red;'>Error fetching shortlist.</span>`;
            }
        });
    }

    // Employer reveal form logic
    const revealForm = document.getElementById('revealForm');
    if (revealForm) {
        revealForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const employerId = document.getElementById('employerIdReveal').value.trim();
            const jobId = document.getElementById('jobIdReveal').value.trim();
            const candidateId = document.getElementById('candidateIdReveal').value.trim();
            const resultDiv = document.getElementById('revealResult');
            resultDiv.innerHTML = 'Processing...';
            try {
                const res = await authFetch('/employers/reveal', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ employerId, jobId, candidateId })
                });
                const data = await res.json();
                if (!res.ok) {
                    resultDiv.innerHTML = `<span style='color:red;'>${data.error || 'Reveal failed.'}</span>`;
                    return;
                }
                resultDiv.innerHTML = renderPersonalInfo(data.personalInfo);
            } catch (err) {
                resultDiv.innerHTML = `<span style='color:red;'>Error revealing candidate info.</span>`;
            }
        });
    }
});

function renderAssessmentProgress(scores) {
    if (!scores || !scores.length) {
        return '<p>No assessments found.</p>';
    }
    let html = '<ul>';
    scores.forEach(score => {
        html += `<li><strong>Test:</strong> ${score.testId} | <strong>Score:</strong> ${score.score} | <strong>Date:</strong> ${score.date ? new Date(score.date).toLocaleDateString() : ''}`;
        if (score.feedback) {
            html += `<br/><em>Feedback:</em> ${score.feedback}`;
        }
        html += '</li>';
    });
    html += '</ul>';
    return html;
}

function renderShortlist(candidateIds) {
    if (!candidateIds || !candidateIds.length) {
        return '<p>No candidates shortlisted for this job.</p>';
    }
    let html = '<ul>';
    candidateIds.forEach(id => {
        html += `<li>${id}</li>`;
    });
    html += '</ul>';
    return html;
}

function renderBlindProfile(data) {
    let html = `<h4>Candidate ID: ${data.candidateId}</h4>`;
    html += '<h5>Skills</h5><ul>';
    (data.skills || []).forEach(skill => {
        html += `<li>${skill.name} (Level: ${skill.level || 'N/A'}) ${skill.verified ? '✔️' : ''}</li>`;
    });
    html += '</ul>';
    html += '<h5>Assessment Scores</h5><ul>';
    (data.assessmentScores || []).forEach(score => {
        html += `<li>Test: ${score.testId}, Score: ${score.score}, Date: ${score.date ? new Date(score.date).toLocaleDateString() : ''}</li>`;
    });
    html += '</ul>';
    html += '<h5>Project Demos</h5><ul>';
    (data.projectDemos || []).forEach(demo => {
        html += `<li><strong>${demo.title}</strong>: ${demo.description} <a href="${demo.link}" target="_blank">[link]</a> ${demo.verificationStatus ? '✔️' : ''}</li>`;
    });
    html += '</ul>';
    return html;
}

function renderPersonalInfo(info) {
    if (!info) return '<p>No personal info found.</p>';
    let html = '<ul>';
    for (const key in info) {
        html += `<li><b>${key}:</b> ${info[key]}</li>`;
    }
    html += '</ul>';
    return html;
}