import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { status, func } = this.props;

    return (
      <button
        type="button"
        data-testid="btn-play"
        disabled={ !status }
        onClick={ func }
      >
        Jogar
      </button>
    );
  }
}

Button.propTypes = {
  status: PropTypes.bool.isRequired,
  func: PropTypes.func.isRequired,
};

export default Button;
