import React from 'react';
import classes from './SearchBar.module.css';

const SearchBar = props => (
  <input className={classes.SearchBar}
    type="search"
    placeholder="&#128269; &#8195;Search" 
    value={props.searchText}
    onChange={props.onChange}
  />
)

export default SearchBar;