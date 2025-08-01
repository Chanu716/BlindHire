// dashboard-tests.js - Comprehensive functionality tests for BlindHire dashboards

function runDashboardTests() {
    console.log('🧪 Starting BlindHire Dashboard Tests...\n');
    
    // Test 1: Candidate Dashboard Tests
    console.log('👤 CANDIDATE DASHBOARD TESTS:');
    testCandidateFeatures();
    
    // Test 2: Employer Dashboard Tests  
    console.log('\n🏢 EMPLOYER DASHBOARD TESTS:');
    testEmployerFeatures();
    
    console.log('\n✅ All dashboard tests completed!');
}

function testCandidateFeatures() {
    try {
        // Test candidate ID generation
        console.log('1. Testing candidate ID generation...');
        const candidateId = localStorage.getItem('candidateId');
        console.log(`   ✓ Candidate ID: ${candidateId}`);
        
        // Test profile data
        console.log('2. Testing profile data loading...');
        const candidateData = JSON.parse(localStorage.getItem('candidateData') || '{}');
        console.log(`   ✓ Skills: ${candidateData.skills?.length || 0} skills loaded`);
        console.log(`   ✓ Portfolio: ${candidateData.portfolioItems?.length || 0} items loaded`);
        console.log(`   ✓ Test Scores: ${candidateData.testScores?.length || 0} tests completed`);
        
        // Test applications
        console.log('3. Testing application tracking...');
        const applications = candidateData.applications || [];
        console.log(`   ✓ Applications: ${applications.length} total applications`);
        const shortlisted = applications.filter(app => app.status === 'shortlisted').length;
        console.log(`   ✓ Shortlisted: ${shortlisted} applications shortlisted`);
        
        // Test UI elements
        console.log('4. Testing UI elements...');
        const candidateIdElement = document.getElementById('candidateId');
        const profileBtn = document.getElementById('editProfileBtn');
        const testBtn = document.getElementById('takeTestBtn');
        
        console.log(`   ✓ Candidate ID display: ${candidateIdElement ? 'Found' : 'Missing'}`);
        console.log(`   ✓ Profile button: ${profileBtn ? 'Found' : 'Missing'}`);
        console.log(`   ✓ Test button: ${testBtn ? 'Found' : 'Missing'}`);
        
    } catch (error) {
        console.error('❌ Candidate dashboard test failed:', error);
    }
}

function testEmployerFeatures() {
    try {
        // Test employer data
        console.log('1. Testing employer data loading...');
        const employerData = JSON.parse(localStorage.getItem('employerData') || '{}');
        console.log(`   ✓ Company: ${employerData.companyName || 'Not set'}`);
        console.log(`   ✓ Industry: ${employerData.industry || 'Not set'}`);
        console.log(`   ✓ Size: ${employerData.companySize || 'Not set'}`);
        
        // Test job posts
        console.log('2. Testing job posts...');
        const jobPosts = JSON.parse(localStorage.getItem('jobPosts') || '[]');
        const companyJobs = jobPosts.filter(job => job.companyId === employerData.id);
        console.log(`   ✓ Total job posts: ${jobPosts.length}`);
        console.log(`   ✓ Company job posts: ${companyJobs.length}`);
        
        // Test candidates
        console.log('3. Testing candidate data...');
        const candidates = JSON.parse(localStorage.getItem('candidateProfiles') || '[]');
        console.log(`   ✓ Available candidates: ${candidates.length}`);
        
        // Test UI elements
        console.log('4. Testing UI elements...');
        const companyNameElement = document.getElementById('companyName');
        const editCompanyBtn = document.getElementById('editCompanyBtn');
        const myJobsBtn = document.getElementById('myJobsBtn');
        const postJobBtn = document.getElementById('postJobBtn');
        
        console.log(`   ✓ Company name display: ${companyNameElement ? 'Found' : 'Missing'}`);
        console.log(`   ✓ Edit company button: ${editCompanyBtn ? 'Found' : 'Missing'}`);
        console.log(`   ✓ My jobs button: ${myJobsBtn ? 'Found' : 'Missing'}`);
        console.log(`   ✓ Post job button: ${postJobBtn ? 'Found' : 'Missing'}`);
        
        // Test statistics
        console.log('5. Testing dashboard statistics...');
        const totalJobs = document.getElementById('totalJobs');
        const totalApplications = document.getElementById('totalApplications');
        const shortlistedCount = document.getElementById('shortlistedCount');
        const hiresCount = document.getElementById('hiresCount');
        
        console.log(`   ✓ Total jobs stat: ${totalJobs?.textContent || '0'}`);
        console.log(`   ✓ Applications stat: ${totalApplications?.textContent || '0'}`);
        console.log(`   ✓ Shortlisted stat: ${shortlistedCount?.textContent || '0'}`);
        console.log(`   ✓ Hires stat: ${hiresCount?.textContent || '0'}`);
        
    } catch (error) {
        console.error('❌ Employer dashboard test failed:', error);
    }
}

