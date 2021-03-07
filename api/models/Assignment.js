const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema({
  nom: { type: String, required: true },
  dateRendu: { type: Date, required: true },
  auteur: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  remarques: { type: String, required: true },
  note: { type: Number, required: false },
});

module.exports = mongoose.model('Assignment', assignmentSchema);