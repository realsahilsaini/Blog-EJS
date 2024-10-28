const express = require('express');
const blogRouter = express.Router();
const multer = require('multer');
const path = require('path');
const BlogModel = require('../models/blog');
const CommentModel = require('../models/comment');
const { log } = require('console');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, `../public/uploads/`))
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}` 
    
    cb(null, fileName)
  }
})

const upload = multer({ storage: storage })



blogRouter.get('/add-new', (req, res) => {
  res.render('addBlog', {
    user: req.user

    // Here we are geeting the user object from the request object of checkForAuthenticationCookie middleware
  });
});


blogRouter.post('/', upload.single('coverImage'), async (req, res)=>{

  const {title, body} = req.body;

  console.log(req.user.id);

  const blog = await BlogModel.create({
    title,
    body,
    coverImageURL: `/uploads/${req.file.filename}`,
    createdBy: req.user.id,
  });

  await blog.save();


  return res.redirect(`/blog/${blog._id}`);
})


blogRouter.get('/:id', async (req, res)=>{

  const blog = await BlogModel.findById(req.params.id).populate('createdBy');

  const comments = await CommentModel.find({blogId: req.params.id}).populate('createdBy');

  res.render('blog', {
    blog,
    comments,
    user: req.user
  })

})



blogRouter.post('/comment/:blogId', async (req, res)=>{

  console.log(req.body);

  const blog = await CommentModel.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user.id
  })


  return res.redirect(`/blog/${req.params.blogId}`)

})




module.exports = blogRouter;