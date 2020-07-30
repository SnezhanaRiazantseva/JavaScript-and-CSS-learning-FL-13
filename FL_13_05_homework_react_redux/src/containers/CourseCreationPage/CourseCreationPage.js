import React from 'react';
import CourseForm from '../../components/CourseForm/CourseForm';
import classes from './CourseCreationPage.module.css';

export default class CourseCreationPage extends React.Component {
  render() {
    return(
      <div className={classes.CourseCreationPage}>
        <h1>... course</h1>
        <CourseForm />
      </div>
    );
  }
}