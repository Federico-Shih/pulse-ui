import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from './chart-data/bajaj-area-chart';
import { useOrganizationStore, useRealTime } from './store';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const RealTimeCard = ({ type, sectorId, locationId}) => {
    const { organization, fetch } = useOrganizationStore();
    const rtaStore = useRealTime();

    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const { navType } = customization;

    const orangeDark = theme.palette.secondary[800];
    const grey200 = theme.palette.grey[200];

    useEffect(() => {
        if (organization) {
            rtaStore.fetch({ type, organizationId: organization.id, sectorId, locationId });
        } else {
            fetch();
        }
        const newSupportChart = {
            ...chartData.options,
            colors: [orangeDark],
            tooltip: {
                theme: 'light'
            },
            grid: {
                borderColor: grey200
            },
        };
        ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
    }, [navType, orangeDark]);

    const newChartData = chartData;
    newChartData.series = [{ data: rtaStore.values }];
    return (
        <Card sx={{ bgcolor: 'secondary.light' }}>
            <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h4" sx={{ color: theme.palette.secondary.dark }}>
                                Real Time Consumption - last 24 hs
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Chart {...newChartData} />
        </Card>
    );
};

export default RealTimeCard;
