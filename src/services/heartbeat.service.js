import axios from './axios.config';

export const AggregationScope = {
    Organization: 'organization',
    Location: 'location',
    Sector: 'sector',
    Sensor: 'sensor',
}

export const HeartbeatType = {
    Naturalgas: 'naturalGas',
    Electricity: 'electricity',
    Water: 'water'
};

export const getHeartbeatAggregations = async ({ id, scope, type, startTime, endTime, interval }) => {
    const heartbeatResponse = await axios.post('/heartbeats/aggregate', { id, scope, type, startTime, endTime, interval});
    return heartbeatResponse.data;
}