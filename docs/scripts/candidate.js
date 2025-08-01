// candidate.js: Handles candidate dashboard functionality

document.addEventListener('DOMContentLoaded', function () {
    // Initialize dashboard
    initializeCandidateDashboard();
    
    // Event listeners
    setupEventListeners();
    
    // Load candidate data
    loadCandidateData();
});

// Dashboard initialization
function initializeCandidateDashboard() {
    // Generate and display candidate ID
    generateCandidateId();
    
    // Check authentication
    checkAuthentication();
    
    // Load dashboard stats
    updateDashboardStats();
    
    // Check for shortlisted applications
    checkShortlistStatus();
}

// Generate unique candidate ID
function generateCandidateId() {
    const candidateIdElement = document.getElementById('candidateId');
    
    // Check if ID exists in localStorage
    let candidateId = localStorage.getItem('candidateId');
    
    if (!candidateId) {
        // Generate new ID format: BH-YYYY-XXXX
        const year = new Date().getFullYear();
        const randomNum = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
        candidateId = `BH-${year}-${randomNum}`;
        
        // Store in localStorage
        localStorage.setItem('candidateId', candidateId);
    }
    
    if (candidateIdElement) {
        candidateIdElement.textContent = candidateId;
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Navigation buttons
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileBtn2 = document.getElementById('editProfileBtn2');
    const logoutBtn = document.getElementById('logoutBtn');
    const applicationsBtn = document.getElementById('applicationsBtn');
    
    // Dashboard action buttons
    const viewProfileBtn = document.getElementById('viewProfileBtn');
    const takeTestBtn = document.getElementById('takeTestBtn');
    const viewScoresBtn = document.getElementById('viewScoresBtn');
    const viewApplicationsBtn = document.getElementById('viewApplicationsBtn');
    const browseJobsBtn = document.getElementById('browseJobsBtn');
    const revealIdentityBtn = document.getElementById('revealIdentityBtn');
    const viewShortlistBtn = document.getElementById('viewShortlistBtn');
    
    // Quick action buttons
    const quickProfile = document.getElementById('quickProfile');
    const quickTest = document.getElementById('quickTest');
    const quickJobs = document.getElementById('quickJobs');
    
    // Modal buttons
    const closeProfileModal = document.getElementById('closeProfileModal');
    const closeIdentityModal = document.getElementById('closeIdentityModal');
    const confirmRevealBtn = document.getElementById('confirmRevealBtn');
    const cancelRevealBtn = document.getElementById('cancelRevealBtn');
    
    // Event listeners
    if (editProfileBtn) editProfileBtn.addEventListener('click', openProfileModal);
    if (editProfileBtn2) editProfileBtn2.addEventListener('click', openProfileModal);
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (applicationsBtn) applicationsBtn.addEventListener('click', showApplications);
    
    if (viewProfileBtn) viewProfileBtn.addEventListener('click', viewBlindProfile);
    if (takeTestBtn) takeTestBtn.addEventListener('click', takeSkillTest);
    if (viewScoresBtn) viewScoresBtn.addEventListener('click', viewTestScores);
    if (viewApplicationsBtn) viewApplicationsBtn.addEventListener('click', showApplications);
    if (browseJobsBtn) browseJobsBtn.addEventListener('click', browseJobs);
    if (revealIdentityBtn) revealIdentityBtn.addEventListener('click', openIdentityModal);
    if (viewShortlistBtn) viewShortlistBtn.addEventListener('click', viewShortlistDetails);
    
    if (quickProfile) quickProfile.addEventListener('click', openProfileModal);
    if (quickTest) quickTest.addEventListener('click', takeSkillTest);
    if (quickJobs) quickJobs.addEventListener('click', browseJobs);
    
    if (closeProfileModal) closeProfileModal.addEventListener('click', closeModal);
    if (closeIdentityModal) closeIdentityModal.addEventListener('click', closeModal);
    if (confirmRevealBtn) confirmRevealBtn.addEventListener('click', confirmIdentityReveal);
    if (cancelRevealBtn) cancelRevealBtn.addEventListener('click', closeModal);
    
    // Close modals on overlay click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });
    
    // Close modals on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Check authentication
function checkAuthentication() {
    const token = localStorage.getItem('candidateToken');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    
    // For testing purposes, allow if test data exists or if logged in
    if (!token && !isLoggedIn && location.protocol === 'https:') {
        // Only redirect in production (https)
        window.location.href = 'candidate-login.html';
        return;
    }
    
    // In test environment (file protocol), proceed without strict auth
    console.log('Candidate authenticated for testing');
}

// Load candidate data from server
function loadCandidateData() {
    // Simulate loading data (replace with actual API calls)
    const mockData = {
        profile: {
            skillCount: 3,
            portfolioCount: 2,
            isComplete: false
        },
        tests: {
            completed: 5,
            avgScore: 87
        },
        applications: {
            total: 8,
            shortlisted: 2,
            active: 3
        },
        isShortlisted: true // Set to true to show identity reveal option
    };
    
    updateDashboardWithData(mockData);
}

// Update dashboard with loaded data
function updateDashboardWithData(data) {
    // Update profile stats
    const skillCount = document.getElementById('skillCount');
    const portfolioCount = document.getElementById('portfolioCount');
    const profileStatus = document.getElementById('profileStatus');
    
    if (skillCount) skillCount.textContent = data.profile.skillCount;
    if (portfolioCount) portfolioCount.textContent = data.profile.portfolioCount;
    if (profileStatus) {
        profileStatus.textContent = data.profile.isComplete ? 'Complete' : 'Incomplete';
        profileStatus.className = `status-badge ${data.profile.isComplete ? 'complete' : 'incomplete'}`;
    }
    
    // Update test stats
    const completedTests = document.getElementById('completedTests');
    const avgScore = document.getElementById('avgScore');
    
    if (completedTests) completedTests.textContent = data.tests.completed;
    if (avgScore) avgScore.textContent = `${data.tests.avgScore}%`;
    
    // Update application stats
    const totalApplications = document.getElementById('totalApplications');
    const shortlistedApps = document.getElementById('shortlistedApps');
    const applicationsBadge = document.getElementById('applicationsBadge');
    
    if (totalApplications) totalApplications.textContent = data.applications.total;
    if (shortlistedApps) shortlistedApps.textContent = data.applications.shortlisted;
    if (applicationsBadge) applicationsBadge.textContent = `${data.applications.active} Active`;
    
    // Show identity reveal if shortlisted
    const identityCard = document.getElementById('identityRevealCard');
    if (identityCard && data.isShortlisted) {
        identityCard.style.display = 'block';
    }
}

// Dashboard action functions
function openProfileModal() {
    const modal = document.getElementById('profileModal');
    const formContainer = document.getElementById('profileEditForm');
    
    // Load profile editing form
    formContainer.innerHTML = `
        <form id="profileForm">
            <div class="form-section">
                <h4>Skills & Expertise</h4>
                <div class="form-group">
                    <label for="skills">Skills (comma-separated)</label>
                    <input type="text" id="skills" placeholder="JavaScript, Python, React, Node.js">
                </div>
                <div class="form-group">
                    <label for="experience">Years of Experience</label>
                    <select id="experience">
                        <option value="">Select experience</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5+">5+ years</option>
                    </select>
                </div>
            </div>
            
            <div class="form-section">
                <h4>Portfolio & Projects</h4>
                <div class="form-group">
                    <label for="portfolioUrl">Portfolio Website</label>
                    <input type="url" id="portfolioUrl" placeholder="https://yourportfolio.com">
                </div>
                <div class="form-group">
                    <label for="githubUrl">GitHub Profile</label>
                    <input type="url" id="githubUrl" placeholder="https://github.com/yourusername">
                </div>
                <div class="form-group">
                    <label for="linkedinUrl">LinkedIn Profile</label>
                    <input type="url" id="linkedinUrl" placeholder="https://linkedin.com/in/yourprofile">
                </div>
            </div>
            
            <div class="form-section">
                <h4>Professional Summary</h4>
                <div class="form-group">
                    <label for="summary">Brief Professional Summary</label>
                    <textarea id="summary" rows="4" placeholder="Describe your professional background and key achievements (without revealing personal details)"></textarea>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                    <span class="icon">💾</span>Save Profile
                </button>
                <button type="button" class="btn btn-outline" onclick="closeModal()">
                    <span class="icon">❌</span>Cancel
                </button>
            </div>
        </form>
    `;
    
    // Add form submit handler
    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveProfile();
    });
    
    showModal(modal);
}

