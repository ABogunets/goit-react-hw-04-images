import PropTypes from 'prop-types';
import {
  ImageGalleryItemWrapper,
  Image,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webImage, largeImage, onClick }) => {
  return (
    <ImageGalleryItemWrapper onClick={() => onClick(largeImage)}>
      <Image src={webImage} alt="" />
    </ImageGalleryItemWrapper>
  );
};

ImageGalleryItem.propTypes = {
  webImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
