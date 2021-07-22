import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setPatientInfo, useStateValue } from '../state';
import axios from "axios";
import { Icon } from "semantic-ui-react";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

const PatientInfoPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientInfo(patientDetailsFromApi));
      }
      catch (e) {
        console.error(e);
      }
    };

    if (!patient || patient?.id !== id) {
      void fetchPatientDetails();
    }
  }, [patient, id, dispatch]);

  const displayGenderIcon = () => {
    if (patient?.gender === "male") {
      return <Icon name="mars" size="big" />;
    } else if (patient?.gender === "female") {
      return <Icon name="venus" size="big" />;
    } else if (patient?.gender === "other") {
      return <Icon name="genderless" size="big" />;
    } else return null;
  };

  return (
    <div>
      <div>
        <h2>{patient?.name}</h2> {displayGenderIcon()}
      </div>
      <div>
        <span>ssn:</span> <span>{patient?.ssn}</span>
      </div>
      <div>
        <span>occupation:</span> <span>{patient?.occupation}</span>
      </div>
    </div>
  );
};

export default PatientInfoPage;