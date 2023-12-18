module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      student_name: String,
      course_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Couse'},
      enrollment_date: Date
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Enrollment = mongoose.model("enrollment", schema);
  return Enrollment;
};
