const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    candidateId: {
        type: String,
        unique: true,
        required: true
    },
    // Hidden information - encrypted and only revealed after selection
    personalInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }, // Hashed
        gender: String,
        location: String,
        education: [{
            institution: String,
            degree: String,
            year: Number
        }]
    },
    // Visible information
    skills: [{
        name: String,
        level: { type: Number, min: 1, max: 5 },
        verified: Boolean
    }],
    assessmentScores: [{
        testId: String,
        score: Number,
        date: Date,
        feedback: String
    }],
    projectDemos: [{
        title: String,
        description: String,
        link: String,
        verificationStatus: Boolean
    }]
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);