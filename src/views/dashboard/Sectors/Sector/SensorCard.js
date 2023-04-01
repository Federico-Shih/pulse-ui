import PropTypes from "prop-types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import useSensor, { Status } from "./useSensor";
import { useEffect } from "react";
import { useNavigate } from "react-router";


const Sensor = ({ sensorId }) => {
    const navigate = useNavigate();
    const store = useSensor();
    useEffect(() => {
        store.fetch(sensorId);
    }, []);

    const ShowState = ({ status, children }) => {
        switch (status) {
            case Status.LOADING:
                return (
                    <CircularProgress />
                )
            case Status.FAILED:
                return (
                    "FALLE :("
                );
            default:
                return children;
        }
    }
    
    return (
        <Card variant="outlined" sx={{ width: "12em", cursor: "pointer" }} onClick={() => {
            navigate(`sensors/${sensorId}`);
        }}>
            <CardContent>
                {
                    <ShowState 
                        status={store.status}
                    >
                        <Typography variant="h5" component="div">
                            {store.title}
                        </Typography>
                        <Typography variant="subtitle2">
                            {store.description}
                        </Typography>
                        <Typography>
                            Id: {sensorId}
                        </Typography>
                    </ShowState>
                }
            </CardContent>
        </Card>
    );
};

Sensor.propTypes = {
    sensorId: PropTypes.string,
};
export default Sensor;