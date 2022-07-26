import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import Poem from '../models/poem';
import mongoose from 'mongoose';

const create = async (req: Request, res: Response, next: NextFunction) => {
  logging.info('attempt to create a poem...');

  let { title, creator, content, contentPostErasure } = req.body;

  const poem = new Poem({
    _id: new mongoose.Types.ObjectId(),
    title,
    creator,
    content,
    contentPostErasure
  });

  try {
    const newPoem = await poem.save();
    logging.info('New Poem created...');
    return res.status(200).json({ poem: newPoem });
  } catch (error: any) {
    logging.error(error.message);
    return res.status(500).json({
      message: error.message
    });
  }
};

const read = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.poemID;
  logging.info(`Read initiated for poem with id ${_id}`);

  Poem.findById(_id)
    .populate('creator')
    .exec()
    .then((poem) => {
      if (poem) {
        return res.status(200).json({
          poem: poem
        });
      } else {
        return res.status(404).json({
          error: 'poem not found'
        });
      }
    })
    .catch((error) => {
      logging.error(error.message);

      return res.status(500).json({
        error: error.message
      });
    });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  logging.info(`ReadAll route called`);

  Poem.find()
    .populate('creator')
    .exec()
    .then((poems) => {
      if (poems) {
        return res.status(200).json({
          count: poems.length,
          poems: poems
        });
      } else {
        return res.status(404).json({
          error: 'poems not found'
        });
      }
    })
    .catch((error) => {
      logging.error(error.message);

      return res.status(500).json({
        error: error.message
      });
    });
};

const query = (req: Request, res: Response, next: NextFunction) => {
  logging.info(`query time...`);

  Poem.find(req.body)
    .populate('creator')
    .exec()
    .then((poems) => {
      if (poems) {
        return res.status(200).json({
          poems: poems
        });
      } else {
        return res.status(404).json({
          error: 'poems not found'
        });
      }
    })
    .catch((error) => {
      logging.error(error.message);

      return res.status(500).json({
        error: error.message
      });
    });
};

const deletePoem = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.poemID;

  logging.warn(`Incoming delete for blog with id ${_id}`);

  Poem.findByIdAndDelete(_id)
    .exec()
    .then((poem) => {
      return res.status(201).json({ message: 'Blog Deleted Successfully ...' });
    })
    .catch((error) => {
      logging.error(error.message);

      return res.status(500).json({
        error: error.message
      });
    });
};

export default {
  create,
  readAll,
  read,
  query,
  deletePoem
};
