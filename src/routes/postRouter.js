import { getForm, getPost, postForm, removePost } from '../controllers/postControllers';
import path from 'path';
import { isNotLoggedIn } from '../lib/loginState';
import multer from 'multer';

const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, './src/uploads')
      },
      filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
      }
    })
  });


const postRouter = require('express').Router();


postRouter.get('/form', isNotLoggedIn, getForm);
postRouter.post('/form', upload.array('file'), postForm);
postRouter.delete('/:id', removePost);
postRouter.get('/:id', getPost);



export default postRouter;
