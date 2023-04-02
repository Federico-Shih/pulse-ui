import { AggregationScope, HeartbeatType, getHeartbeatAggregations } from "services/heartbeat.service";

const { create } = require("zustand");
const { Status } = require("../Sectors/Sector/useSensor");
const { getLocations } = require("services/organizations.service");
const { getSectors } = require("services/locations.service");



export const useReports = create((set) => ({
    breakdown: {

    },
    locationMap: {},
    sectorMap: {},
    status: Status.LOADING,
    fetch: async () => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const locations = await getLocations();
        const locationMap = {};
        const sectorMap = {};
        locations.forEach((location) => {
            locationMap[location.id] = location;
        });

        const sector = await Promise.all(locations.map(({ id }) => (getSectors(id))));
        const promises = [];
        const routes = [];
        sector.forEach((locationArr, index) => {
            locationArr.forEach((sector) => {
              Object.values(HeartbeatType).forEach((type) => {
                promises.push(getHeartbeatAggregations({
                    id: sector.id,
                    scope: AggregationScope.Sector,
                    type,
                    startTime: startOfMonth.getTime(),
                    endTime: endOfMonth.getTime(),
                    interval: 60 * 60 * 24 * 30
                }))
                sectorMap[sector.id] = sector;
                routes.push({ sectorId: sector.id, locationId: locations[index].id, type });
              })
            })
        });
        const values = await Promise.all(promises);
        const newBreakdown = {};
        routes.forEach(({ sectorId, locationId, type }, index) => {
            if (values[index].length !== 0) {
                if (!newBreakdown[type]) {
                    newBreakdown[type] = {};
                }
                if (!newBreakdown[type][locationId]) {
                    newBreakdown[type][locationId] = {};
                }
                newBreakdown[type][locationId][sectorId] = values[index][0].value;
            }
        });
        set({ breakdown: newBreakdown, status: Status.SUCCESS, sectorMap, locationMap });
    }
}));

