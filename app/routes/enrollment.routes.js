module.exports = app => {
  const enrollment = require("../controllers/enrollment.controller.js");

  var router = require("express").Router();

  // Create a new Enrollment
  router.post("/", enrollment.enroll_student);

  // Retrieve all Enrollments
  router.get("/", enrollment.findAll);

  // Retrieve all published Enrollments
  router.get("/published", enrollment.findAllPublished);

  // Retrieve a single Enrollment with id
  router.get("/:id", enrollment.findOne);

  // Update a Enrollment with id
  router.put("/:id", enrollment.update);

  // Delete a Enrollment with id
  router.delete("/:id", enrollment.delete);

  // Create a new Enrollment
  router.delete("/", enrollment.deleteAll);

  app.use("/api/enrollment", router);
};