// Test individual features
function testCandidateProfile() {
    console.log('🧪 Testing candidate profile functionality...');
    
    // Simulate opening profile modal
    if (window.openProfileModal) {
        try {
            window.openProfileModal();
            console.log('   ✓ Profile modal opened successfully');
        } catch (error) {
            console.error('   ❌ Profile modal failed:', error);
        }
    } else {
        console.log('   ⚠️ openProfileModal function not found');
    }
}

function testSkillTest() {
    console.log('🧪 Testing skill test functionality...');
    
    if (window.takeSkillTest) {
        try {
            window.takeSkillTest();
            console.log('   ✓ Skill test opened successfully');
        } catch (error) {
            console.error('   ❌ Skill test failed:', error);
        }
    } else {
        console.log('   ⚠️ takeSkillTest function not found');
    }
}

function testJobPosting() {
    console.log('🧪 Testing job posting functionality...');
    
    if (window.openJobPostModal) {
        try {
            window.openJobPostModal();
            console.log('   ✓ Job post modal opened successfully');
        } catch (error) {
            console.error('   ❌ Job posting failed:', error);
        }
    } else {
        console.log('   ⚠️ openJobPostModal function not found');
    }
}

function testApplications() {
    console.log('🧪 Testing applications functionality...');
    
    if (window.showApplications) {
        try {
            window.showApplications();
            console.log('   ✓ Applications view opened successfully');
        } catch (error) {
            console.error('   ❌ Applications view failed:', error);
        }
    } else {
        console.log('   ⚠️ showApplications function not found');
    }
}

// Quick functionality test
function quickTest() {
    console.log('⚡ Running quick functionality test...\n');
    
    // Test localStorage data
    const hasJobPosts = localStorage.getItem('jobPosts') !== null;
    const hasCandidateData = localStorage.getItem('candidateData') !== null;
    const hasEmployerData = localStorage.getItem('employerData') !== null;
    
    console.log(`📊 Data Status:`);
    console.log(`   Job Posts: ${hasJobPosts ? '✓' : '❌'}`);
    console.log(`   Candidate Data: ${hasCandidateData ? '✓' : '❌'}`);
    console.log(`   Employer Data: ${hasEmployerData ? '✓' : '❌'}`);
    
    // Test current page
    const currentPage = window.location.pathname.split('/').pop();
    console.log(`\n📄 Current Page: ${currentPage}`);
    
    if (currentPage === 'candidate.html') {
        console.log('Running candidate-specific tests...');
        testCandidateFeatures();
    } else if (currentPage === 'employer.html') {
        console.log('Running employer-specific tests...');
        testEmployerFeatures();
    }
}

// Auto-run tests when script loads
if (typeof window !== 'undefined') {
    // Make functions globally available
    window.runDashboardTests = runDashboardTests;
    window.quickTest = quickTest;
    window.testCandidateProfile = testCandidateProfile;
    window.testSkillTest = testSkillTest;
    window.testJobPosting = testJobPosting;
    window.testApplications = testApplications;
    
    // Auto-run quick test after page loads
    setTimeout(quickTest, 2000);
}
