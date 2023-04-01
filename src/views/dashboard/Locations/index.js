import { useEffect, useState } from 'react';

// material-ui
import { Grid, Typography, IconButton, Stack, Card, CardContent, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';

// project imports
import { gridSpacing } from 'store/constant';
import CreateModal from 'ui-component/models/CreateModal.js';
import { Container } from '@mui/system';
import { useNavigate } from 'react-router';
import { useLocations } from './useLocations';
import { Status } from '../Sectors/Sector/useSensor';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const MOCKED_LOCATIONS = [
    {
        title: "Kitchen",
        description: "This is the kitchen",
        id: 13
    },
    {
        title: "Living Room",
        description: "This is the living room",
        id: 14,
    },
    {
        title: "Bedroom",
        description: "This is the bedroom",
        id: 15
    },
]

function LocationCard({ title, description, id }) {
    const theme = useTheme();
    const navigate = useNavigate();

    return ( 
        <Card                 
            sx={{
                borderColor: theme.palette.primary[200] + 25,
                ':hover': {
                    boxShadow: theme.shadows[16]
                },
                width: "25vh",
                height: "20vh",
                cursor: 'pointer',
            }}
            onClick={() => {
                navigate(`${id}`);
            }}
        >
            <CardContent>
                <Typography variant="h4" pb={1}>
                    {title}
                </Typography>
                <Typography >
                    {description}
                </Typography>    
            </CardContent>
        </Card>
    )
}

const Locations = () => {
    const { fetch, status, locations, create } = useLocations();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetch();
    }, [fetch]);

    if (status === Status.FAILED) {
        return "Oops";
    }

    if (status === Status.LOADING) {
        return <CircularProgress />;
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid item container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Stack direction="row" spacing={2}>
                            <Typography variant="h1">Locations</Typography>
                            <IconButton onClick={handleOpen}>
                                <AddIcon/>
                            </IconButton>
                            <CreateModal 
                                open={open} 
                                handleClose={handleClose} 
                                type="Locations" 
                                onSubmit={async (locationDTO) => {
                                    await create(locationDTO);
                                    handleClose();
                                }}
                                />
                        </Stack>
                    </Grid>
                    <Container>
                        <Stack direction={"row"} flexWrap={"wrap"} sx={{ width: '100%' }} spacing={3} item container>
                            {locations.map((location) => (
                                <LocationCard key={location.id} id={location.id} title={location.name} description={location.description} />
                            ))}
                        </Stack>
                    </Container>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Locations;
