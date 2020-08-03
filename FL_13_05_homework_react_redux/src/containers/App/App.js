import React from 'react';
import classes from './App.module.css';
import CoursesPage from '../../components/CoursesPage/CoursesPage';
import CourseCreationPage from '../../components/CourseCreationPage/CourseCreationPage';
import addInitialStorage from '../../addInitialStorage';
import filterCourses from '../../filterCourses';
import {connect} from 'react-redux';
import {
  searchBarNoSearch,
  searchBarSetState,
  actionTypeSetType,
  deleteCourse,
  openEditCoursePage,
  inputUpdateCourseInfo,
  checkIsFormValid,
  submitAddCourse,
  submitEditCourse,
} from '../../store/actions/app';

addInitialStorage();

class App extends React.Component {

  onSearchBarChangeHandler = event => {
    event.preventDefault();
    if (!event.target.value.trim()) {
      this.props.searchBarNoSearch();
      return;
    }
    let searchedCourses = filterCourses(event.target.value, this.props.courses);
    this.props.searchBarSetState(event.target.value, searchedCourses);
  }

  onChangeCourseHandler = event => {
    event.preventDefault();
    switch (event.target.id) {
      case 'courseTitle':
        if (this.props.typedCourseInfo.name !== event.target.value) {
          let typedCourseInfo = Object.assign({}, this.props.typedCourseInfo);
          typedCourseInfo.name = event.target.value;
          this.props.inputUpdateCourseInfo(typedCourseInfo);
        }
        break;
      case 'courseDescription':
        if (this.props.typedCourseInfo.description !== event.target.value) {
          let typedCourseInfo = Object.assign({}, this.props.typedCourseInfo);
          typedCourseInfo.description = event.target.value;
          this.props.inputUpdateCourseInfo(typedCourseInfo);
        }
        break;
      case 'courseDuration':
        if (this.props.typedCourseInfo.duration !== event.target.value) {
          let typedCourseInfo = Object.assign({}, this.props.typedCourseInfo);
          typedCourseInfo.duration = event.target.value;
          this.props.inputUpdateCourseInfo(typedCourseInfo);
        }
        break;
      case 'courseAuthors':
        if (this.props.typedCourseInfo.duration !== event.target.value) {
          let typedCourseInfo = Object.assign({}, this.props.typedCourseInfo);
          typedCourseInfo.authors = event.target.value;
          this.props.inputUpdateCourseInfo(typedCourseInfo);
        }
        break;
      case 'courseDate':
        if (this.props.typedCourseInfo.duration !== event.target.value) {
          let typedCourseInfo = Object.assign({}, this.props.typedCourseInfo);
          typedCourseInfo.date = event.target.value;
          this.props.inputUpdateCourseInfo(typedCourseInfo);
        }
        break;
      default: 
        break;
    }
    let inputArr = Object.values(this.props.typedCourseInfo);
    let countOfValidInputs = inputArr.reduce((acum, value) => {
      if (value.trim()) {
        acum += 1;
      }
      return acum;
    }, 0);
    let isFormValid = countOfValidInputs === 5;
    this.props.checkIsFormValid(isFormValid);
  }

  onClickDropdownHandler = event => {
    if (event.target.matches('div[class*=menuDots]')) {
      let dropdownArr = document.querySelectorAll('div[class*=DropdownMenu]');
      for (let dropdownElem of dropdownArr) {
        dropdownElem.hidden = true;
      }
      let parentDiv = event.target.closest('div[class*=course]');
      let dropdown = parentDiv.querySelector('div[class*=DropdownMenu]');

      if (dropdown.hidden) {
        dropdown.hidden = false;
      } else {
        dropdown.hidden = true;
      }
    } else if (event.target.closest('div[class*=DropdownMenu]')) {
      let date = event.target.closest('div[class*=CourseRowWrapper]').querySelector('div:nth-child(1)').innerHTML;
      let description = event.target.closest('div[class*=CourseRowWrapper]').querySelector('div:nth-child(3)').innerHTML;
      let index = this.props.courses.reduce((acum, course, index) => {
        if (course.date === date && course.description === description) {
          acum = index;
        }
        return acum;
      }, 0);
      if (event.target.closest('div[class*=deleteButton]')) {
        let courses = [...this.props.courses];
        courses.splice(index, 1);
        this.props.deleteCourse(courses);
      }
      if (event.target.closest('div[class*=editButton]')) {
        this.props.actionTypeSetType('Edit');
        this.props.openEditCoursePage(this.props.courses[index], index);
      }
    } else {
      let dropdownArr = document.querySelectorAll('div[class*=DropdownMenu]');
      for (let dropdownElem of dropdownArr) {
        dropdownElem.hidden = true;
      }
    }
  }

