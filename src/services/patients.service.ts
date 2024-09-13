import axios from 'axios';
import { api } from './api.service';

interface SaveProps {
  name: string;
  email: string;
  address: string;
  dateOfBirth: string;
  phoneNumber: string;
}

interface UpdateProps {
  id: string;
  name: string;
  email: string;
  address: string;
  dateOfBirth: string;
  phoneNumber: string;
}

const getPatients = async () => {
  const response = await api.get('/patients');
  return response.data;
};

const save = async (payload: SaveProps) => {
  const response = await api.post('/patients', payload);
  return response.data;
};

const update = async (payload: UpdateProps) => {
  const response = await api.put('/patients/', payload);
  return response.data;
};

const remove = async (id: string) => {
  const response = await api.delete(`/patients`, {
    data: {
      id,
    },
  });

  return response.data;
};

export const PatientsApi = {
  getPatients,
  save,
  update,
  remove,
};
