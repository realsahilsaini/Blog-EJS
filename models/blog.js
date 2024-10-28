const {Schema} = require('mongoose');
const Model = require('mongoose').model;


const blogSchema = new Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  coverImageURL: {type: String, required: false},
  createdBy: {type: Schema.Types.ObjectId, ref: 'user', required: true},
}, {timestamps: true});


const BlogModel =new Model('blogs', blogSchema);

module.exports = BlogModel;
