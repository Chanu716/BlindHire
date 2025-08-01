const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    skillRequirements: [{
        skill: String,
        minimumLevel: { type: Number, min: 1, max: 5 }
    }],
    assessmentCriteria: [{
        type: String,
        description: String,
        weightage: Number
    }],
    status: {
        type: String,
        enum: ['draft', 'active', 'closed'],
        default: 'draft'
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer'
    }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);