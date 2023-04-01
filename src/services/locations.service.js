import axios from './axios.config';
export const getSectors = async (locationId) => {
    const response = await axios.get(`/locations/${locationId}/sectors/all`);
    return response.data;
}

export const createSector = async (locationId, { title, description }) => {
    const response = await axios.post(`/locations/${locationId}/sectors/create`, { name: title, description });
    return response.data;
}