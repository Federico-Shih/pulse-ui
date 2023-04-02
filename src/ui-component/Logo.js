// material-ui
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import logo from 'assets/images/logo.png'

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Berry" width="100" />
         *
         */
        <>
            <img src={logo} alt="Pulse logo" width="30" />
            <Typography variant="h2" ml={1}>
                Pulse
            </Typography>
        </>
    );
};

export default Logo;
