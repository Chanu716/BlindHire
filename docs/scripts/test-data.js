// Test data for BlindHire dashboards
// This script initializes sample data for testing purposes

document.addEventListener('DOMContentLoaded', function() {
    initializeTestData();
});

function initializeTestData() {
    // Only initialize if we're running locally and no real data exists
    if (location.protocol === 'file:' && !localStorage.getItem('testDataInitialized')) {
        
        // Sample job posts
        const sampleJobPosts = [
            {
                id: 'JOB-1722483600001',
                companyId: 'EMP-1722483600001',
                companyName: 'TechCorp Solutions',
                title: 'Senior Frontend Developer',
                location: 'Remote',
                type: 'Full-time',
                experience: 'Senior Level',
                salary: '$90,000 - $130,000',
                description: 'We are looking for an experienced frontend developer to join our team and build amazing user interfaces with React and TypeScript.',
                skills: 'React, TypeScript, JavaScript, CSS, HTML',
                skillsArray: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
                datePosted: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
                status: 'active',
                applications: 15,
                shortlisted: 3
            },
            {
                id: 'JOB-1722483600002',
                companyId: 'EMP-1722483600001',
                companyName: 'TechCorp Solutions',
                title: 'Backend Engineer',
                location: 'New York, NY',
                type: 'Full-time',
                experience: 'Mid Level',
                salary: '$80,000 - $110,000',
                description: 'Join our backend team to build scalable APIs and microservices using Node.js and Python.',
                skills: 'Node.js, Python, MongoDB, PostgreSQL, AWS',
                skillsArray: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'AWS'],
                datePosted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
                status: 'active',
                applications: 8,
                shortlisted: 2
            },
            {
                id: 'JOB-1722483600003',
                companyId: 'EMP-1722483600002',
                companyName: 'InnovateLabs',
                title: 'Full Stack Developer',
                location: 'San Francisco, CA',
                type: 'Full-time',
                experience: 'Mid Level',
                salary: '$95,000 - $125,000',
                description: 'Work on cutting-edge projects using modern web technologies. Experience with both frontend and backend development required.',
                skills: 'React, Node.js, JavaScript, TypeScript, PostgreSQL',
                skillsArray: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'PostgreSQL'],
                datePosted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
                status: 'active',
                applications: 12,
                shortlisted: 4
            }
        ];

        // Sample candidate profiles
        const sampleCandidateProfiles = [
            {
                id: 'BH-2025-1234',
                skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'CSS'],
                averageScore: 92,
                testsCompleted: 5,
                projects: 7,
                applicationCount: 3,
                shortlistedCount: 1,
                experience: 'Mid Level',
                isAvailable: true
            },
            {
                id: 'BH-2025-5678',
                skills: ['Python', 'Django', 'PostgreSQL', 'AWS', 'Docker'],
                averageScore: 88,
                testsCompleted: 4,
                projects: 5,
                applicationCount: 2,
                shortlistedCount: 2,
                experience: 'Senior Level',
                isAvailable: true
            },
            {
                id: 'BH-2025-9012',
                skills: ['Java', 'Spring Boot', 'MySQL', 'Microservices', 'Kubernetes'],
                averageScore: 85,
                testsCompleted: 6,
                projects: 8,
                applicationCount: 4,
                shortlistedCount: 1,
                experience: 'Senior Level',
                isAvailable: true
            },
            {
                id: 'BH-2025-3456',
                skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
                averageScore: 90,
                testsCompleted: 3,
                projects: 6,
                applicationCount: 2,
                shortlistedCount: 0,
                experience: 'Mid Level',
                isAvailable: true
            }
        ];

        // Sample employer data
        const sampleEmployerData = {
            id: 'EMP-1722483600001',
            companyName: 'TechCorp Solutions',
            industry: 'technology',
            companySize: '51-200',
            website: 'https://techcorp.example.com',
            contactPersonName: 'Sarah Johnson',
            jobTitle: 'HR Manager',
            email: 'sarah.johnson@techcorp.example.com',
            phone: '+1 (555) 123-4567',
            location: 'San Francisco, CA',
            headquarters: '123 Tech Street, San Francisco, CA 94105',
            hiringGoals: 'fullstack',
            companyDescription: 'We are a leading technology company focused on building innovative software solutions for businesses worldwide.',
            registrationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
            status: 'active'
        };

        // Sample candidate data
        const sampleCandidateData = {
            id: 'BH-2025-1234',
            candidateId: 'BH-2025-1234',
            skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'CSS', 'HTML'],
            portfolioItems: [
                {
                    id: '1',
                    title: 'E-commerce Platform',
                    description: 'Built a full-stack e-commerce platform using React and Node.js',
                    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
                    githubUrl: 'https://github.com/example/ecommerce',
                    liveUrl: 'https://ecommerce-demo.example.com'
                },
                {
                    id: '2',
                    title: 'Task Management App',
                    description: 'Real-time task management application with team collaboration features',
                    technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
                    githubUrl: 'https://github.com/example/taskapp',
                    liveUrl: 'https://taskapp-demo.example.com'
                }
            ],
            testScores: [
                { test: 'JavaScript Fundamentals', score: 95, dateCompleted: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
                { test: 'React Development', score: 92, dateCompleted: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() },
                { test: 'Node.js Backend', score: 88, dateCompleted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
                { test: 'CSS & Styling', score: 90, dateCompleted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
                { test: 'Problem Solving', score: 94, dateCompleted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() }
            ],
            applications: [
                {
                    id: 'APP-001',
                    jobId: 'JOB-1722483600001',
                    jobTitle: 'Senior Frontend Developer',
                    companyName: 'TechCorp Solutions',
                    appliedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                    status: 'shortlisted',
                    lastUpdate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: 'APP-002',
                    jobId: 'JOB-1722483600003',
                    jobTitle: 'Full Stack Developer',
                    companyName: 'InnovateLabs',
                    appliedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                    status: 'under_review',
                    lastUpdate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: 'APP-003',
                    jobId: 'JOB-1722483600002',
                    jobTitle: 'Backend Engineer',
                    companyName: 'TechCorp Solutions',
                    appliedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                    status: 'applied',
                    lastUpdate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
                }
            ],
            profileCompleteness: 85,
            isShortlisted: true,
            registrationDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
        };

        // Store sample data in localStorage
        localStorage.setItem('jobPosts', JSON.stringify(sampleJobPosts));
        localStorage.setItem('candidateProfiles', JSON.stringify(sampleCandidateProfiles));
        localStorage.setItem('employerData', JSON.stringify(sampleEmployerData));
        localStorage.setItem('candidateData', JSON.stringify(sampleCandidateData));
        localStorage.setItem('candidateId', sampleCandidateData.candidateId);
        localStorage.setItem('userType', 'candidate'); // Set default for testing
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('testDataInitialized', 'true');

        console.log('✅ Test data initialized successfully!');
        console.log('📊 Sample data includes:');
        console.log('- 3 job posts from 2 companies');
        console.log('- 4 candidate profiles');
        console.log('- Complete employer and candidate data');
        console.log('- Portfolio items and test scores');
        console.log('- Application history');
    }
}

// Function to reset test data (useful for testing)
function resetTestData() {
    const keysToRemove = [
        'jobPosts', 'candidateProfiles', 'employerData', 'candidateData',
        'candidateId', 'userType', 'isLoggedIn', 'testDataInitialized'
    ];
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log('🗑️ Test data reset. Refresh page to reinitialize.');
}

// Expose reset function globally for debugging
window.resetTestData = resetTestData;
