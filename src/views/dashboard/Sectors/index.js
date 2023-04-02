import { useParams } from "react-router-dom";
import useSectors from "./useSectors";
import { useEffect, useMemo } from "react";
import DescriptionForm from "./DescriptionForm";
import { Status } from "./Sector/useSensor";
import CreateModal from "ui-component/models/CreateModal";
import { Grid, IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SectorCard from "./SectorCard";
import { useLocations } from "../Locations/useLocations";

const Sectors = () => {
    const params = useParams();
    const store = useSectors();
    const { locations, fetch: fetchLocations } = useLocations();
    const location = useMemo(() => locations.find((location) => (location.id === params.id)), [locations, params.id]);

    useEffect(() => {
        if (params.id && location) {
            store.fetch(params.id);
        } else {
            fetchLocations();
        }
    }, [fetchLocations, location, params.id]);

    if (!params.id) {
        return <div>HASNT ID</div>;
    }

    return (
        <>
            {
                store.status === Status.SUCCESS && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Stack direction="row" spacing={5}>
                                <DescriptionForm title={location.name} description={location.description} />
                                <IconButton onClick={store.openModal} sx={{ width: 50 }}>
                                    <AddIcon/>
                                </IconButton>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container direction="row" width={"100%"} flexWrap="wrap" spacing={2}>
                                {
                                    store.sectorList.map((sector) => (
                                        <Grid item key={sector.id} xs={3}>
                                            <SectorCard  sector={sector} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }
            <CreateModal 
                open={store.open} 
                handleClose={store.closeModal} 
                onSubmit={(locationDTO) => { store.create(params.id, locationDTO); store.closeModal(); }} 
                type="Sector" 
                />
        </>
    );
}

export default Sectors;