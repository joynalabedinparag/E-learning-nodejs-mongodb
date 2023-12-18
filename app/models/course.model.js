module.exports = mongoose => {
  require('mongoose-double')(mongoose);
  var SchemaTypes = mongoose.Schema.Types;

  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      instructor: String, 
      duration: String,
      price: {type: SchemaTypes.Double}
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Course = mongoose.model("course", schema);
  return Course;
};
