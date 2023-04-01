import PropTypes from 'prop-types';
import MuiTypography from '@mui/material/Typography';
import { Stack } from '@mui/system';

const DescriptionForm = ({ title, description }) => {
    return (
        <Stack direction="column">
            <MuiTypography variant="h3">
                {title}
            </MuiTypography>
            <MuiTypography variant="subtitle2">
                {description}
            </MuiTypography>
        </Stack>
    );
}

DescriptionForm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default DescriptionForm;