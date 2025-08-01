document.addEventListener('DOMContentLoaded', function() {
    // Load employer data on page load
    loadEmployerData();
    initializeEventListeners();
    updateDashboardStats();
    // Ensure sample data is available for testing
    ensureSampleData();
});

// Load employer data from localStorage and display company name
function loadEmployerData() {
    const employerData = JSON.parse(localStorage.getItem('employerData') || '{}');
    const companyNameElement = document.getElementById('companyName');
    
    if (employerData.companyName) {
        companyNameElement.textContent = employerData.companyName;
    } else {
        companyNameElement.textContent = 'Your Company';
    }
}

// Ensure sample data is available for demonstration
function ensureSampleData() {
    const existingJobs = JSON.parse(localStorage.getItem('jobPosts') || '[]');
    
    // If no job posts exist, add sample data
    if (existingJobs.length === 0 && typeof sampleJobPosts !== 'undefined') {
        localStorage.setItem('jobPosts', JSON.stringify(sampleJobPosts));
        console.log('Sample job posts loaded for demonstration');
    }
    
    // Ensure candidate profiles exist for demonstration
    const existingCandidates = JSON.parse(localStorage.getItem('candidateProfiles') || '[]');
    if (existingCandidates.length === 0 && typeof sampleCandidateProfiles !== 'undefined') {
        localStorage.setItem('candidateProfiles', JSON.stringify(sampleCandidateProfiles));
        console.log('Sample candidate profiles loaded for demonstration');
    }
}

// Initialize all event listeners
function initializeEventListeners() {
    // Edit Company Details button
    const editCompanyBtn = document.getElementById('editCompanyBtn');
    if (editCompanyBtn) {
        editCompanyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openCompanyEditModal();
        });
    }

    // My Job Posts button
    const myJobsBtn = document.getElementById('myJobsBtn');
    if (myJobsBtn) {
        myJobsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showJobPosts();
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }

    // Post Job button
    const postJobBtn = document.getElementById('postJobBtn');
    if (postJobBtn) {
        postJobBtn.addEventListener('click', function() {
            openJobPostModal();
        });
    }

    // View Candidates button
    const viewCandidatesBtn = document.getElementById('viewCandidatesBtn');
    if (viewCandidatesBtn) {
        viewCandidatesBtn.addEventListener('click', function() {
            showCandidates();
        });
    }

    // Other dashboard buttons
    const filterCandidatesBtn = document.getElementById('filterCandidatesBtn');
    if (filterCandidatesBtn) {
        filterCandidatesBtn.addEventListener('click', function() {
            openFilterModal();
        });
    }

    // Modal close buttons
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            closeAllModals();
        });
    });

    // Close modals when clicking outside
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeAllModals();
            }
        });
    });
}

