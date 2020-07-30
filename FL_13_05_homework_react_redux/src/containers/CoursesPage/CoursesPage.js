import React from 'react';
import classes from './CoursesPage.module.css';
import SearchBar from '../../components/UI/SearchBar/SearchBar'
import Button from '../../components/UI/Button/Button'
import CoursesTable from '../../components/CoursesTable/CoursesTable'

const CoursesPage = props => {
  // console.log('CoursesPage:', props)
  return(
    <div className={classes.CoursesPage}>
      <div className={classes.barWrapper}>
        <SearchBar 
          searchText={props.searchText}
          isSearched={props.isSearched}
          searchedCourses={props.searchedCourses}
          onChange={props.onChange}
        />
        <Button actionType={props.actionType}/>
      </div>
      <CoursesTable 
        courses ={
          !!props.isSearched
          ? props.searchedCourses
          : props.courses
        }
        actionType={props.actionType}
      />
    </div>
  )
}

export default CoursesPage;