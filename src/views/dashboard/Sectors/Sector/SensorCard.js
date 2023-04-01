import PropTypes from "prop-types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import useSensor, { Status } from "./useSensor";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { CardActions, IconButton } from "@mui/material";


const SensorCard = ({ sensor }) => {
    const navigate = useNavigate();
    return (
        <Card variant="outlined" sx={{ width: "12em", cursor: "pointer" }} onClick={() => {
            navigate(`sensors/${sensor.id}`);
        }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {sensor.name}
                </Typography>
                <Typography variant="subtitle2">
                    {sensor.description}
                </Typography>
                <Typography>
                    Id: {sensor.id}
                </Typography>
            </CardContent>

        </Card>
    );
};

SensorCard.propTypes = {
    sensorId: PropTypes.string,
};
export default SensorCard;