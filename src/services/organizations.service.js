import axios from './axios.config';


const getLocations = async () => {
    const organizationsResponse = await axios.get(`/organizations/all`);
    if (organizationsResponse.data.length !== 0) {
        const response = await axios.get(`/organizations/${organizationsResponse.data[0].id}/locations/all`);
        return response.data;
    }
    return [];
};

const createLocation = async ({ title, description }) => {
    const organizationsResponse = await axios.get(`/organizations/all`);
    const response = await axios.post(`/organizations/${organizationsResponse.data[0].id}/locations/create`, {
        name: title,
        description
    });
    return response.data;
}

export { getLocations, createLocation };