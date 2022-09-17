const express = require('express');

//route controller
const controller = require('../controller/dataControllers');

//guard function
const verifier = require('../verifier/verifier');

//init express route
const router = express.Router();

router.use(verifier);

//routes
router.get('/workouts', controller.getWorkouts);
router.get('/workouts/:id', controller.getOneWorkout);
router.post('/workouts', controller.postWorkouts);
router.patch('/workouts/:id', controller.updateWorkout);
router.delete('/workouts/:id', controller.deleteWorkout);

module.exports = router;