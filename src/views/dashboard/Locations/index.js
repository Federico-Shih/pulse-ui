import { useEffect, useState } from 'react';

// material-ui
import { Grid, Typography, IconButton, Stack } from '@mui/material';
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
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Locations;
