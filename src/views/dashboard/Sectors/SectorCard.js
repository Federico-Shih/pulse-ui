import PropTypes from "prop-types";
import { CardContent, Card, Typography } from "@mui/material";
import useSector from "./useSector";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const SectorCard = ({ sectorId }) => {
    const store = useSector();
    const navigate = useNavigate();
    useEffect(() => {
        store.fetch();
    }, []);
    return (
        <Card sx={{ cursor: "pointer" }}  onClick={() => {
            navigate(`sectors/${sectorId}`)
        }}>
            <CardContent>
                <Typography variant="h3">
                    {store.title}
                </Typography>
                <Typography variant="subtitle2">
                    {store.description}
                </Typography>
            </CardContent>
        </Card>
    )
};

SectorCard.propTypes = {
    sectorId: PropTypes.string,
};

export default SectorCard;