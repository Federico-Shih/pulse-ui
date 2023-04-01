import PropTypes from 'prop-types';
import MuiTypography from '@mui/material/Typography';

const DescriptionForm = ({ title, description }) => {
    return (
        <>
            <MuiTypography variant="h3">
                {title}
            </MuiTypography>
            <MuiTypography variant="subtitle1">
                {description}
            </MuiTypography>
        </>
    );
}

DescriptionForm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default DescriptionForm;