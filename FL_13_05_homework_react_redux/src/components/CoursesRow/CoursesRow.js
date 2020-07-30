import React from 'react';
import classes from './CoursesRow.module.css';
import OptionsDropdown from '../OptionsDropdown/OptionsDropdown'

const CoursesRow = props => {
  const courses = props.courses;
  const cls1 = [classes.course, classes.datacellDropdown]; //нужны ли?
  const cls2 = [classes.course, classes.courseName]; //нужны ли?

  let durationFormat = courses.duration.split(':');
  if (durationFormat[0].length === 1) {
    durationFormat[0] = '0' + durationFormat[0];
  }
  durationFormat[0] = durationFormat[0] + 'h';
  durationFormat[1] = durationFormat[1] + 'min';
  let duration = durationFormat.join(' ');

  return (
    <div className={classes.CourseRowWrapper}>
      <div className={classes.course}>{courses.date}</div>
      <div className={cls1.join(' ')}>{courses.name}</div>
      <div className={classes.course}>{courses.description}</div>
      <div className={classes.course}>{duration}</div>
      <div className={cls2.join(' ')}> 
        <div className={classes.menuDots}> &#183; &#183; &#183;</div>
        <OptionsDropdown/> 
      </div>
    </div>
  )
}

  export default CoursesRow;