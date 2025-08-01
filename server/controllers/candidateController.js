const Candidate = require('../models/candidateModel');
const crypto = require('crypto');

const register = async (req, res) => {
    try {
        const candidateId = `CAND${crypto.randomBytes(4).toString('hex')}`;
        const { name, email, password, gender, location, education } = req.body.personalInfo;
        const hashedPassword = await bcrypt.hash(password, 10);
        const candidate = new Candidate({
            candidateId,
            personalInfo: {
                name,
                email,
                password: hashedPassword,
                gender,
                location,
                education
            },
            skills: []
        });
        await candidate.save();
        res.status(201).json({ 
            message: 'Candidate registered successfully',
            candidateId 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const submitAssessment = async (req, res) => {
    try {
        const { candidateId, assessment } = req.body;
        const candidate = await Candidate.findOneAndUpdate(
            { candidateId },
            { $push: { assessmentScores: assessment } },
            { new: true }
        );
        res.status(200).json({ message: 'Assessment submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBlindProfile = async (req, res) => {
    try {
        const { candidateId } = req.params;
        const candidate = await Candidate.findOne({ candidateId }).select('-personalInfo -_id -__v');
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        // Only return skills, assessmentScores, projectDemos, candidateId
        const { candidateId: id, skills, assessmentScores, projectDemos } = candidate;
        res.status(200).json({ candidateId: id, skills, assessmentScores, projectDemos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAssessmentProgress = async (req, res) => {
    try {
        const { candidateId } = req.params;
        const candidate = await Candidate.findOne({ candidateId }).select('assessmentScores -_id');
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.status(200).json({ assessmentScores: candidate.assessmentScores });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = process.env.JWT_SECRET || 'blindhire_secret';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }
        // Find candidate by email
        const candidate = await Candidate.findOne({ 'personalInfo.email': email });
        if (!candidate || !candidate.personalInfo.password) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        // Compare password
        const match = await bcrypt.compare(password, candidate.personalInfo.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        // Issue JWT
        const token = jwt.sign({ id: candidate._id, role: 'candidate' }, SECRET, { expiresIn: '2h' });
        res.status(200).json({ message: 'Login successful.', candidateId: candidate.candidateId, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register,
    login,
    submitAssessment,
    getBlindProfile,
    getAssessmentProgress
};