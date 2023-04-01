import React, { useState } from 'react'

import { Modal, Box, Typography, TextField, Grid, Button, Stack } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

export default function CreateModal({ open, handleClose, type, onSubmit }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        await onSubmit({ title, description });
        setLoading(false);
    }

    return (
        <Modal
        open={open}
        onClose={handleClose}
        >
            <Box sx={style}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography id="modal-modal-title" variant="h2" component="h2">
                            {type}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField sx={{ width: '100%' }} onChange={(event) => setTitle(event.target.value)} label="Title" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField sx={{ width: '100%' }}  onChange={(event) => setDescription(event.target.value)} label="Description" variant="outlined" />
                    </Grid>
                    <Grid item container xs={12}>
                        <Stack direction="row" spacing={2}>
                            <Button onClick={handleSave} variant="contained" loading={loading}>Save</Button>
                            <Button onClick={handleClose} variant="outlined" disabled={loading}>Cancel</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}