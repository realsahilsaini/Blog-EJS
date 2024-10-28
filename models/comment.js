const {Schema} = require('mongoose');
const Model = require('mongoose').model;


const commentSchema = new Schema({
  content: {type: String, required: true},
  blogId: {type: Schema.Types.ObjectId, ref: 'blog', required: true},
  createdBy: {type: Schema.Types.ObjectId, ref: 'user', required: true},

}, {timestamps: true});

const CommentModel =new Model('comments', commentSchema);

module.exports = CommentModel;
