import { create } from "zustand";
import { Status } from "./Sector/useSensor";

const useSectors = create((set) => ({
    title: "",
    description: "",
    sectorList: [],
    status: Status.LOADING,
    open: false,
    fetch: async (locationId) => {
        set({
            title: "Sector 1",
            description: "Esto es un sector no jodas",
            sectorList: ["12345"],
            status: Status.SUCCESS
        });
    },
    closeModal: () => {
        set({ open: false });
    },
    openModal: () => {
        set({ open:  true });
    }
}));

export default useSectors;