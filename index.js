import express from 'express';
import morgan from 'morgan';
import winston from 'winston';

const app = express();
const port = 3000;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));

  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Routes

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/', (req, res) => res.send('POST request!'));
app.put('/', (req, res) => res.send('PUT request!'));
app.delete('/', (req, res) => res.send('DELETE request!'));

app.all('/all', (req, res) => res.send('All Routes'));

// Start server

app.listen(port, () => logger.log('info', `Started on port ${port}!`));
