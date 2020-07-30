import React from 'react';
import classes from './OptionsDropdown.module.css';
import editIcon from '../../edit.svg';
import deleteIcon from '../../delete.svg';

const OptionsDropdown = props => {
    return (
      <div className={classes.Dropdown}>
        <div className={classes.editButton}>
          <img src={editIcon} alt="Edit icon" className={classes.editIcon} />
          <span>Edit</span>
        </div>
        <div className={classes.deleteButton}>
          <img src={deleteIcon} alt="Delete icon" className={classes.deleteIcon} />
          <span>Delete</span>
        </div>
      </div>
    );
  }

export default OptionsDropdown;