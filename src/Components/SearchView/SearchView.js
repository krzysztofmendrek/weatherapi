import React, { useState } from 'react';
import './SearchView.css';
import { Link, useHistory } from 'react-router-dom';
import magnifer from '../../assets/Icon/search.svg';

function SearchView() {
  const history = useHistory();
  const [searchInputValue, setSearchInputValue] = useState('');

  const onEnterPress = event => {
    if (event.key === 'Enter') {
      history.push(`/search/${searchInputValue}`);
      setSearchInputValue('');
    }
  };

  const myFunction = () => {
    setSearchInputValue('');
  };

  return (
    <div className='weather-finder'>
      <form>
        <input
          placeholder='introduce una ciudad o pueblo'
          autoComplete='off'
          onKeyPress={onEnterPress}
          onChange={event => {
            setSearchInputValue(event.target.value);
          }}
          value={searchInputValue}
          aria-label='enter name of your city'
          type='text'
          name='search'
        />
        <Link to={`/search/${searchInputValue}`} onClick={myFunction}>
          <img className='searchButton' src={magnifer} alt='magnifier icon for searching' />
        </Link>
      </form>
    </div>
  );
}

export default SearchView;
