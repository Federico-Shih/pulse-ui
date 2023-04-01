const { create } = require("zustand");
const { Status } = require("./useSensor");

const useSector = create((set) => ({
    title: "",
    description: "",
    status: Status.LOADING,
    sensorList: [],
    open: false,
    fetch: async (sectorId) => {
        set({
            title: "Sector 12345",
            description: "AAAAAAAAA",
            sensorList: ["holaaaa"],
            status: Status.SUCCESS
        });
    },
    openModal: () => {
        set({ open: true });
    },
    closeModal: () => {
        set({ open: false });
    }
}));

export default useSector;