function saveProfile() {
    // Get form data
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const portfolioUrl = document.getElementById('portfolioUrl').value;
    const githubUrl = document.getElementById('githubUrl').value;
    const linkedinUrl = document.getElementById('linkedinUrl').value;
    const summary = document.getElementById('summary').value;
    
    // TODO: Send to server
    console.log('Saving profile:', {
        skills, experience, portfolioUrl, githubUrl, linkedinUrl, summary
    });
    
    // Show success message
    showNotification('Profile saved successfully!', 'success');
    closeModal();
    
    // Update dashboard stats
    updateDashboardStats();
}

function viewBlindProfile() {
    const dynamicContent = document.getElementById('dynamicContent');
    dynamicContent.innerHTML = `
        <h3><span class="icon">👤</span>Your Blind Profile</h3>
        <div class="profile-view">
            <div class="profile-section">
                <h4>Skills & Expertise</h4>
                <div class="skill-tags">
                    <span class="skill-tag">JavaScript</span>
                    <span class="skill-tag">Python</span>
                    <span class="skill-tag">React</span>
                    <span class="skill-tag">Node.js</span>
                </div>
                <p><strong>Experience:</strong> 3-5 years</p>
            </div>
            
            <div class="profile-section">
                <h4>Portfolio Links</h4>
                <div class="portfolio-links">
                    <a href="#" target="_blank" class="portfolio-link">
                        <span class="icon">🌐</span>Portfolio Website
                    </a>
                    <a href="#" target="_blank" class="portfolio-link">
                        <span class="icon">💻</span>GitHub Profile
                    </a>
                </div>
            </div>
            
            <div class="profile-section">
                <h4>Assessment Scores</h4>
                <div class="scores-grid">
                    <div class="score-item">
                        <span class="score-name">JavaScript Fundamentals</span>
                        <span class="score-value">92%</span>
                    </div>
                    <div class="score-item">
                        <span class="score-name">React Development</span>
                        <span class="score-value">89%</span>
                    </div>
                    <div class="score-item">
                        <span class="score-name">Problem Solving</span>
                        <span class="score-value">95%</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    dynamicContent.scrollIntoView({ behavior: 'smooth' });
}

function takeSkillTest() {
    const dynamicContent = document.getElementById('dynamicContent');
    dynamicContent.innerHTML = `
        <h3><span class="icon">🧪</span>Available Skill Tests</h3>
        <div class="tests-grid">
            <div class="test-card">
                <h4>JavaScript Advanced</h4>
                <p>Test your advanced JavaScript knowledge including ES6+, async programming, and more.</p>
                <div class="test-info">
                    <span class="test-duration">45 minutes</span>
                    <span class="test-difficulty">Advanced</span>
                </div>
                <button class="btn btn-primary">
                    <span class="icon">▶️</span>Start Test
                </button>
            </div>
            
            <div class="test-card">
                <h4>React Development</h4>
                <p>Comprehensive test covering React hooks, state management, and component architecture.</p>
                <div class="test-info">
                    <span class="test-duration">60 minutes</span>
                    <span class="test-difficulty">Intermediate</span>
                </div>
                <button class="btn btn-primary">
                    <span class="icon">▶️</span>Start Test
                </button>
            </div>
            
            <div class="test-card">
                <h4>Algorithm & Data Structures</h4>
                <p>Problem-solving test focusing on algorithms, data structures, and computational thinking.</p>
                <div class="test-info">
                    <span class="test-duration">90 minutes</span>
                    <span class="test-difficulty">Advanced</span>
                </div>
                <button class="btn btn-primary">
                    <span class="icon">▶️</span>Start Test
                </button>
            </div>
        </div>
    `;
    
    dynamicContent.scrollIntoView({ behavior: 'smooth' });
}

function viewTestScores() {
    const dynamicContent = document.getElementById('dynamicContent');
    dynamicContent.innerHTML = `
        <h3><span class="icon">📊</span>Your Test Scores</h3>
        <div class="scores-overview">
            <div class="score-summary">
                <div class="summary-item">
                    <span class="summary-number">5</span>
                    <span class="summary-label">Tests Completed</span>
                </div>
                <div class="summary-item">
                    <span class="summary-number">87%</span>
                    <span class="summary-label">Average Score</span>
                </div>
                <div class="summary-item">
                    <span class="summary-number">3</span>
                    <span class="summary-label">Top 10% Results</span>
                </div>
            </div>
            
            <div class="detailed-scores">
                <div class="score-row">
                    <div class="score-details">
                        <h4>JavaScript Fundamentals</h4>
                        <p>Completed on March 15, 2025</p>
                    </div>
                    <div class="score-result">
                        <span class="score-percentage">92%</span>
                        <span class="score-rank">Top 5%</span>
                    </div>
                </div>
                
                <div class="score-row">
                    <div class="score-details">
                        <h4>React Development</h4>
                        <p>Completed on March 20, 2025</p>
                    </div>
                    <div class="score-result">
                        <span class="score-percentage">89%</span>
                        <span class="score-rank">Top 12%</span>
                    </div>
                </div>
                
                <div class="score-row">
                    <div class="score-details">
                        <h4>Problem Solving</h4>
                        <p>Completed on March 25, 2025</p>
                    </div>
                    <div class="score-result">
                        <span class="score-percentage">95%</span>
                        <span class="score-rank">Top 2%</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    dynamicContent.scrollIntoView({ behavior: 'smooth' });
}

