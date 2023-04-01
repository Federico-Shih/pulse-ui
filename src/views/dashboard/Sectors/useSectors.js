import { create } from "zustand";
import { Status } from "./Sector/useSensor";
import { createSector, getSectors } from "services/locations.service";

const useSectors = create((set) => ({
    title: "",
    description: "",
    sectorList: [],
    status: Status.LOADING,
    open: false,
    fetch: async (locationId) => {
        try { 
            const sectors = await getSectors(locationId);
            set({ sectorList: sectors, status: Status.SUCCESS });
        } catch (err) {
            set({ status: Status.FAILED });
        }
    },
    create: async (locationId, sectorDTO) => {
        try {
            const newSector = await createSector(locationId, sectorDTO);
            set(({ sectorList: prevList }) => ({ sectorList: [...prevList, newSector], status: Status.SUCCESS }));
        } catch (err) {
            set({ status: Status.FAILED });
        }
    },
    closeModal: () => {
        set({ open: false });
    },
    openModal: () => {
        set({ open:  true });
    }
}));

export default useSectors;