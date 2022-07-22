import http from 'http';
import express from 'express';
import logging from './config/logging';
import config from './config/config';

const router = express();

const httpServer = http.createServer(router);
