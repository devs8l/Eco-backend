import express from 'express';
import {
  getReels,
  uploadReel,
  deleteReel,
} from '../controllers/reelController.js';
import upload from '../config/multer.js';

const router = express.Router();

router.route('/')
  .get(getReels)
  .post(upload.single('video'), uploadReel);

router.route('/:id')
  .delete(deleteReel);

export default router;