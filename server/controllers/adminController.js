const Job = require('../models/jobModel');
const Candidate = require('../models/candidateModel');
const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'blindhire_secret';

// List all jobs
const listJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('employer', 'companyName');
        res.status(200).json({ jobs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// List all candidates and their assessment status for a job
const listCandidatesForJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const candidates = await Candidate.find({ 'assessmentScores.testId': jobId })
            .select('candidateId skills assessmentScores projectDemos personalInfo');
        res.status(200).json({ candidates });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin registration
const registerAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required.' });
        }
        const existing = await Admin.findOne({ email });
        if (existing) {
            return res.status(409).json({ error: 'Email already registered.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ username, email, password: hashedPassword });
        await admin.save();
        res.status(201).json({ message: 'Admin registered successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        // Issue JWT
        const token = jwt.sign({ id: admin._id, role: 'admin' }, SECRET, { expiresIn: '2h' });
        res.status(200).json({ message: 'Login successful.', adminId: admin._id, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin,
    listJobs,
    listCandidatesForJob
};
