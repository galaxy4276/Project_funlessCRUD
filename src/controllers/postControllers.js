import sequelize from '../models';

const { Post, Image } = sequelize;


export const getForm = (req, res) => {
  res.render('layouts/postForm', {});
};

export const getPost = async (req, res, next) => {
  const post = await Post.findOne({ where: { id: req.params.id }});
  res.render('layouts/readForm', { post, user: req.user });
};

export const postForm = async (req, res) => {
  const {
    body: { title, contents },
  } = req;
  console.log('req.file');
  console.log(req.file);
  if (title) {
    const post = await Post.create({
      title,
      content: contents,
      UserId: req.user,
    });
    if (req.files) {
      const images = await Promise.all(req.files.map((image) => Image.create({ src: image.filename })));
      await post.addImages(images);
    }
  } else {
    res.redirect('/');
  }

  res.redirect('/');
};

export const removePost = async (req, res, next) => {
  const post = await Post.findOne({ where: { id: req.params.id }});
  await post.destroy();
  
  res.redirect('/');
}