import PropTypes from 'prop-types';
import { ImageGalleryWrapper } from 'components/ImageGallery/ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ items, onClick }) => {
  return (
    <ImageGalleryWrapper>
      {items.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webImage={webformatURL}
          largeImage={largeImageURL}
          onClick={onClick}
        />
      ))}
    </ImageGalleryWrapper>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
