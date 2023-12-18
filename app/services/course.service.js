const db = require("../models");
const Course = db.course;

class courseService {
    async create_course(req) {
        let r = {};
        const course = new Course({
            title: req.body.title,
            description: req.body.description,
            instructor: req.body.instructor,
            duration: req.body.duration,
            price: req.body.price,
        });
        try {
            course.save(course)
                .then(data => {});
                r.status = 200; r.message = "Course Creation Successful";
        } catch(e) {
            r.status = 500; r.message = err.message || "Some error occurred while creating the Course.";
        };
        return r;
    }

    async get_course(condition) {
        let r = {};
        try {
            let data = await Course.find(condition);
            r.status = 200;
            r.data = data;
        } catch(e) {
            r.status = 500;
            r.data = null;
        }
        return r;
    }

    async filter_courses(query) {
        let r = {};
        try {
            let data = await Course.find(query)
            r.status = 200;
            r.data = data;
        } catch(e) {
            r.status = 500;
            r.data = e.message || "Some error occurred while retrieving courses."
        }
        return r;
    }
}

module.exports = new courseService();