import PropTypes from "prop-types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router";
import { Box, Stack } from "@mui/system";


const SensorCard = ({ sensor }) => {
    const navigate = useNavigate();
    return (
        <Card variant="outlined" sx={{ width: "18em", cursor: "pointer", height: "100%" }} onClick={() => {
            navigate(`sensors/${sensor.id}`);
        }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {sensor.name}
                </Typography>
                <Typography variant="subtitle2">
                    {sensor.description}
                </Typography>
                <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                    <Typography sx={{ marginTop: "auto" }}>
                        Id: {sensor.id}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

SensorCard.propTypes = {
    sensorId: PropTypes.string,
};
export default SensorCard;