import logging from '../../src/config/logging';
import * as admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

const extractFirebaseInfo = (req: Request, res: Response, next: NextFunction) => {
  logging.info('Validating firebase token ...');

  let token = req.headers.authorization?.split(' ')[1];

  if (token) {
    admin
      .auth()
      .verifyIdToken(token)
      .then((result) => {
        if (result) {
          res.locals.firebase = result;
          res.locals.fire_token = token;
          next();
        } else {
          logging.warn('invalid token');

          res.status(401).json({
            message: 'inner else statement'
          });
        }
      })
      .catch((error) => {
        logging.error(error);

        return res.status(501).json({
          error,
          message: 'catch block'
        });
      });
  } else {
    res.status(401).json({
      message: 'outer else statement',
      token: 'token'
    });
  }
};

export default extractFirebaseInfo;
