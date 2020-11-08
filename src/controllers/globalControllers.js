import sequelize from '../models';
const { Post, User, Image } = sequelize;


export const homeLoading = async (req, res) => {
  const articleList = await Post.findAll({
    include: [{
      model: User,
      attributes: ['userid']
    }, {
      model: Image,
      attributes: ['src'],
      limit: 1,
    }],
  });
  console.log(articleList);

  console.log('Cookies: ', JSON.stringify(req.cookies, null, 2));
  console.log('Signed Cookies: ', JSON.stringify(req.signedCookies, null, 2));
  return res.render('layouts/main', { user: req.user, articleList });
}