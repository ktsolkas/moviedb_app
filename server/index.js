import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path, { dirname } from 'path';
import cluster from 'cluster';
import os from 'os';
import { fileURLToPath } from 'url';

import watchlistRoutes from './routes/watchlist.js';
import userRoutes from './routes/user.js';
import reviewRoutes from './routes/review.js';

const numCPUs = os.cpus().length;
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 10000;

if (!isDev && cluster.isPrimary) {
  console.error(`Node cluster master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  app.use(express.static(path.resolve(__dirname, '../client/build')));

  app.use(express.json({ limit: '30mb', extended: true }));
  app.use(express.urlencoded({ limit: '30mb', extended: true }));

  app.use(cors());
  app.use('/watchlist', watchlistRoutes);
  app.use('/user', userRoutes);
  app.use('/review', reviewRoutes);

  const CONNECTION_URL = process.env.MONGODB;

  mongoose
    .connect(CONNECTION_URL)
    .then(() =>
      app.listen(PORT, () => console.log(`Server running on ${PORT}`))
    )
    .catch((error) => console.log(error.message));

  app.get('/', (req, res) => {
    res.cookie('cookieName', 'cookieValue', { sameSite: 'none', secure: true });
    res.send('APP IS RUNNING.');
  });

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}
