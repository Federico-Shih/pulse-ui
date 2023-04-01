import { useParams } from "react-router";
import useDetailedSensor from "./useSensorDetailed";
import { Stack, Typography } from "@mui/material";
const Sensor = () => {
    const params = useParams();
    const sensorId = params.sensorId;
    const store = useDetailedSensor();
    return (
        <Stack direction="column">
            <Typography variant="h3">
                {store.title}
            </Typography>
            <Typography variant="subtitle2">
                {store.description}
            </Typography>
            <Typography>
                id: {sensorId}
            </Typography>
        </Stack>
    );
}

export default Sensor;