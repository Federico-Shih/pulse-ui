import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalConsumptionBarChart from 'ui-component/cards/Skeleton/TotalConsumptionBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import chartData from './chart-data/total-growth-bar-chart';
import { useMonthConsume, useOrganizationStore } from './store';
import ReactApexChart from 'react-apexcharts';

const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

const MOCKED_CONSUMPTIONS = {
    total: 570,
    data: {
        name: 'Investment',
        data: [35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75]
    },
}

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalConsumptionBarChart = ({ isLoading, type, location, sector }) => {
    const { organization, fetch } = useOrganizationStore();
    const mCS = useMonthConsume();
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const { navType } = customization;
    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const grey500 = theme.palette.grey[500];

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;
    useEffect(() => {
        if (organization) {
            mCS.fetch(type, organization.id, location, sector)
        } else {
            fetch();
        }
    }, [fetch, location, mCS.fetch, organization, sector, type]);

    const newChartData = {
        colors: [secondaryMain],
        yaxis: {
            labels: {
                style: {
                    colors: [primary]
                }
            },
            decimalsInFloat: 2
        },
        grid: {
            borderColor: grey200
        },
        tooltip: {
            theme: 'light'
        },
        legend: {
            labels: {
                colors: grey500
            }
        },
        ...chartData.options,
        xaxis: {
            labels: {
                style: {
                    colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
                }
            },
            type: 'category',
            categories: mCS.months
        },
    };
    return (
        <>
            {isLoading ? (
                <SkeletonTotalConsumptionBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <ReactApexChart 
                                options={newChartData}
                                series={[{data: mCS.values, name: 'Consumption' }]}
                                type="bar"
                                height={350}
                            />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalConsumptionBarChart.propTypes = {
    isLoading: PropTypes.bool,
    type: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    sector: PropTypes.string.isRequired,
};

export default TotalConsumptionBarChart;
