import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';

import {
  SearchbarWrapper,
  SearchForm,
  SearchBtn,
  Input,
} from 'components/Searchbar/Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.warning('Please enter something..');
      return;
    }
    onSubmit(searchQuery);
    reset();
  };

  const handleChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const reset = () => {
    setSearchQuery('');
  };

  return (
    <SearchbarWrapper>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <ImSearch style={{ width: 20, height: 20 }} />
        </SearchBtn>
        <Input
          type="text"
          value={searchQuery}
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarWrapper>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
