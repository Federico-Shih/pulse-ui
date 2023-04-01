import { useParams } from "react-router-dom";
import useSectors from "./useSectors";
import { useEffect } from "react";
import DescriptionForm from "./DescriptionForm";
import { Status } from "./Sector/useSensor";
import Sector from "./Sector";
import CreateModal from "ui-component/models/CreateModal";
import { IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SectorCard from "./SectorCard";

const Sectors = () => {
    const params = useParams();
    const store = useSectors();
    useEffect(() => {
        if (params.id) {
            store.fetch(params.id);
        }
    }, []);
    console.log(store);
    if (!params.id) {
        return <div>HASNT ID</div>;
    }

    return (
        <>
            {
                store.status === Status.SUCCESS && (
                    <>
                        <Stack direction="row" spacing={5}>
                            <DescriptionForm title={store.title} description={store.description} />
                            <IconButton onClick={store.openModal} sx={{ width: 50 }}>
                                <AddIcon/>
                            </IconButton>
                        </Stack>
                        <Stack direction="row" width={"100%"} flexWrap="wrap">
                            {
                                store.sectorList.map((sector) => (
                                    <SectorCard key={sector} sectorId={sector} />
                                ))
                            }
                        </Stack>
                    </>
                )
            }
            <CreateModal open={store.open} handleClose={store.closeModal} type="Sector" />
        </>
    );
}

export default Sectors;