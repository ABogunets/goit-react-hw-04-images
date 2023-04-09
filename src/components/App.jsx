import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchPics } from 'components/services/pics-api.js';

import { AppWrapper } from './App.styled';
import { Button } from 'components/Button/Button.styled';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export const App = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [picsSet, setPicsSet] = useState([]);
  const [largeImgPic, setLargeImgPic] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      //first render, fetch is not performed
      return;
    }
    setIsLoading(true);
    const getPics = async () => {
      try {
        const { hits, totalHits } = await fetchPics(searchQuery, page);

        setPicsSet(prevPicsSet =>
          page === 1 ? hits : [...prevPicsSet, ...hits]
        );
        setTotalHits(totalHits);
        if (hits.length === 0 && page === 1) {
          toast.info(`Sorry, no pics on query "${searchQuery}"`);
        }
      } catch (err) {
        console.log(err.message);
        setError('Oops, something went wrong...');
      } finally {
        setIsLoading(false);
      }
    };
    getPics();
  }, [searchQuery, page]);

  const searchSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    window.scrollTo(0, 0);
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  const onImgClick = largeImageURL => {
    setLargeImgPic(largeImageURL);
  };

  const modalClose = () => {
    setLargeImgPic('');
  };

  return (
    <AppWrapper>
      <Searchbar onSubmit={searchSubmit} />
      {error && <h2>{error}</h2>}
      {picsSet.length > 0 && (
        <ImageGallery items={picsSet} onClick={onImgClick} />
      )}
      {isLoading && <Loader />}
      {!isLoading && picsSet.length > 0 && picsSet.length < totalHits && (
        <Button onClick={loadMore} type="button">
          Load more
        </Button>
      )}
      {largeImgPic.length > 0 && (
        <Modal largeImg={largeImgPic} onClose={modalClose} />
      )}
      <ToastContainer autoClose={3000} />
    </AppWrapper>
  );
};
