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
    res.redirect("/drones");
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const droneInfo = await Drone.findById(req.params.id);
    console.log(droneInfo);
    res.render("drones/update-form.hbs", droneInfo);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    await Drone.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      propellers: req.body.propellers,
      maxSpeed: req.body.maxSpeed,
    });
    res.redirect("/drones");
  } catch (err) {
    res.redirect("/drones");
  }
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    await Drone.findByIdAndDelete(req.params.id);
    res.redirect("/drones");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
