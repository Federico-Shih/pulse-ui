import { useEffect, useState } from 'react';

// material-ui
import { Grid, Typography, IconButton, Stack, Card, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';

// project imports
import { gridSpacing } from 'store/constant';
import CreateModal from 'ui-component/models/CreateModal.js';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const MOCKED_LOCATIONS = [
    {
        title: "Kitchen",
        description: "This is the kitchen"
    },
    {
        title: "Living Room",
        description: "This is the living room"
    },
    {
        title: "Bedroom",
        description: "This is the bedroom"
    },
]

function LocationCard({ title, description }) {
    const theme = useTheme();

    return ( 
        <Card                 
            sx={{
                borderColor: theme.palette.primary[200] + 25,
                ':hover': {
                    boxShadow: theme.shadows[16]
                },
                width: "25vh",
                height: "20vh",
        }}>
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
    const [isLoading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setLoading(false);
    }, []);

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
                            <CreateModal open={open} handleClose={handleClose} type="Locations" />
                        </Stack>
                    </Grid>
                    <Grid item container xs={12} justifyContent="flex-start">
                        {MOCKED_LOCATIONS.map((location) => (
                            <Grid item xs={3}> 
                                <LocationCard title={location.title} description={location.description} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Locations;
