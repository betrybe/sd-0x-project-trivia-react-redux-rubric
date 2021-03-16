import React from 'react';
import PropTypes from 'prop-types';

class NextBtn extends React.Component {
  render() {
    const { func, func2, check } = this.props;

    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ check ? func : func2 }
      >
        Próxima
      </button>
    );
  }
}

NextBtn.propTypes = {
  func: PropTypes.func.isRequired,
  func2: PropTypes.func.isRequired,
  check: PropTypes.bool.isRequired,
};

export default NextBtn;
