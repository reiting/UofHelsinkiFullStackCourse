import diagnosesJSON from './data/diagnoses.json';
import patientsJSON from './data/patients.json';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  const diagnoses: Diagnose[] = diagnosesJSON;
  res.send(diagnoses);
});

const getNonSensitiveEntriesFromPatient = (
  patients: Patient[]
): Omit<Patient, 'ssn'>[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

app.get('/api/patients', (_req, res) => {
  const patients: Patient[] = patientsJSON;
  res.send(getNonSensitiveEntriesFromPatient(patients));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
