const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySpecificSchema = new Schema({
  yoga: {
    instructor: { type: String },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] }
  },
  stretching: {
    equipment: { type: String },
    focus: { type: String }
  },
  weightlifting: {
    sets: { type: Number },
    reps: { type: Number },
    weight: { type: Number } // Weight in kg
  },
  cardio: {
    distance: { type: Number }, // Distance in km
    intensity: { type: String, enum: ['Low', 'Medium', 'High'] }
  }
}, { _id: false });

const exerciseLogSchema = new Schema({
  category: { type: String, required: true, enum: ['yoga', 'stretching', 'weightlifting', 'cardio'] },
  categorySpecificData: categorySpecificSchema,
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const ExerciseLog = mongoose.model('ExerciseLog', exerciseLogSchema);

module.exports = ExerciseLog;
