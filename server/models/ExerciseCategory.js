const mongoose = require('mongoose');

const exerciseCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const ExerciseCategory = mongoose.model('ExerciseCategory', exerciseCategorySchema);

module.exports = ExerciseCategory;
