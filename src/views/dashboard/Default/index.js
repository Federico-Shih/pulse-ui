import { useEffect, useState } from 'react';

// material-ui
import { Grid, Select, ToggleButton, ToggleButtonGroup, MenuItem, InputLabel, FormControl } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import RealTimeCard from './RealTimeCard';
import AlertCard from './AlertCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalConsumptionBarChart from './TotalConsumptionBarChart';
import { gridSpacing } from 'store/constant';
import SectorPieChartCard from './SectorPieChartCard';
import { Stack } from '@mui/system';

const MOCKED_LOCATIONS = [ "Location1", "Location2", "Location3" ]

const MOCKED_SECTIONS = [ "Sections1", "Sections2", "Sections3", "Sections4", "Sections5", "Sections6", "Sections7", "Sections8" ]

// ==============================|| DEFAULT DASHBOARD ||============================== //

/*
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>

*/
const Dashboard = () => {
    const [typeOfEnergy, setTypeOfEnergy] = useState('WATER');
    const [location, setLocation] = useState('');
    const [section, setSection] = useState('');
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    const handleTypeOfEnergy = (
        event: React.MouseEvent<HTMLElement>,
        newTypeOfEnergy: string,
      ) => {
        setTypeOfEnergy(newTypeOfEnergy);
      };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item container xs={12}>
                <Grid item xs={12}>
                    <FormControl>
                        <InputLabel id="location-select">Location</InputLabel>
                        <Select
                            labelId="location-select"
                            id="location-select"
                            value={location}
                            label="Location"
                            onChange={(event) => setLocation(event.target.value)}
                            sx={{ width: "30vh", marginRight: "1.5em"}}
                        >
                            {MOCKED_LOCATIONS.map((location) => (
                                <MenuItem value={location}>{location}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="location-select">Section</InputLabel>
                        <Select
                            labelId="section-select"
                            id="section-select"
                            value={section}
                            label="Section"
                            onChange={(event) => setSection(event.target.value)}
                            sx={{ width: "30vh",  marginRight: "1.5em"}}
                        >
                            {MOCKED_SECTIONS.map((section) => (
                                <MenuItem value={section}>{section}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <ToggleButtonGroup       
                        color="primary"
                        value={typeOfEnergy}
                        exclusive
                        onChange={handleTypeOfEnergy}
                    >
                        <ToggleButton value="water">WATER</ToggleButton>
                        <ToggleButton value="electrecity">ELECTRICITY</ToggleButton>
                        <ToggleButton value="gas">GAS</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={8}>
                        <TotalConsumptionBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <EarningCard isLoading={isLoading} />
                            </Grid>
                            <Grid item xs={12}>
                                <TotalOrderLineChartCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={8}>
                        <RealTimeCard isLoading={isLoading} />
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
