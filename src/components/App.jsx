import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getPics } from 'components/services/pics-api.js';

import { AppWrapper } from './App.styled';
import { Button } from 'components/Button/Button.styled';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    page: 1,
    searchQuery: '',
    picsSet: [],
    largeImgPic: '',
    totalHits: null,
    isloading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ isLoading: true });

      getPics(nextQuery, nextPage)
        .then(data => {
          this.setState({
            picsSet:
              nextPage === 1 ? data.hits : [...prevState.picsSet, ...data.hits],
            totalHits: data.totalHits,
          });
          if (data.hits.length === 0 && nextPage === 1) {
            toast.info(`Sorry, no pics on query "${nextQuery}"`);
          }
        })
        .catch(error => this.setState({ error }))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  searchSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
    window.scrollTo(0, 0);
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onImgClick = largeImageURL => {
    this.setState({ largeImgPic: largeImageURL });
  };

  modalClose = () => {
    this.setState({ largeImgPic: '' });
  };

  render() {
    const { picsSet, error, isLoading, largeImgPic, totalHits } = this.state;
    return (
      <AppWrapper>
        <Searchbar onSubmit={this.searchSubmit} />
        {error && <h2>{error.message}</h2>}
        {picsSet.length > 0 && (
          <ImageGallery items={picsSet} onClick={this.onImgClick} />
        )}
        {isLoading && <Loader />}
        {!isLoading && picsSet.length > 0 && picsSet.length < totalHits && (
          <Button onClick={this.loadMore} type="button">
            Load more
          </Button>
        )}
        {largeImgPic.length > 0 && (
          <Modal largeImg={largeImgPic} onClose={this.modalClose} />
        )}
        <ToastContainer autoClose={3000} />
      </AppWrapper>
    );
  }
}
