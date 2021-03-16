import React from 'react';
import PropTypes from 'prop-types';

class SettingsBtn extends React.Component {
  render() {
    const { func } = this.props;

    return (
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ func }
      >
        Configuraçoẽs
      </button>
    );
  }
}

SettingsBtn.propTypes = {
  func: PropTypes.func.isRequired,
};

export default SettingsBtn;