function showApplications() {
    const dynamicContent = document.getElementById('dynamicContent');
    dynamicContent.innerHTML = `
        <h3><span class="icon">📋</span>Your Job Applications</h3>
        <div class="applications-list">
            <div class="application-card shortlisted">
                <div class="app-header">
                    <h4>Senior Frontend Developer</h4>
                    <span class="app-status success">Shortlisted</span>
                </div>
                <div class="app-details">
                    <p><strong>Company:</strong> Tech Innovations Inc.</p>
                    <p><strong>Applied:</strong> March 10, 2025</p>
                    <p><strong>Skills Match:</strong> JavaScript, React, Node.js</p>
                </div>
                <div class="app-actions">
                    <button class="btn btn-primary">
                        <span class="icon">🔓</span>Reveal Identity
                    </button>
                </div>
            </div>
            
            <div class="application-card pending">
                <div class="app-header">
                    <h4>Full Stack Developer</h4>
                    <span class="app-status pending">Under Review</span>
                </div>
                <div class="app-details">
                    <p><strong>Company:</strong> Digital Solutions Ltd.</p>
                    <p><strong>Applied:</strong> March 18, 2025</p>
                    <p><strong>Skills Match:</strong> Python, Django, PostgreSQL</p>
                </div>
                <div class="app-actions">
                    <button class="btn btn-outline" disabled>
                        <span class="icon">⏳</span>Waiting for Review
                    </button>
                </div>
            </div>
            
            <div class="application-card rejected">
                <div class="app-header">
                    <h4>Backend Developer</h4>
                    <span class="app-status rejected">Not Selected</span>
                </div>
                <div class="app-details">
                    <p><strong>Company:</strong> StartupXYZ</p>
                    <p><strong>Applied:</strong> March 5, 2025</p>
                    <p><strong>Skills Match:</strong> Java, Spring Boot, MySQL</p>
                </div>
                <div class="app-actions">
                    <button class="btn btn-outline">
                        <span class="icon">📄</span>View Feedback
                    </button>
                </div>
            </div>
        </div>
    `;
    
    dynamicContent.scrollIntoView({ behavior: 'smooth' });
}

