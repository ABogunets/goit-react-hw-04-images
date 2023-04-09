import PropTypes from 'prop-types';
import { Overlay, ModalWrapper } from 'components/Modal/Modal.styled';
import { useEffect } from 'react';

export const Modal = ({ onClose, largeImg }) => {
  useEffect(() => {
    const onKeyEcape = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyEcape);
    return () => {
      window.removeEventListener('keydown', onKeyEcape);
    };
  }, [onClose]);

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={onBackdropClick}>
      <ModalWrapper>
        <img src={largeImg} alt="" />
      </ModalWrapper>
    </Overlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  largeImg: PropTypes.string.isRequired,
};
