const db = require("../models");
const Course = db.course;

class enrollmentService {
    async enroll_student (enrollment) {
        // Save Enrollment in the database
        let r = {};
        try {

            let is_valid_course = await this.validate_enrollment(enrollment.course_id);
            if(!is_valid_course) {
            //   res.status(401).send({ message: "Invalid Course ID" });
              r.status = 401; r.message = "Invalid Course ID";
              return;
            }

            enrollment.save(enrollment).then(data => {});
            r.status = 200; r.message = "Course Creation Successful";
        } catch(e) {
            r.status = 500; r.message = err.message || "Some error occurred while creating the Course.";
        };
        return r;
    }

    validate_enrollment(id) {
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
}

module.exports = new enrollmentService();