const router = require('express').Router();
const { authenticateEmployer, authenticateAdmin } = require('../middleware/auth');
const { candidates, employers } = require('../controllers');
const adminController = require('../controllers/adminController');

// Admin auth endpoints
router.post('/admin/register', adminController.registerAdmin);
router.post('/admin/login', adminController.loginAdmin);

// Candidate routes
router.post('/candidates/register', candidates.register);
router.post('/candidates/login', candidates.login); // <-- Added
router.post('/candidates/assessment', candidates.submitAssessment);
router.get('/candidates/profile/:candidateId', candidates.getBlindProfile);
router.get('/candidates/progress/:candidateId', candidates.getAssessmentProgress);

// Employer routes
router.post('/employers/register', employers.register); // <-- Added
router.post('/employers/login', employers.login); // <-- Added
router.post('/jobs', authenticateEmployer, employers.postJob);
router.get('/candidates/:jobId', employers.viewAnonymousCandidates);
router.post('/employers/shortlist', authenticateEmployer, employers.shortlistCandidate);
router.get('/employers/:employerId/shortlist/:jobId', employers.viewShortlist);
router.post('/employers/reveal', authenticateEmployer, employers.revealCandidateInfo);

// Admin routes (protected)
router.get('/admin/jobs', authenticateAdmin, adminController.listJobs);
router.get('/admin/candidates/:jobId', authenticateAdmin, adminController.listCandidatesForJob);

module.exports = router;
