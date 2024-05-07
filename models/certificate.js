import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const certificateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    driveLink: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    }
});

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
