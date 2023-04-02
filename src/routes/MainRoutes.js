import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Locations = Loadable(lazy(() => import('views/dashboard/Locations')));
const Sectors = Loadable(lazy(() => import('views/dashboard/Sectors')));
const Sector = Loadable(lazy(() => import('views/dashboard/Sectors/Sector')));
const Sensor = Loadable(lazy(() => import('views/dashboard/Sectors/Sector/Sensor')));
const Reports = Loadable(lazy(() => import('views/dashboard/Reports')));
const Alerts = Loadable(lazy(() => import('views/dashboard/Alerts')));
// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                },
                {
                    path: 'locations',
                    element: <Locations />
                },
                {
                    path: 'reports',
                    element: <Reports />
                },
                {
                    path: 'locations/:id',
                    element: <Sectors />,
                },
                {
                    path: 'locations/:id/sectors/:sectorId',
                    element: <Sector />
                },
                {
                    path: 'locations/:id/sectors/:sectorId/sensors/:sensorId',
                    element: <Sensor />
                },
                {
                    path: 'alerts',
                    element: <Alerts />
                },
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
