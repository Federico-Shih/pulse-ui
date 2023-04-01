import axios from './axios.config';

export const getSensors = async (sectorId) => {
    const response = await axios.get(`/sectors/${sectorId}/sensors/all`);
    return response.data;
}

export const createSensor = async (sectorId, { title, description }) => {
    const response = await axios.post(`/sectors/${sectorId}/sensors/create`, { name: title, description });
    return response.data;
}

export const removeSensor = async (sectorId, sensorId) => {
    return axios.delete(`/sectors/${sectorId}/sensors/${sensorId}/delete`);
}