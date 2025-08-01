const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    industry: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    jobPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    shortlistedCandidates: [{
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
        candidateIds: [String]
    }]
}, { timestamps: true });

module.exports = mongoose.model('Employer', employerSchema);