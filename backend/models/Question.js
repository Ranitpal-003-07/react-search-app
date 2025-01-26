const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  anagramType: { type: String },
  blocks: [{
    text: { type: String },
    showInOption: { type: Boolean },
    isAnswer: { type: Boolean },
  }],
  siblingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  solution: { type: String },
});

const Question = mongoose.model('Question', questionSchema, 'Questioms');

module.exports = Question;
