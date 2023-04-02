import { AggregationScope, getHeartbeatAggregations } from "services/heartbeat.service";
import { getLocations, getOrganization } from "services/organizations.service";
import { create } from "zustand";
import { Status } from "../Sectors/Sector/useSensor";
import { getSectors } from "services/locations.service";

/*
    {
        timestamp,
        value
    }
*/

function getStartAndEnd() {
    const currentDate = new Date();
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const previousStartOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    return [previousStartOfMonth, endOfMonth];
}

export const useOrganizationStore = create((set) => ({
    organization: null,
    fetch: async () => {
        const organization = await getOrganization();
        set({ organization });
    }
}));

export const usePercentageConsumptionStore = create((set) => ({
    percentageConsumption: 0,
    status: Status.LOADING,
    fetch: async (organizationId, type) => {
        set({ status: Status.LOADING });
        const startAndEnd = getStartAndEnd();
        const heartResponse = await getHeartbeatAggregations({
            id: organizationId,
            scope: AggregationScope.Organization,
            type,
            startTime: startAndEnd[0].getTime(),
            endTime: startAndEnd[1].getTime(),
            interval: 60*60*24*30 //month
        });
        const currentValue = heartResponse[1].value;
        const prevValue = heartResponse[0].value;
        set({ percentageConsumption: (currentValue - prevValue)/prevValue, status: Status.SUCCESS })
    }
}));

export const useTotalConsumptionStore = create((set) => ({
    totalConsumption: 0,
    status: Status.LOADING,
    fetch: async (organizationId, type) => {
        set({ status:  Status.LOADING });
        const heartResponse = await getHeartbeatAggregations({ 
            id: organizationId, 
            scope: AggregationScope.Organization, 
            type,  
            startTime: 0,
            endTime: new Date().getTime(),
            interval: 10000000000
        });
        set({ totalConsumption: heartResponse[0].value, status: Status.SUCCESS });
    }
}));

export const useFilters = create((set) => ({
    locations: [],
    sectors: [],
    selectedLocation: '',
    selectedSector: '',
    statusLocation: Status.LOADING,
    statusSection: Status.LOADING,
    setLocation: async (locationId) => {
        set({ selectedLocation: locationId, statusSection: Status.LOADING, selectedSector: '' });
        const sectors = await getSectors(locationId);
        set({ sectors: sectors, statusSection: Status.LOADING });
    },
    fetch: async () => {
        set({ statusLocation: Status.LOADING });
        const locations = await getLocations();
        set({ locations, status: Status.SUCCESS });
    },
    setSector: (sectorId) => set({ selectedSector: sectorId }),
}));

export const useMonthConsume = create((set) => ({
    values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    status: Status.LOADING,
    fetch: async (type, organizationId, locationId, sectorId) => {
        set({ status: Status.LOADING });
        const today = new Date();
        const year = today.getFullYear();
        const firstDayOfYear = new Date(year, 0, 1);
        const lastDayOfYear = new Date(year, 11, 31);
        
        let scope = AggregationScope.Sector;
        let id = sectorId;
        if (id.length === 0) {
            id = locationId;
            scope = AggregationScope.Location;
        }
        if (id.length === 0) {
            id = organizationId;
            scope = AggregationScope.Organization;
        }

        const heartResponse = await getHeartbeatAggregations({ 
            id, 
            scope, 
            type,  
            startTime: firstDayOfYear.getTime() + 1,
            endTime: lastDayOfYear.getTime(),
            interval: 60 * 60 * 24 * 30
        });
        set(({ values }) => {
            heartResponse.filter(({ timestamp }) => (new Date(timestamp * 1000).getFullYear() === new Date().getFullYear())).forEach(({ value, timestamp }) => {
                values[new Date(timestamp * 1000).getMonth()] = value;
            });
            return { values, status: Status.SUCCESS };
        }); 
    }
}));

export const useRealTime = create((set) => ({
    values: [],
    status: Status.LOADING,
    fetch: async ({ type, organizationId, locationId, sectorId }) => {
        let scope = AggregationScope.Sector;
        let id = sectorId;
        if (id.length === 0) {
            id = locationId;
            scope = AggregationScope.Location;
        }
        if (id.length === 0) {
            id = organizationId;
            scope = AggregationScope.Organization;
        }
        const now = new Date();
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);        
        const heartResponse = await getHeartbeatAggregations({ 
            id, 
            scope, 
            type,  
            startTime: yesterday.getTime(),
            endTime: now.getTime(),
            interval: 60 * 60
        });
        set({ values: heartResponse.map(({ value }) => (value)), status: Status.SUCCESS});
    }
}));