// Open Company Edit Modal
function openCompanyEditModal() {
    const modal = document.getElementById('companyModal');
    const formContainer = document.getElementById('companyEditForm');
    
    if (modal && formContainer) {
        // Load current company data
        const employerData = JSON.parse(localStorage.getItem('employerData') || '{}');
        
        formContainer.innerHTML = `
            <form id="editCompanyForm">
                <div class="form-group">
                    <label for="editCompanyName">Company Name *</label>
                    <input type="text" id="editCompanyName" name="companyName" value="${employerData.companyName || ''}" required>
                </div>
                
                <div class="form-group">
                    <label for="editIndustry">Industry *</label>
                    <select id="editIndustry" name="industry" required>
                        <option value="">Select your industry</option>
                        <option value="technology" ${employerData.industry === 'technology' ? 'selected' : ''}>Technology</option>
                        <option value="finance" ${employerData.industry === 'finance' ? 'selected' : ''}>Finance & Banking</option>
                        <option value="healthcare" ${employerData.industry === 'healthcare' ? 'selected' : ''}>Healthcare</option>
                        <option value="education" ${employerData.industry === 'education' ? 'selected' : ''}>Education</option>
                        <option value="retail" ${employerData.industry === 'retail' ? 'selected' : ''}>Retail & E-commerce</option>
                        <option value="manufacturing" ${employerData.industry === 'manufacturing' ? 'selected' : ''}>Manufacturing</option>
                        <option value="consulting" ${employerData.industry === 'consulting' ? 'selected' : ''}>Consulting</option>
                        <option value="media" ${employerData.industry === 'media' ? 'selected' : ''}>Media & Entertainment</option>
                        <option value="other" ${employerData.industry === 'other' ? 'selected' : ''}>Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="editCompanySize">Company Size *</label>
                    <select id="editCompanySize" name="companySize" required>
                        <option value="">Select company size</option>
                        <option value="1-10" ${employerData.companySize === '1-10' ? 'selected' : ''}>1-10 employees</option>
                        <option value="11-50" ${employerData.companySize === '11-50' ? 'selected' : ''}>11-50 employees</option>
                        <option value="51-200" ${employerData.companySize === '51-200' ? 'selected' : ''}>51-200 employees</option>
                        <option value="201-500" ${employerData.companySize === '201-500' ? 'selected' : ''}>201-500 employees</option>
                        <option value="501-1000" ${employerData.companySize === '501-1000' ? 'selected' : ''}>501-1000 employees</option>
                        <option value="1000+" ${employerData.companySize === '1000+' ? 'selected' : ''}>1000+ employees</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="editWebsite">Company Website</label>
                    <input type="url" id="editWebsite" name="website" value="${employerData.website || ''}" placeholder="https://yourcompany.com">
                </div>
                
                <div class="form-group">
                    <label for="editLocation">Location *</label>
                    <input type="text" id="editLocation" name="location" value="${employerData.location || ''}" required>
                </div>
                
                <div class="form-group">
                    <label for="editDescription">Company Description</label>
                    <textarea id="editDescription" name="companyDescription" rows="4">${employerData.companyDescription || ''}</textarea>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="closeAllModals()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                </div>
            </form>
        `;
        
        // Add form submit handler
        const form = document.getElementById('editCompanyForm');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            saveCompanyDetails(new FormData(form));
        });
        
        modal.style.display = 'flex';
    }
}

// Save company details
function saveCompanyDetails(formData) {
    const employerData = JSON.parse(localStorage.getItem('employerData') || '{}');
    
    // Update employer data with form values
    for (let [key, value] of formData.entries()) {
        employerData[key] = value;
    }
    
    // Save back to localStorage
    localStorage.setItem('employerData', JSON.stringify(employerData));
    
    // Update company name in header
    document.getElementById('companyName').textContent = employerData.companyName;
    
    // Show success message
    showNotification('Company details updated successfully!', 'success');
    
    // Close modal
    closeAllModals();
}

// Show Job Posts
function showJobPosts() {
    const dynamicContent = document.getElementById('dynamicContent');
    const jobPosts = JSON.parse(localStorage.getItem('jobPosts') || '[]');
    
    // Show loading state briefly for better UX
    dynamicContent.innerHTML = `
        <div class="loading-state" style="text-align: center; padding: 40px;">
            <div style="font-size: 2rem; margin-bottom: 15px;">📋</div>
            <h3>Loading Job Posts...</h3>
        </div>
    `;
    
    dynamicContent.classList.add('has-content');
    dynamicContent.style.display = 'block';
    
    // Scroll to content area first
    dynamicContent.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
    
    // Show actual content after a brief delay
    setTimeout(() => {
        dynamicContent.innerHTML = `
            <div class="job-posts-section" style="position: relative;">
                <div class="section-header">
                    <h2><span class="icon">📋</span>My Job Posts</h2>
                    <button class="btn btn-primary" onclick="openJobPostModal()">
                        <span class="icon">➕</span>Post New Job
                    </button>
                </div>
                
                <div class="jobs-grid">
                    ${jobPosts.length > 0 ? jobPosts.map(job => `
                        <div class="job-card">
                            <div class="job-header">
                                <h3>${job.title}</h3>
                                <span class="job-status ${job.status || 'active'}">${job.status || 'Active'}</span>
                            </div>
                            <div class="job-details">
                                <p><strong>Location:</strong> ${job.location}</p>
                                <p><strong>Type:</strong> ${job.type}</p>
                                <p><strong>Experience:</strong> ${job.experience}</p>
                                <p><strong>Posted:</strong> ${new Date(job.datePosted).toLocaleDateString()}</p>
                            </div>
                            <div class="job-stats">
                                <span class="stat">
                                    <span class="icon">👥</span>
                                    <span>${job.applications || 0} Applications</span>
                                </span>
                                <span class="stat">
                                    <span class="icon">⭐</span>
                                    <span>${job.shortlisted || 0} Shortlisted</span>
                                </span>
                            </div>
                            <div class="job-actions">
                                <button class="btn btn-outline btn-sm" onclick="editJob('${job.id}')">Edit</button>
                                <button class="btn btn-secondary btn-sm" onclick="viewJobApplications('${job.id}')">View Applications</button>
                            </div>
                        </div>
                    `).join('') : `
                        <div class="empty-state">
                            <div class="empty-icon">📝</div>
                            <h3>No Job Posts Yet</h3>
                            <p>Start by creating your first job post to attract talented candidates.</p>
                            <button class="btn btn-primary" onclick="openJobPostModal()">
                                <span class="icon">➕</span>Create First Job Post
                            </button>
                        </div>
                    `}
                </div>
            </div>
        `;
    }, 500);
}

