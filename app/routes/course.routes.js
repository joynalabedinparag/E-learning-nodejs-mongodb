module.exports = app => {
  const course = require("../controllers/course.controller.js");

  var router = require("express").Router();

  // Create a new Course
  router.post("/", course.create_course);

  // Retrieve all course
  router.get("/", course.get_courses);

  // Retrieve all published course
  // router.get("/published", course.findAllPublished);
  
  // Filter Courses by property
  router.get("/:prop/:value", course.filter_courses);

  // Retrieve a single Course with id
  router.get("/:id", course.get_course_by_id);
  
  // Update a Course with id
  router.put("/:id", course.update);

  // Delete a Course with id
  router.delete("/:id", course.delete);

  // Create a new Course
  router.delete("/", course.deleteAll);

  app.use("/api/courses", router);
};
