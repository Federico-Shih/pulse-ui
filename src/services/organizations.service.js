import axios from './axios.config';

const ORGANIZATION_ID = process.env.REACT_APP_ORGANIZATIONID;

const getLocations = async () => {
    const response = await axios.get(`/organizations/${ORGANIZATION_ID}/locations/all`);
    return response.data;
};

const createLocation = async ({ title, description }) => {
    const response = await axios.post(`/organizations/${ORGANIZATION_ID}/locations/create`, {
        name: title,
        description
    });
    return response.data;
}

export { getLocations, createLocation };