const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.course = require("./course.model.js")(mongoose);
db.enrollment = require("./enrollment.model.js")(mongoose);


module.exports = db;
