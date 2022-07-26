import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import User from '../models/user';
import mongoose from 'mongoose';

const validate = async (req: Request, res: Response, next: NextFunction) => {
  logging.info('Token validated, ensuring user.');

  let firebase = res.locals.firebase;

  return User.findById({ uid: firebase.uid })
    .then((user) => {
      if (user) {
        return res.status(200).json({ user });
      } else {
        return res.status(401).json({
          message: 'Token(s) invalid, user not found'
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  logging.info('Attempting to register user ...');

  let { uid, name } = req.body;
  let fire_token = res.locals.fire_token;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    uid,
    name
  });

  return user
    .save()
    .then((newUser) => {
      logging.info(user._id);
      logging.info(`New user ${uid} created`);

      return res.status(200).json({ user: newUser, fire_token });
    })
    .catch((error) => {
      logging.error(error.message);
      logging.error(user._id);
      return res.status(500).json({
        message: error.message
      });
    });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  logging.info('Verifying user');

  let { uid } = req.body;
  let fire_token = res.locals.fire_token;

  return User.findOne({ uid })
    .then((user) => {
      if (user) {
        logging.info(`User ${uid} found, attempting to sign token and return user ...`);
        return res.status(200).json({ user, fire_token });
      } else {
        logging.warn(`User ${uid} not in the DB, attempting to register ...`);
        return create(req, res, next);
      }
    })
    .catch((error) => {
      logging.error(error.message);
      return res.status(500).json({
        message: error.message
      });
    });
};

const read = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.userID;
  logging.info(`Incoming read for user with id ${_id}`);
  logging.info(_id);
  User.findById(_id)
    .exec()
    .then((user) => {
      if (user) {
        return res.status(200).json({
          user: user
        });
      } else {
        return res.status(404).json({
          error: 'User not found.'
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
  logging.info('readAll route called');
  logging.info(req.params.uid);
  User.find()
    .exec()
    .then((users) => {
      return res.status(200).json({
        count: users.length,
        users: users
      });
    })
    .catch((error) => {
      logging.error(error.message);

      return res.status(500).json({
        message: error.message
      });
    });
};

export default {
  validate,
  create,
  login,
  read,
  readAll
};
