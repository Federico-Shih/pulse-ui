// assets
import { IconDashboard, IconHome } from '@tabler/icons';
import HomeIcon from '@mui/icons-material/Home';
import { Assessment } from '@mui/icons-material';


// constant
const icons = { IconDashboard, HomeIcon, Assessment };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'locations',
            title: 'Locations',
            type: 'item',
            url: '/dashboard/locations',
            icon: icons.HomeIcon,
            breadcrumbs: false
        },
        {
            id: 'reports',
            title: 'Reports',
            type: 'item',
            url: '/dashboard/reports',
            icon: icons.Assessment,
        }
    ]
};

export default dashboard;
