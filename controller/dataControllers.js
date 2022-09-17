const Workout = require('../models/dataModel');
const mongoose = require('mongoose');

//get all workouts
module.exports.getWorkouts = async (req, res) => {
    const workout = await Workout.find({}).sort({ createdAt: -1 });
    
    res.status(200).json(workout);  
}

//get single workout
module.exports.getOneWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'ID does not exist '});
    }

    const workout = await Workout.findById(id);

    if(!workout){
        return res.status(404).json({ error: 'Workout not found '});
    }

    res.status(200).json(workout);
}

//create workout
module.exports.postWorkouts = async (req, res) => {
    const {title, reps, load}  = req.body;

    try{
        const workout = await Workout.create({ title, reps, load });
        res.status(200).json(workout);
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

//update workout
module.exports.updateWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'ID does not exist '});
    }

    const workout = await Workout.findOneAndUpdate({ _id: id}, { ...req.body });

    if(!workout){
        return res.status(404).json({ error: 'Workout not found '});
    }

    res.status(200).json(workout);
}

//delete workout
module.exports.deleteWorkout = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'ID does not exist '});
    }

    const workout = await Workout.findOneAndDelete({ _id: id });

    if(!workout){
        return res.status(404).json({ error: 'Workout not found '});
    }

    res.status(200).json(workout);
}