function browseJobs() {
    const dynamicContent = document.getElementById('dynamicContent');
    dynamicContent.innerHTML = `
        <h3><span class="icon">🔍</span>Browse Available Jobs</h3>
        <div class="jobs-filters">
            <input type="text" placeholder="Search jobs..." class="search-input">
            <select class="filter-select">
                <option value="">All Categories</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Full Stack</option>
                <option value="mobile">Mobile</option>
            </select>
        </div>
        
        <div class="jobs-list">
            <div class="job-card">
                <div class="job-header">
                    <h4>Senior React Developer</h4>
                    <span class="job-type">Full-time</span>
                </div>
                <div class="job-details">
                    <p><strong>Required Skills:</strong> React, TypeScript, GraphQL</p>
                    <p><strong>Experience:</strong> 3-5 years</p>
                    <p><strong>Assessment Required:</strong> React Advanced Test</p>
                </div>
                <div class="job-actions">
                    <button class="btn btn-primary">
                        <span class="icon">📝</span>Apply Now
                    </button>
                    <button class="btn btn-outline">
                        <span class="icon">👁️</span>View Details
                    </button>
                </div>
            </div>
            
            <div class="job-card">
                <div class="job-header">
                    <h4>Python Backend Developer</h4>
                    <span class="job-type">Remote</span>
                </div>
                <div class="job-details">
                    <p><strong>Required Skills:</strong> Python, Django, PostgreSQL</p>
                    <p><strong>Experience:</strong> 2-4 years</p>
                    <p><strong>Assessment Required:</strong> Python & Algorithms Test</p>
                </div>
                <div class="job-actions">
                    <button class="btn btn-primary">
                        <span class="icon">📝</span>Apply Now
                    </button>
                    <button class="btn btn-outline">
                        <span class="icon">👁️</span>View Details
                    </button>
                </div>
            </div>
        </div>
    `;
    
    dynamicContent.scrollIntoView({ behavior: 'smooth' });
}