// Open Job Post Modal
function openJobPostModal() {
    const modal = document.getElementById('jobPostModal');
    const formContainer = document.getElementById('jobPostForm');
    
    if (modal && formContainer) {
        formContainer.innerHTML = `
            <form id="createJobForm">
                <div class="form-group">
                    <label for="jobTitle">Job Title *</label>
                    <input type="text" id="jobTitle" name="title" required placeholder="e.g., Senior Frontend Developer">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="jobLocation">Location *</label>
                        <input type="text" id="jobLocation" name="location" required placeholder="e.g., Remote, New York, etc.">
                    </div>
                    <div class="form-group">
                        <label for="jobType">Job Type *</label>
                        <select id="jobType" name="type" required>
                            <option value="">Select type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="jobExperience">Experience Level *</label>
                        <select id="jobExperience" name="experience" required>
                            <option value="">Select experience level</option>
                            <option value="Entry Level">Entry Level (0-2 years)</option>
                            <option value="Mid Level">Mid Level (3-5 years)</option>
                            <option value="Senior Level">Senior Level (6+ years)</option>
                            <option value="Lead/Manager">Lead/Manager</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="jobSalary">Salary Range</label>
                        <input type="text" id="jobSalary" name="salary" placeholder="e.g., $80,000 - $120,000">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="jobDescription">Job Description *</label>
                    <textarea id="jobDescription" name="description" rows="6" required placeholder="Describe the role, responsibilities, and what you're looking for..."></textarea>
                </div>
                
                <div class="form-group">
                    <label for="jobSkills">Required Skills *</label>
                    <input type="text" id="jobSkills" name="skills" required placeholder="e.g., JavaScript, React, Node.js (comma separated)">
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="closeAllModals()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Post Job</button>
                </div>
            </form>
        `;
        
        // Add form submit handler
        const form = document.getElementById('createJobForm');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            createJobPost(new FormData(form));
        });
        
        modal.style.display = 'flex';
    }
}

// Create new job post
function createJobPost(formData) {
    const jobPosts = JSON.parse(localStorage.getItem('jobPosts') || '[]');
    const employerData = JSON.parse(localStorage.getItem('employerData') || '{}');
    
    const newJob = {
        id: 'JOB-' + Date.now(),
        companyId: employerData.id,
        companyName: employerData.companyName,
        datePosted: new Date().toISOString(),
        status: 'active',
        applications: 0,
        shortlisted: 0
    };
    
    // Add form data to job object
    for (let [key, value] of formData.entries()) {
        newJob[key] = value;
    }
    
    // Convert skills string to array
    if (newJob.skills) {
        newJob.skillsArray = newJob.skills.split(',').map(skill => skill.trim());
    }
    
    jobPosts.push(newJob);
    localStorage.setItem('jobPosts', JSON.stringify(jobPosts));
    
    showNotification('Job posted successfully!', 'success');
    closeAllModals();
    updateDashboardStats();
    
    // If job posts view is open, refresh it
    const dynamicContent = document.getElementById('dynamicContent');
    if (dynamicContent.querySelector('.job-posts-section')) {
        showJobPosts();
    }
}

