const db = require("../models");
const enrollmentService = require("../services/enrollment.service");

const Enrollment = db.enrollment;
const Course = db.course;

class enrollmentController {

  async enroll_student (req, res) {
    // Validate request
    if (!req.body.student_name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a Enrollment
    const enrollment = new Enrollment({
      student_name: req.body.student_name,
      course_id: req.body.course_id,
      enrollment_date: req.body.enrollment_date
    });
    let r = await enrollmentService.enroll_student(enrollment);
    res.status(r.status).send({message: r.message});
  };

  // Retrieve all Tutorials from the database.
  async findAll(req, res) {
    const title = req.body.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Enrollment.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

  // Find a single Enrollment with an id
  async findOne(req, res) {
    const id = req.params.id;

    Enrollment.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Enrollment with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Enrollment with id=" + id });
      });
  };

  // Update a Enrollment by the id in the request
  async update(req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }

    const id = req.params.id;

    Enrollment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Enrollment with id=${id}. Maybe Enrollment was not found!`
          });
        } else res.send({ message: "Enrollment was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Enrollment with id=" + id
        });
      });
  };

  // Delete a Enrollment with the specified id in the request
  async delete(req, res) {
    const id = req.params.id;

    Enrollment.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Enrollment with id=${id}. Maybe Enrollment was not found!`
          });
        } else {
          res.send({
            message: "Enrollment was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Enrollment with id=" + id
        });
      });
  };

  // Delete all Tutorials from the database.
  async deleteAll(req, res) {
    Enrollment.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Tutorials were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

  // Find all published Tutorials
  async findAllPublished(req, res) {
    Enrollment.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
}

module.exports = new enrollmentController(); 




