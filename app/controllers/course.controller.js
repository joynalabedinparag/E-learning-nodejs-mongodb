const db = require("../models");
const courseService = require("../services/course.service");
const Course = db.course;

class CourseController {
  async create_course(req, res) {
      // Validate request
      if (!req.body.title || !req.body.description || !req.body.duration) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }

      const course = new Course({
        title: req.body.title,
        description: req.body.description,
        instructor: req.body.instructor,
        duration: req.body.duration,
        price: req.body.price,
      });
      let r = await courseService.create_course(req);
      res.status(r.status).send({message: r.message});
  };

  async get_courses (req, res) {
    const title = req.body.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    let r = await courseService.get_course(condition)
    res.status(r.status).send(r.data);
  };

  async filter_courses (req, res) {
    let allowed_filters = ['instructor', 'title', 'description', 'price'];
    const prop = req.params.prop;
    const value = req.params.value;
  
    if((allowed_filters).includes(prop)) {
      let query = {};
      query[`${prop}`] = { $regex: '^' + value, $options: 'i' };
      
      let r = await courseService.filter_courses(query);
      res.status(r.status).send(r.data);
    } else {
      res.status(400).send({ message: "Invalid Property Name! Property must be one of the followings:" + JSON.stringify(allowed_filters) });
    } 
  };

  async get_course_by_id(req, res) {
    const id = req.params.id;
    Course.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Course with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Course with id=" + id });
      });
  };

  async update (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    Course.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Course with id=${id}. Maybe Course was not found!`
        });
      } else res.send({ message: "Course was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Course with id=" + id
      });
    });
  };

  async delete (req, res) {
    const id = req.params.id;
  
    Course.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Course with id=${id}. Maybe Course was not found!`
          });
        } else {
          res.send({
            message: "Course was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Course with id=" + id
        });
      });
  };

  async deleteAll(req, res) {
    Course.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Courses were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all courses."
        });
      });
  };
  

  // Retrieve all Courses from the database.
  async get_courses (req, res) {
    const title = req.body.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Course.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving courses."
        });
      });
  };


  // Delete all Courses from the database.
  async deleteAll (req, res) {
    Course.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Courses were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all courses."
        });
      });
  };

}

module.exports = new CourseController(); 
return;