  onButtonClick = event => {
    event.preventDefault();
    if (this.props.actionType === null) {
      this.props.actionTypeSetType('Add');
    }
  }

  onCancelClick = event => {
    event.preventDefault();
    this.props.actionTypeSetType(null);
  }

  onSubmitClick = event => {
    event.preventDefault();
    if (this.props.actionType === 'Add') {
      let courses = [...this.props.courses];
      let typedCourseInfo = Object.assign({}, this.props.typedCourseInfo);
      
      typedCourseInfo.date = typedCourseInfo.date.split('-');
      typedCourseInfo.date[0] = typedCourseInfo.date[0].slice(2);
      typedCourseInfo.date = typedCourseInfo.date.reverse().join('.');

      courses.push(typedCourseInfo);
      this.props.submitAddCourse(courses);
    }
    if (this.props.actionType === 'Edit') {
      let courses = [...this.props.courses];
      let typedCourseInfo = Object.assign({}, this.props.typedCourseInfo);
      courses[this.props.index] = typedCourseInfo;
      this.props.submitEditCourse(courses);
    }
  }
  render() {
    localStorage.courses = JSON.stringify(this.props.courses);
    return (
      <div 
        className={classes.App}
        onClick={event => this.onClickDropdownHandler(event)}
      >
        {
          !!this.props.actionType 
          ? <CourseCreationPage 
            typedCourseInfo={this.props.typedCourseInfo}
            actionType={this.props.actionType}
            onChangeCourseHandler={event => this.onChangeCourseHandler(event)}
            onCancelClick={event => this.onCancelClick(event)}
            onSubmitClick={event => this.onSubmitClick(event)}
            isFormValid={this.props.isFormValid}
          /> 
          : <CoursesPage 
            courses={this.props.courses} 
            searchText={this.props.searchText}
            isSearched={this.props.isSearched}
            searchedCourses={this.props.searchedCourses}
            actionType={this.props.actionType}
            onSearchBarChangeHandler={event => this.onSearchBarChangeHandler(event)}
            onButtonClick={event => this.onButtonClick(event)}
          />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    courses: state.app.courses,
    searchText: state.app.searchText,
    isSearched: state.app.isSearched,
    searchedCourses: state.app.searchedCourses,
    actionType: state.app.actionType,
    typedCourseInfo: state.app.typedCourseInfo,
    isFormValid: state.app.isFormValid,
    index: state.app.index,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchBarNoSearch: () => dispatch(searchBarNoSearch()),
    searchBarSetState: (searchText, searchedCourses) => dispatch(searchBarSetState(searchText, searchedCourses)),
    actionTypeSetType: type => dispatch(actionTypeSetType(type)),
    deleteCourse: courses => dispatch(deleteCourse(courses)),
    openEditCoursePage: (typedCourseInfo, index) => dispatch(openEditCoursePage(typedCourseInfo, index)),
    inputUpdateCourseInfo: typedCourseInfo => dispatch(inputUpdateCourseInfo(typedCourseInfo)),
    checkIsFormValid: isFormValid => dispatch(checkIsFormValid(isFormValid)),
    submitAddCourse: courses => dispatch(submitAddCourse(courses)),
    submitEditCourse: courses => dispatch(submitEditCourse(courses))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);