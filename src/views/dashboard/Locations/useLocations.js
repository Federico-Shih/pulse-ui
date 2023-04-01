import { create } from "zustand"
import { PostStatus, Status } from "../Sectors/Sector/useSensor"
import { createLocation, getLocations } from "services/organizations.service"

const useLocations = create((set) => ({
    locations: [],
    status: Status.LOADING,
    createStatus: PostStatus.PENDING,
    fetch: async () => {
        try {
            const locations = await getLocations();
            set({ locations, status: Status.SUCCESS });
        } catch (err) {
            set({ status: Status.FAILED });
        }
    },
    create: async (location) => {
        try {
            set({ createStatus: PostStatus.LOADING });
            const newLocation = await createLocation(location);
            set(({ locations }) => ({ locations: [...locations, newLocation]}));
        } catch (err) {
            set({ createStatus: PostStatus.FAILED });
        }
    }
}));

export { useLocations };