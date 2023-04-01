import { create } from "zustand";
import { Status } from "../useSensor";

const useSensor = create((set) => ({
    average: -1,
    type: "",
    uptime: -1,
    lastUpdated: null,
    status: Status.LOADING,
    title: "Sensor de agua",
    description: "Arriba del sillon",
    fetch: async (sensorId) => {
        set({ average: 10, uptime: 1000, lastUpdated: new Date(), status: Status.SUCCESS });
    },  
}));

export default useSensor;