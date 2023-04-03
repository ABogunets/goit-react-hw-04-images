import PropTypes from 'prop-types';
import { Overlay, ModalWrapper } from 'components/Modal/Modal.styled';
import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyEcape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyEcape);
  }

  onKeyEcape = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render = () => {
    return (
      <Overlay onClick={this.onBackdropClick}>
        <ModalWrapper>
          <img src={this.props.largeImg} alt="" />
        </ModalWrapper>
      </Overlay>
    );
  };
}

Modal.propTypes = {
  onClose: PropTypes.func,
  largeImg: PropTypes.string.isRequired,
};
