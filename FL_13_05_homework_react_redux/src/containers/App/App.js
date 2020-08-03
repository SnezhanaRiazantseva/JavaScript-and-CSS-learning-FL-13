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
} from '../../store/actions/app';

addInitialStorage();

// let courses = JSON.parse(localStorage.getItem('courses'));

class App extends React.Component {
  // state = {
    // courses: courses,
    // searchText: '',
    // isSearched: false,
    // searchedCourses: [],
    // actionType: null,
    // typedCourseInfo: {},
    // isFormValid: false,
    // index: null
  // }
  
  // onChangeHandler = event => {
  //   event.preventDefault();
  //   if (!event.target.value.trim()) {
  //     this.setState({
  //       searchText: '',
  //       isSearched: false,
  //       searchedCourses: [],
  //     })
  //     return;
  //   }
  //   this.setState({
  //     searchText: event.target.value,
  //     isSearched: true,
  //     searchedCourses: filterCourses(event.target.value, this.state.courses),
  //   })
  // }

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
        if (this.state.typedCourseInfo.name !== event.target.value) {
          let typedCourseInfo = Object.assign({}, this.state.typedCourseInfo);
          typedCourseInfo.name = event.target.value;
          this.setState((state) => {return { typedCourseInfo }});
        }
        break;
      case 'courseDescription':
        if (this.state.typedCourseInfo.description !== event.target.value) {
          let typedCourseInfo = Object.assign({}, this.state.typedCourseInfo);
          typedCourseInfo.description = event.target.value;
          this.setState((state) => {return { typedCourseInfo }});
        }
        break;
      case 'courseDuration':
        if (this.state.typedCourseInfo.duration !== event.target.value) {
          let typedCourseInfo = Object.assign({}, this.state.typedCourseInfo);
          typedCourseInfo.duration = event.target.value;
          this.setState((state) => {return { typedCourseInfo }});
        }
        break;
      case 'courseAuthors':
        if (this.state.typedCourseInfo.duration !== event.target.value) {
          let typedCourseInfo = Object.assign({}, this.state.typedCourseInfo);
          typedCourseInfo.authors = event.target.value;
          this.setState((state) => {return { typedCourseInfo }});
        }
        break;
      case 'courseDate':
        if (this.state.typedCourseInfo.duration !== event.target.value) {
          let typedCourseInfo = Object.assign({}, this.state.typedCourseInfo);
          typedCourseInfo.date = event.target.value;
          this.setState((state) => {return { typedCourseInfo }});
        }
        break;
      default: 
        break;
    }
    let inputArr = Object.values(this.state.typedCourseInfo);
    let countOfValidInputs = inputArr.reduce((acum, value) => {
      if (value.trim()) {
        acum += 1;
      }
      return acum;
    }, 0);
    let isFormValid = countOfValidInputs === 5;
    this.setState((state) => {return { isFormValid }});
    console.log(isFormValid, countOfValidInputs, inputArr.length, inputArr);
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
      let index = this.state.courses.reduce((acum, course, index) => {
        if (course.date === date && course.description === description) {
          acum = index;
        }
        return acum;
      }, 0);
      if (event.target.closest('div[class*=deleteButton]')) {
        let courses = [...this.state.courses];
        courses.splice(index, 1);
        this.setState({courses});
      }
      if (event.target.closest('div[class*=editButton]')) {
        this.setState({actionType: 'Edit', typedCourseInfo: this.state.courses[index], index});
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
    if (this.state.actionType === 'Add') {
      let courses = [...this.state.courses];
      let typedCourseInfo = Object.assign({}, this.state.typedCourseInfo);
      
      typedCourseInfo.date = typedCourseInfo.date.split('-');
      typedCourseInfo.date[0] = typedCourseInfo.date[0].slice(2);
      typedCourseInfo.date = typedCourseInfo.date.reverse().join('.');

      courses.push(typedCourseInfo);
      this.setState((state) => {
        return {
          courses,
          typedCourseInfo: {},
          actionType: null,
        }
      });
    }
    if (this.state.actionType === 'Edit') {
      let courses = [...this.state.courses];
      let typedCourseInfo = Object.assign({}, this.state.typedCourseInfo);
      courses[this.state.index] = typedCourseInfo;
      this.setState((state) => {
        return {
          courses,
          typedCourseInfo: {},
          index: null,
          actionType: null
        }
      });
    }
  }
  render() {
    console.log('App render:', this.props);
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
    actionTypeSetType: (type) => dispatch(actionTypeSetType(type)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);