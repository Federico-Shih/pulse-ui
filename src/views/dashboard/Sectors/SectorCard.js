import PropTypes from "prop-types";
import { CardContent, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const SectorCard = ({ sector }) => {
    const navigate = useNavigate();

    return (
        <Card sx={{ cursor: "pointer", height: "100%" }}  onClick={() => {
            navigate(`sectors/${sector.id}`)
        }}>
            <CardContent>
                <Typography variant="h3">
                    {sector.name}
                </Typography>
                <Typography variant="subtitle2">
                    {sector.description}
                </Typography>
            </CardContent>
        </Card>
    )
};

SectorCard.propTypes = {
    sectorId: PropTypes.string,
};

export default SectorCard;