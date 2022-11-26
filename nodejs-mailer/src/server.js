import 'dotenv/config';
import express from 'express';
import {setQueues, BullAdapter, router as BullRouter} from 'bull-board';
import UserMailController from './app/controllers/UserMailController';
import Queue from './app/lib/Queue';

const app = express();
setQueues(Queue.queues.map(item => new BullAdapter(item.bull)));

app.use(express.json());
app.post('/users', UserMailController.store);

app.use('/admin/queues', BullRouter);

app.listen(process.env.PORT || 3000);