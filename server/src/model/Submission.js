// models/Submission.js
import mongoose from 'mongoose'

const submissionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  writing: {
    type: String, // link to uploaded file
    required: true
  },
  feedback: {
    type: String
  },
  status: {
    type: String,
    enum: ['submitted', 'reviewed', 'returned'],
    default: 'submitted'
  }
}, { timestamps: true })

const Submission =  mongoose.model('Submission', submissionSchema)
export default Submission
