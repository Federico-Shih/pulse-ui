import PropTypes from 'prop-types';
import useSector from './useDetailedSector';
import { useEffect } from 'react';
import { Status } from './useSensor';
import SensorCard from './SensorCard';
import { useParams } from 'react-router';
import { Grid, Stack, Typography } from '@mui/material';
import CreateModal from 'ui-component/models/CreateModal';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import useSectors from '../useSectors';

const Sector = () => {
    const params = useParams();
    const sectorId = params.sectorId;
    const { sectorList, fetch: fetchSectors } = useSectors();
    const sector = sectorList.find((current) => current.id === sectorId);
    const { status, sensorList, fetch, open, closeModal, openModal, create } = useSector();
    
    useEffect(() => {
        if (sector) {
            fetch(sectorId);
        } else {
            fetchSectors(params.id);
        }
    }, [fetch, fetchSectors, params.id, sector, sectorId]);

    return (
        <>
            {
                status === Status.SUCCESS && (
                    <Stack spacing={2}>
                        <div>
                            <Stack direction={"row"} alignItems={"center"}>
                                <Typography variant="h3">
                                    {sector.name}
                                </Typography>
                                <IconButton onClick={openModal} sx={{ width: 50, marginLeft: 3 }}>
                                    <AddIcon/>
                                </IconButton>
                            </Stack>
                            <Typography variant="subtitle2">
                                {sector.description}
                            </Typography>
                        </div>
                        <Grid container sx={{ width: '100%' }} spacing={1}>
                            {
                                sensorList.map((sensor) => (
                                    <Grid item key={sensor.id} xs={3}>
                                        <SensorCard sensor={sensor} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Stack>
                )
            }
            <CreateModal 
                open={open} 
                handleClose={closeModal} 
                type="Sensor" 
                onSubmit={(sensorDTO) => {
                    create(sectorId, sensorDTO);
                    closeModal();
                    }}
                />
        </>
    );
};

Sector.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    sectorId: PropTypes.string
};

export default Sector;