import { useNavigate, useParams } from "react-router";
import useDetailedSector from "../useDetailedSector";
import { Button, Card, CardContent, IconButton, Snackbar, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Delete } from "@mui/icons-material";

const Sensor = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { remove } = useDetailedSector();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const params = useParams();
    const sensorId = params.sensorId;
    const { sensorList, fetch: fetchSensors } = useDetailedSector();
    const sensor = useMemo(() => sensorList.find((sensor) => sensor.id === sensorId), [sensorId, sensorList]);
    useEffect(() => {
        if (!sensor) {
            fetchSensors(params.sectorId);
        }
    }, [fetchSensors, params.sectorId, sensor]);
    return (
        <>
            <Card sx={{ width: "50em" }}>
                <CardContent sx={{ position: "relative" }}>
                    <Typography variant="h3">
                        {sensor?.name}
                    </Typography>
                    <Typography variant="subtitle2">
                        {sensor?.description}
                    </Typography>
                    <Button onClick={() => {
                        setOpen(true);
                        navigator.clipboard.writeText(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/${process.env.REACT_APP_API_VERSION}/sensors/${sensorId}/update`);
                    }}>
                        <Typography sx={{ textTransform: "lowercase" }}>
                            id: {sensorId}
                        </Typography>
                    </Button>
                    <IconButton
                        color="error"
                        onClick={async () => {
                            await remove(params.sectorId, sensorId);
                            navigate(-1);
                        }}
                        sx={{ position: "absolute", top: 3, right: 3 }}
                    >
                        <Delete />
                    </IconButton>
                </CardContent>
            </Card>
            <Snackbar 
                open={open}
                severity={"success"}
                message={`sensor id copied to clipboard!`}
                autoHideDuration={3000}
                onClose={handleClose}
            />
        </>
    );
}

export default Sensor;