function openIdentityModal() {
    const modal = document.getElementById('identityModal');
    showModal(modal);
}

function confirmIdentityReveal() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    
    if (!fullName || !email || !phone) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // TODO: Send identity data to server
    console.log('Revealing identity:', { fullName, email, phone, location });
    
    showNotification('Identity revealed successfully! The employer can now contact you.', 'success');
    closeModal();
    
    // Hide the identity reveal card
    const identityCard = document.getElementById('identityRevealCard');
    if (identityCard) {
        identityCard.style.display = 'none';
    }
}

function viewShortlistDetails() {
    showNotification('Feature coming soon!', 'info');
}

// Utility functions
function showModal(modal) {
    if (modal) {
        modal.style.display = 'flex';
        modal.style.opacity = '0';
        modal.offsetHeight; // Force reflow
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '1';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    });
}

function updateDashboardStats() {
    // Load actual candidate data from localStorage
    const candidateData = JSON.parse(localStorage.getItem('candidateData') || '{}');
    
    // Update skill count
    const skillCount = document.getElementById('skillCount');
    if (skillCount) {
        const skills = candidateData.skills || [];
        skillCount.textContent = skills.length.toString();
    }
    
    // Update portfolio count
    const portfolioCount = document.getElementById('portfolioCount');
    if (portfolioCount) {
        const portfolioItems = candidateData.portfolioItems || [];
        portfolioCount.textContent = portfolioItems.length.toString();
    }
    
    // Update test scores
    const testScoresCount = document.getElementById('testScoresCount');
    if (testScoresCount) {
        const testScores = candidateData.testScores || [];
        testScoresCount.textContent = testScores.length.toString();
    }
    
    // Update average score
    const averageScore = document.getElementById('averageScore');
    if (averageScore) {
        const testScores = candidateData.testScores || [];
        if (testScores.length > 0) {
            const avg = testScores.reduce((sum, test) => sum + test.score, 0) / testScores.length;
            averageScore.textContent = Math.round(avg) + '%';
        } else {
            averageScore.textContent = '0%';
        }
    }
    
    // Update applications count
    const applicationsCount = document.getElementById('applicationsCount');
    if (applicationsCount) {
        const applications = candidateData.applications || [];
        applicationsCount.textContent = applications.length.toString();
    }
    
    // Update shortlisted count
    const shortlistedCount = document.getElementById('shortlistedCount');
    if (shortlistedCount) {
        const applications = candidateData.applications || [];
        const shortlisted = applications.filter(app => app.status === 'shortlisted').length;
        shortlistedCount.textContent = shortlisted.toString();
    }
    
    // Update profile status
    const profileStatus = document.getElementById('profileStatus');
    if (profileStatus) {
        const completeness = candidateData.profileCompleteness || 0;
        if (completeness >= 80) {
            profileStatus.textContent = 'Complete';
            profileStatus.className = 'status-badge complete';
        } else if (completeness >= 50) {
            profileStatus.textContent = 'Partial';
            profileStatus.className = 'status-badge pending';
        } else {
            profileStatus.textContent = 'Incomplete';
            profileStatus.className = 'status-badge not-started';
        }
    }
}

function checkShortlistStatus() {
    // Check if candidate has been shortlisted for any jobs
    // This would typically be an API call
    const isShortlisted = localStorage.getItem('isShortlisted') === 'true';
    
    const identityCard = document.getElementById('identityRevealCard');
    if (identityCard && isShortlisted) {
        identityCard.style.display = 'block';
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function handleLogout() {
    // Clear all stored data
    localStorage.removeItem('candidateToken');
    localStorage.removeItem('candidateId');
    localStorage.removeItem('isShortlisted');
    
    // Show confirmation
    showNotification('Logged out successfully', 'success');
    
    // Redirect to login page
    setTimeout(() => {
        window.location.href = 'candidate-login.html';
    }, 1000);
}
