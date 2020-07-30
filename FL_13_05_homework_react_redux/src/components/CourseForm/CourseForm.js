import React from 'react';
import classes from './CourseForm.module.css';
import Button from '../UI/Button/Button';

const CourseForm = props => {
  let dateValue = "fromState";
  return(
    <form className={classes.CourseCreationForm}>
      <div className={classes.mainInfoWrapper}>
        <label htmlFor="courseTitle">Title</label>
        <input type="text" id="courseTitle" required></input>
        <br/>
        <label htmlFor="courseDescription">Description</label>
        <textarea rows="10" id="courseDescription" required></textarea>
      </div>
      <div className={classes.secondaryInfoWrapper}>
        <div className={classes.infoWrapper}>
          <label htmlFor="courseDuration">Duration</label>
          <input type="text" id="courseDuration" required></input>
          <label htmlFor="courseAuthors">Authors</label>
          <input type="text" id="courseAuthors" required></input>
        </div>
        <div className={classes.dateWrapper}>
          <div className={classes.dateInfoWrapper}>
            <label htmlFor="courseDate">Date</label>
            <span>{dateValue}</span>
          </div>
          <input type="date" id="courseDate" required></input>
        </div>
      </div>
      <div className={classes.buttonsWrapper}>
        <Button/>
        <input type="reset" value="Cancel"/>
      </div>
    </form>
  );
}

export default CourseForm;