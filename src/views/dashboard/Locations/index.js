import { useEffect, useState } from 'react';

// material-ui
import { Grid, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// project imports
import { gridSpacing } from 'store/constant';
import CreateModal from 'ui-component/models/CreateModal.js';

// ==============================|| DEFAULT DASHBOARD ||============================== //

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
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={6} md={6} sm={6} xs={6} >
                        <Typography variant="h1">Locations</Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <IconButton onClick={handleOpen}>
                            <AddIcon/>
                        </IconButton>
                        <CreateModal open={open} handleClose={handleClose} type="Locations" />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Locations;
