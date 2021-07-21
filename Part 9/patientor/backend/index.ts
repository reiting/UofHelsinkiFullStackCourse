import diagnosesJSON from './data/diagnoses.json';
import patientsData from './data/patients';
import { v1 as uuid } from 'uuid';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

const patients: Array<Patient> = patientsData;

interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

type BirthDate = `${number}-${number}-${number}`;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id">;

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  ssn: unknown;
  occupation: unknown;
};

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Discharge = { date: string; criteria: string };
export type SickLeave = { startDate: string; endDate: string };

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

const parseValidPatient = (object: Fields): Omit<Patient, "id"> => ({
  name: parseName(object.name),
  dateOfBirth: parseDateOfBirth(object.dateOfBirth),
  gender: parseGender(object.gender),
  ssn: parseSSN(object.ssn),
  occupation: parseOccupation(object.occupation),
  entries: []
});

const parseGender = (gender: unknown): Gender => {
  if (gender === "Male") {
    return Gender.Male;
  }

  if (gender === "Female") {
    return Gender.Female;
  }

  throw new Error("Gender can only be Female or Male, it was " + gender);
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const parseDateOfBirth = (dateOfBirth: unknown): BirthDate => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth");
  }

  const splitDateOfBirth = dateOfBirth.split("-");

  if (splitDateOfBirth.length !== 3) {
    throw new Error("Date is in incorrect format");
  }

  const dateInNumbers = splitDateOfBirth.map((e) => parseInt(e));

  if (dateInNumbers.some((e) => isNaN(e))) {
    throw new Error("Date is in incorrect format");
  }

  return `${dateInNumbers[0]}-${dateInNumbers[1]}-${dateInNumbers[2]}` as BirthDate;
};

// const getNonSensitiveEntriesFromPatient = (
//   patients: PublicPatient[]
// ): Omit<PublicPatient, 'ssn'>[] =>
//   patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
//     id,
//     name,
//     dateOfBirth,
//     gender,
//     occupation,
    
//   }));
const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  const diagnoses: Diagnose[] = diagnosesJSON;
  res.send(diagnoses);
});

app.get('/api/patients', (_req, res) => {
  res.send(getPatients());
});

const findPatientById = (id: string): Patient | undefined => {
  let patient = patients.find((p) => p.id === id);

  if (!patient?.entries)
    patient = {
      ...patient,
      entries: [],
    } as Patient;

  return patient;
};

app.get('/api/patients/:id', (req, res) => {
  const patient = findPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

const createPatient = (patient: Omit<Patient, "id">): Patient => {
  const id = uuid();
  const newPatient = { id, ...patient };
  patients.push(newPatient);

  return newPatient;
};

app.post('/api/patients', ({ body }, res) => {
  try {
    const parsedPatient = parseValidPatient(body);
    const createdPatient = createPatient(parsedPatient);
    res.send(createdPatient);
  } catch (error) {
    console.log("error: ", error);
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
