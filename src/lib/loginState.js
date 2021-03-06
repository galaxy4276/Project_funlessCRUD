export const isLoggedIn = (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  } else {
    next();
  }
};

export const isNotLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  };
};
