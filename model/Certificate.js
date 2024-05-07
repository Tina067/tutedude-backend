// models/Certificate.js

import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: String, required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
