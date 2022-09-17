const { Schema, model } = require('mongoose');

//making a schema for data document
const dataSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Workout = model('workout', dataSchema);

module.exports = Workout;