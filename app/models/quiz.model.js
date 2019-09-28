
const mongoose = require('mongoose');

const QuizSchema = mongoose.Schema({
    quiz_id: String,
    fullWord: String,
    options: String,
    answerWord: String,
    description: String
}, {
    timestamps: true
});
module.exports = mongoose.model('Quiz', QuizSchema, 'quiz');
