import { api } from './api.service';

const getPatients = async () => {
  const response = await api.get('v1/patients');
  return response.data;
};

export const PatientsApi = {
  getPatients,
};
