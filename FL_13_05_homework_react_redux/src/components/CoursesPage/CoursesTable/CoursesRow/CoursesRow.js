import React from 'react';
import classes from './CoursesRow.module.css';
import OptionsDropdown from '../CoursesRow/OptionsDropdown/OptionsDropdown'

const CoursesRow = props => {
  const courses = props.courses;

  let durationFormat = courses.duration.split(':');
  if (durationFormat[0].length === 1) {
    durationFormat[0] = '0' + durationFormat[0];
  }
  durationFormat[0] = durationFormat[0] + 'h';
  durationFormat[1] = durationFormat[1] + 'min';
  let duration = durationFormat.join(' ');
  return (
    <div className={classes.CourseRowWrapper}>
      <div className={classes.course} key={courses.date}>{courses.date}</div>
      <div className={classes.course} key={courses.name}>{courses.name}</div>
      <div className={classes.course} key={courses.description}>{courses.description}</div>
      <div className={classes.course} key={duration}>{duration}</div>
      <div className={classes.course} key={'3dots'}>
        <div className={classes.menuDots}> &#183; &#183; &#183;</div>
        <OptionsDropdown/> 
      </div>
    </div>
  )
}

  export default CoursesRow;