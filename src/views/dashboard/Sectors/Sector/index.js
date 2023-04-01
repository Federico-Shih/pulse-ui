import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

const Sector = ({ title, description, sectorId }) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{description}</Typography>

            </AccordionDetails>
        </Accordion>
    );
};

Sector.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    sectorId: PropTypes.string
};

export default Sector;