import { HeartbeatType } from "../../../services/heartbeat.service";
export const mapperMeasure = {
    [HeartbeatType.Electricity]: "kWh",
    [HeartbeatType.Naturalgas]: "m3",
    [HeartbeatType.Water]: "lts",
}