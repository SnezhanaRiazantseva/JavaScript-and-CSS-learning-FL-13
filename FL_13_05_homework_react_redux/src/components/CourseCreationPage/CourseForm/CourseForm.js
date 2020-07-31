import React from 'react';
import classes from './CourseForm.module.css';

const CourseForm = props => {
  let dateFormatForSpan = '';
  let dateFormat;
  let durationFormat

  if (props.actionType === 'Edit') {
    dateFormat = props.typedCourseInfo.date.split('.').reverse()
    if (dateFormat[0].length === 2) {
      dateFormat[0] = '20' + dateFormat[0];
    }
    dateFormatForSpan = [...dateFormat].reverse().join('/');
  
    durationFormat = props.typedCourseInfo.duration.split(':');
    if (durationFormat[0].length === 1) {
      durationFormat[0] = '0' + durationFormat[0];
    }
    durationFormat = durationFormat.join(':');
  }

  return(
    <form className={classes.CourseCreationForm} onSubmit={props.onSubmitClick} >
      <div className={classes.mainInfoWrapper}>
        <label htmlFor="courseTitle">Title</label>
        <input
          type="text" 
          id="courseTitle" 
          required 
          value={
            props.actionType === 'Edit'
            ? props.typedCourseInfo.name
            : undefined
          }
          onChange={props.onChangeCourseHandler}
        ></input>
        <br/>
        <label htmlFor="courseDescription">Description</label>
        <textarea 
          rows="10" 
          id="courseDescription" 
          required
          value={
            props.actionType === 'Edit'
            ? props.typedCourseInfo.description
            : undefined
          }
          onChange={props.onChangeCourseHandler}
        ></textarea>
      </div>
      <div className={classes.secondaryInfoWrapper}>
        <div className={classes.infoWrapper}>
          <label htmlFor="courseDuration">Duration</label>
          <input 
            type="text" 
            id="courseDuration" 
            required
            maxLength="5" 
            pattern="[0-9]{2}:[0-9]{2}"
            value={
              props.actionType === 'Edit'
              ? durationFormat
              : undefined
            }
            onChange={props.onChangeCourseHandler}
          ></input>
          <label htmlFor="courseAuthors">Authors</label>
          <input 
            type="text" 
            id="courseAuthors" 
            required 
            value={
              props.actionType === 'Edit'
              ? !!props.typedCourseInfo.authors ? props.typedCourseInfo.authors : ''
              : undefined
            }
            onChange={props.onChangeCourseHandler}
          ></input>
        </div>
        <div className={classes.dateWrapper}>
          <div className={classes.dateInfoWrapper}>
            <label htmlFor="courseDate">Date</label>
            <span>{dateFormatForSpan}</span>
          </div>
          <input 
            type="date" 
            id="courseDate" 
            required 
            value={
              props.actionType === 'Edit'
              ? dateFormat.join('-')
              : undefined
            }
            onChange={props.onChangeCourseHandler}
          ></input>
        </div>
      </div>
      <div className={classes.buttonsWrapper}>
        <input 
          type="submit" 
          value={!!props.actionType ? props.actionType : 'Save'}
          className={!!props.isFormValid ? classes.active : ''}
        />
        <input type="reset" value="Cancel" onClick={props.onCancelClick}/>
      </div>
    </form>
  );
}

export default CourseForm;