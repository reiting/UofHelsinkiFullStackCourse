import { calculateBmi } from './bmiCalculator';
import express from 'express';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;
  const validParameters: boolean =
    !isNaN(Number(height)) && !isNaN(Number(weight));
  const bmi = calculateBmi(Number(height), Number(weight));

  if (!validParameters || !weight || !height) {
    res.send({
      error: 'malformatted parameters',
    });
  }
  res.send({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  const { body } = req;
  const { dailyExercises } = body;
  let { target } = body;

  if (!target || !dailyExercises) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(dailyExercises)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const hasNaNInDailyHours = dailyExercises.some((hours) => isNaN(hours));
  target = Number(target);

  if (isNaN(target) || hasNaNInDailyHours) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  return res.json(calculateExercises(dailyExercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

