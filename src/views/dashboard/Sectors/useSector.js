import { create } from "zustand";
import { Status } from "./Sector/useSensor";

const useSector = create((set) => ({
    title: "",
    description: "",
    status: Status.LOADING,
    fetch: async (sectorId) => {
        set({
            title: "Sector 12345",
            description: "AAAAAAAAA",
            status: Status.SUCCESS
        });
    }
}));

export default useSector;