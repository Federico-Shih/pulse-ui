import { useEffect, useState } from 'react';

// material-ui
import { Grid, Select, ToggleButton, ToggleButtonGroup, MenuItem, InputLabel, FormControl, CircularProgress } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import RealTimeCard from './RealTimeCard';
import AlertCard from './AlertCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalConsumptionBarChart from './TotalConsumptionBarChart';
import { gridSpacing } from 'store/constant';
import { useFilters, useOrganizationStore } from './store';
import { HeartbeatType } from 'services/heartbeat.service';

const Dashboard = () => {
    const organizationStore = useOrganizationStore();
    const [typeOfEnergy, setTypeOfEnergy] = useState(HeartbeatType.Electricity);
    const filterStore = useFilters();

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        async function initialFetch() {
            setLoading(true);
            await organizationStore.fetch();
            await filterStore.fetch();
            setLoading(false);
        }
        initialFetch();
    }, []);

    const handleTypeOfEnergy = (
        event,
        newTypeOfEnergy,
      ) => {
        setTypeOfEnergy(newTypeOfEnergy);
      };
    
    if (isLoading) return <CircularProgress />

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item container xs={12}>
                <Grid item xs={12}>
                    <FormControl>
                        <InputLabel id="location-select">Location</InputLabel>
                        <Select
                            labelId="location-select"
                            id="location-select"
                            value={filterStore.selectedLocation}
                            label="Location"
                            onChange={(event) => filterStore.setLocation(event.target.value)}
                            sx={{ width: "30vh", marginRight: "1.5em"}}
                        >
                            {filterStore.locations.map((location) => (
                                <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="location-select">Section</InputLabel>
                        <Select
                            disabled={filterStore.selectedLocation.length === 0}
                            labelId="section-select"
                            id="section-select"
                            value={filterStore.selectedSection}
                            label="Section"
                            onChange={(event) => filterStore.setSector(event.target.value)}
                            sx={{ width: "30vh",  marginRight: "1.5em"}}
                        >
                            {filterStore.sectors.map((section) => (
                                <MenuItem value={section.id}>{section.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <ToggleButtonGroup       
                        color="primary"
                        value={typeOfEnergy}
                        exclusive
                        onChange={handleTypeOfEnergy}
                    >
                        <ToggleButton value={HeartbeatType.Water}>WATER</ToggleButton>
                        <ToggleButton value={HeartbeatType.Electricity}>ELECTRICITY</ToggleButton>
                        <ToggleButton value={HeartbeatType.Naturalgas}>GAS</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={8}>
                        <TotalConsumptionBarChart 
                            isLoading={isLoading} 
                            type={typeOfEnergy} 
                            location={filterStore.selectedLocation}
                            sector={filterStore.selectedSector}
                            />
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <EarningCard isLoading={isLoading} type={typeOfEnergy} />
                            </Grid>
                            <Grid item xs={12}>
                                <TotalOrderLineChartCard isLoading={isLoading} type={typeOfEnergy} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={8}>
                        <RealTimeCard 
                            isLoading={isLoading} 
                            type={typeOfEnergy}                            
                            locationId={filterStore.selectedLocation}
                            sectorId={filterStore.selectedSector} 
                            />
                    </Grid>
                    <Grid item xs={4}>
                        <AlertCard isLoading={isLoading} />
                    </Grid>
                    {/* <SectorPieChartCard sections={{ section1: 100, section2: 503, section5: 1235 }} /> */}
                </Grid>
            </Grid>

        </Grid>
    );
};

export default Dashboard;
