import PropTypes from "prop-types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import useSensor, { Status } from "./useSensor";



const Sensor = ({ sensorId }) => {
    const store = useSensor();
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
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="div">
                    Sensor {sensorId}
                </Typography>
                {
                    <ShowState 

                        
                    />
                }
            </CardContent>
        </Card>
    );
};

Sensor.propTypes = {
    sensorId: PropTypes.string,
};
export default Sensor;