// Show candidates
function showCandidates() {
    const dynamicContent = document.getElementById('dynamicContent');
    
    // Get sample candidate data (in real app, this would come from server)
    const candidates = JSON.parse(localStorage.getItem('candidateProfiles') || '[]');
    
    dynamicContent.innerHTML = `
        <div class="candidates-section">
            <div class="section-header">
                <h2><span class="icon">👥</span>Anonymous Candidate Profiles</h2>
                <button class="btn btn-outline" onclick="openFilterModal()">
                    <span class="icon">🔍</span>Filter Candidates
                </button>
            </div>
            
            <div class="candidates-grid">
                ${candidates.length > 0 ? candidates.map(candidate => `
                    <div class="candidate-card">
                        <div class="candidate-header">
                            <h3>Candidate ${candidate.id}</h3>
                            <span class="skill-score">${candidate.averageScore || 85}% Avg Score</span>
                        </div>
                        <div class="candidate-skills">
                            <strong>Skills:</strong>
                            <div class="skills-tags">
                                ${(candidate.skills || ['JavaScript', 'React', 'Node.js']).map(skill => 
                                    `<span class="skill-tag">${skill}</span>`
                                ).join('')}
                            </div>
                        </div>
                        <div class="candidate-stats">
                            <div class="stat">
                                <span class="label">Tests Completed:</span>
                                <span class="value">${candidate.testsCompleted || 3}</span>
                            </div>
                            <div class="stat">
                                <span class="label">Projects:</span>
                                <span class="value">${candidate.projects || 5}</span>
                            </div>
                        </div>
                        <div class="candidate-actions">
                            <button class="btn btn-primary btn-sm" onclick="shortlistCandidate('${candidate.id}')">
                                <span class="icon">⭐</span>Shortlist
                            </button>
                            <button class="btn btn-outline btn-sm" onclick="viewCandidateDetails('${candidate.id}')">
                                View Details
                            </button>
                        </div>
                    </div>
                `).join('') : `
                    <div class="empty-state">
                        <div class="empty-icon">👥</div>
                        <h3>No Candidates Available</h3>
                        <p>Candidates will appear here when they complete their profiles and assessments.</p>
                    </div>
                `}
            </div>
        </div>
    `;
    
    dynamicContent.classList.add('has-content');
    dynamicContent.style.display = 'block';
}

// Update dashboard statistics
function updateDashboardStats() {
    const jobPosts = JSON.parse(localStorage.getItem('jobPosts') || '[]');
    const employerData = JSON.parse(localStorage.getItem('employerData') || '{}');
    
    // Filter jobs for this employer
    const myJobs = jobPosts.filter(job => job.companyId === employerData.id);
    
    // Update statistics
    document.getElementById('totalJobs').textContent = myJobs.length;
    
    const totalApplications = myJobs.reduce((sum, job) => sum + (job.applications || 0), 0);
    document.getElementById('totalApplications').textContent = totalApplications;
    
    const totalShortlisted = myJobs.reduce((sum, job) => sum + (job.shortlisted || 0), 0);
    document.getElementById('shortlistedCount').textContent = totalShortlisted;
    
    // Update hires count (placeholder)
    document.getElementById('hiresCount').textContent = Math.floor(totalShortlisted * 0.3);
}

// Utility functions
function closeAllModals() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function handleLogout() {
    localStorage.removeItem('employerData');
    localStorage.removeItem('userType');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

// Additional functions for job management
function editJob(jobId) {
    showNotification('Job editing feature coming soon!', 'info');
}

function viewJobApplications(jobId) {
    showNotification('Applications view coming soon!', 'info');
}

function shortlistCandidate(candidateId) {
    showNotification('Candidate shortlisted successfully!', 'success');
}

function viewCandidateDetails(candidateId) {
    showNotification('Candidate details view coming soon!', 'info');
}

function openFilterModal() {
    const modal = document.getElementById('filterModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}
