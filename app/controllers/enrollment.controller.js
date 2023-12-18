const db = require("../models");
const Enrollment = db.enrollment;
const Course = db.course;

// Create and Save a new Enrollment
exports.enroll_student = async (req, res) => {
  // Validate request
  if (!req.body.student_name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  let is_valid_course = await validate_enrollment(req.body.course_id);
  if(!is_valid_course) {
    res.status(401).send({ message: "Invalid Course ID" });
    return;
  }
  // Create a Enrollment
  const enrollment = new Enrollment({
    student_name: req.body.student_name,
    course_id: req.body.course_id,
    enrollment_date: req.body.enrollment_date
  });

  // Save Enrollment in the database
  enrollment
    .save(enrollment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Enrollment."
      });
    });
};

function validate_enrollment(id) {
  return new Promise(async function(resolve, reject) {
  Course.find({course_id: id})
    .then(data => {
      if (!data) {
        resolve(false);
      }
      else { resolve(true);}
    })
    .catch(err => {
      resolve(false);
  });
});
};
  
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
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
exports.findOne = (req, res) => {
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
exports.update = (req, res) => {
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
exports.delete = (req, res) => {
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
exports.deleteAll = (req, res) => {
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
exports.findAllPublished = (req, res) => {
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
