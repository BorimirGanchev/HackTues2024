import express, { Request, Response } from 'express'; //? gives error but code compiles so its probably from vscode
import { db } from './db/db';
const app = express();
const PORT = 6000;

app.use(express.json());

app.post('/workouts/new/', async (req, res) => {
  //* this route is reserved for the ml service server
  const { newWorkout, username, startTime, endTime } = req.body;

  await db.createWorkout(username, startTime, endTime, newWorkout);
  return res.status(200).json('success');
});

app.get('/workouts/all/:username', async (req: Request, res: Response) => {
  const { username } = req.params;
  const workouts = await db.getAllWorkouts(username);
  return res.status(200).json(workouts);
});

app.get('/workouts/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { username } = req.params;
  const workout = await db.getWorkout(username, id);
  if (workout) {
    res.json(workout);
  } else {
    res.status(404).json({ error: 'Workout not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
