import { createSensor, getSensors, removeSensor } from "services/sectors.service";

const { create } = require("zustand");
const { Status, PostStatus } = require("./useSensor");

const useSector = create((set) => ({
    status: Status.LOADING,
    postStatus: PostStatus.PENDING,
    sensorList: [],
    open: false,
    fetch: async (sectorId) => {
        try {
            const sensors = await getSensors(sectorId);
            set({ sensorList: sensors, status: Status.SUCCESS });
        } catch (err) {
            set({ status: Status.FAILED });
        }
    },
    create: async (sectorId, sensorDTO) => {
        try {
            set({ postStatus: PostStatus.LOADING });
            const newSensor = await createSensor(sectorId, sensorDTO);
            set(({ sensorList: prevList }) => ({ sensorList: [...prevList, newSensor], postStatus: PostStatus.SUCCESS }));
        } catch (err) {
            set({ postStatus: PostStatus.FAILED });
        }
    },
    remove: async (sectorId, sensorId) => {
        try {
            set({ postStatus: PostStatus.LOADING });
            await removeSensor(sectorId, sensorId);
            set(({ sensorList: prev }) => ({ postStatus: PostStatus.SUCCESS, sensorList: prev.filter(({ id }) => (id !== sensorId))}))
        } catch (err) {
            set({ postStatus: PostStatus.FAILED });
        }
    },
    openModal: () => {
        set({ open: true });
    },
    closeModal: () => {
        set({ open: false });
    }
}));

export default useSector;