const Employer = require('../models/employerModel');
const Job = require('../models/jobModel');
const Candidate = require('../models/candidateModel');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'blindhire_secret';

const register = async (req, res) => {
    try {
        const { companyName, industry, email, password } = req.body;
        if (!companyName || !industry || !email || !password) {
            return res.status(400).json({ error: 'Company name, industry, email, and password are required.' });
        }
        const existing = await Employer.findOne({ email });
        if (existing) {
            return res.status(409).json({ error: 'Email already registered.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const employer = new Employer({ companyName, industry, email, password: hashedPassword });
        await employer.save();
        res.status(201).json({ message: 'Employer registered successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }
        const employer = await Employer.findOne({ email });
        if (!employer) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const match = await bcrypt.compare(password, employer.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const token = jwt.sign({ id: employer._id, role: 'employer' }, SECRET, { expiresIn: '2h' });
        res.status(200).json({ message: 'Login successful.', employerId: employer._id, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postJob = async (req, res) => {
    try {
        const job = new Job({
            ...req.body,
            employer: req.employerId
        });
        
        await job.save();
        await Employer.findByIdAndUpdate(
            req.employerId,
            { $push: { jobPosts: job._id } }
        );
        
        res.status(201).json({ message: 'Job posted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const viewAnonymousCandidates = async (req, res) => {
    try {
        const { jobId } = req.params;
        const candidates = await Candidate.find({
            'assessmentScores.testId': jobId
        }).select('-personalInfo');
        
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const shortlistCandidate = async (req, res) => {
    try {
        const { employerId, jobId, candidateId } = req.body;
        const employer = await Employer.findById(employerId);
        if (!employer) return res.status(404).json({ error: 'Employer not found' });
        // Find or create shortlist entry for this job
        let shortlist = employer.shortlistedCandidates.find(s => s.jobId.toString() === jobId);
        if (shortlist) {
            if (!shortlist.candidateIds.includes(candidateId)) {
                shortlist.candidateIds.push(candidateId);
            }
        } else {
            employer.shortlistedCandidates.push({ jobId, candidateIds: [candidateId] });
        }
        await employer.save();
        res.status(200).json({ message: 'Candidate shortlisted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const viewShortlist = async (req, res) => {
    try {
        const { employerId, jobId } = req.params;
        const employer = await Employer.findById(employerId);
        if (!employer) return res.status(404).json({ error: 'Employer not found' });
        const shortlist = employer.shortlistedCandidates.find(s => s.jobId.toString() === jobId);
        if (!shortlist) return res.status(200).json({ candidateIds: [] });
        res.status(200).json({ candidateIds: shortlist.candidateIds });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const revealCandidateInfo = async (req, res) => {
    try {
        const { employerId, jobId, candidateId } = req.body;
        const employer = await Employer.findById(employerId);
        if (!employer) return res.status(404).json({ error: 'Employer not found' });
        const shortlist = employer.shortlistedCandidates.find(s => s.jobId.toString() === jobId);
        if (!shortlist || !shortlist.candidateIds.includes(candidateId)) {
            return res.status(403).json({ error: 'Candidate not shortlisted for this job' });
        }
        const candidate = await Candidate.findOne({ _id: candidateId });
        if (!candidate) return res.status(404).json({ error: 'Candidate not found' });
        res.status(200).json({ personalInfo: candidate.personalInfo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register,
    login,
    postJob,
    viewAnonymousCandidates,
    shortlistCandidate,
    viewShortlist,
    revealCandidateInfo
};