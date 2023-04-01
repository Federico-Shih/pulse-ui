import PropTypes from 'prop-types';
import useSector from './useDetailedSector';
import { useEffect } from 'react';
import { Status } from './useSensor';
import SensorCard from './SensorCard';
import { useParams } from 'react-router';
import { Stack, Typography } from '@mui/material';
import CreateModal from 'ui-component/models/CreateModal';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

const Sector = () => {
    const params = useParams();
    const sectorId = params.sectorId;
    const { status, sensorList, fetch, title, description, open, closeModal, openModal } = useSector();
    useEffect(() => {
        fetch(sectorId);
    }, []);

    return (
        <>
            {
                status === Status.SUCCESS && (
                    <Stack>
                        <Stack direction={"row"} alignItems={"center"}>
                            <Typography variant="h3">
                                {title}
                            </Typography>
                            <IconButton onClick={openModal} sx={{ width: 50 }}>
                                <AddIcon/>
                            </IconButton>
                        </Stack>
                        <Typography variant="subtitle2">
                            {description}
                        </Typography>
                        {
                            sensorList.map((sensorId) => (
                                <SensorCard key={sensorId} sensorId={sensorId} />
                            ))
                        }
                    </Stack>
                )
            }
            <CreateModal open={open} handleClose={closeModal} type="Sensor" />
        </>
    );
};

Sector.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    sectorId: PropTypes.string
};

export default Sector;