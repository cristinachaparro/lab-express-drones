const express = require("express");
const router = express.Router();

const Drone = require("../models/Drone.model.js");
// GET "/drones" => render a drone list
router.get("/", async (req, res, next) => {
  try {
    const droneList = await Drone.find();
    console.log(droneList);
    res.render("drones/list.hbs", { droneList });
  } catch (err) {
    next(err);
  }
});

router.get("/create", (req, res, next) => {
  res.render("drones/create-form.hbs");
});

router.post("/create", async (req, res, next) => {
  try {
    console.log(req.body);
    await Drone.create({
      name: req.body.name,
      propellers: req.body.propellers,
      maxSpeed: req.body.maxSpeed,
    });
    res.redirect("/drones");
  } catch (error) {
    next(error);
  }
});

router.get("/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post("/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post("/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
