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
                width: "100",
                height: "20vh",
                cursor: 'pointer',
                paddingBottom: 2,
            }}
            onClick={() => {
                navigate(`${id}`);
            }}
        >
            <CardContent>
                <Typography variant="h4" pb={1}>
                    {title}
                </Typography>
                <Typography sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
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
                <Grid item container spacing={1}>
                    <Grid item xs={12}>
                        <Stack direction="row" spacing={2} alignItems={"center"}>
                            <Typography variant="h2">Locations</Typography>
                            <IconButton onClick={handleOpen}>
                                <AddIcon/>
                            </IconButton>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {locations.map((location) => (
                                <Grid  
                                    key={location.id} 
                                    item
                                    xs={2}
                                >
                                    <LocationCard 
                                        id={location.id} 
                                        title={location.name} 
                                        description={location.description} 
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <CreateModal 
                open={open} 
                handleClose={handleClose} 
                type="Locations" 
                onSubmit={async (locationDTO) => {
                    await create(locationDTO);
                    handleClose();
                }}
            />
        </Grid>
    );
};

export default Locations;
