import React from 'react';
import CourseForm from './CourseForm/CourseForm';
import classes from './CourseCreationPage.module.css';

const CourseCreationPage = props => {
  return(
    <div className={classes.CourseCreationPage}>
      <h1>{props.actionType} course</h1>
      <CourseForm 
        typedCourseInfo={props.typedCourseInfo} 
        actionType={props.actionType} 
        onChangeCourseHandler={props.onChangeCourseHandler}
        onCancelClick={props.onCancelClick}
        onSubmitClick={props.onSubmitClick} 
        isFormValid={props.isFormValid}
      />
    </div>
  );
}

export default CourseCreationPage;