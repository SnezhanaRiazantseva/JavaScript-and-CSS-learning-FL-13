import React from 'react';
import classes from './App.module.css';
import CoursesPage from './containers/CoursesPage/CoursesPage';
import CourseCreationPage from './containers/CourseCreationPage/CourseCreationPage';

const COURSES = [
  { date: "18.02.18", name: "Prerequisites", description: "Webpack, Angular CLI, TypeScript.", duration: "1:34" },
  { date: "01.02.18", name: "Components", description: "Components; lifecicle, templete DSL and data-binding, Custom component.", duration: "2:10" },
  { date: "15.01.18", name: "Directives + Pipes", description: "Directives, types pf directives, built-in directives, custom directive, pipes, built-in pipes, custom pipes, async pipe...", duration: "1:34" },
  { date: "28.12.17", name: "Modules & Services", description: "Services, DI, modules, lazy Loading.", duration: "10:00" },
];

function addInitialStorage() {
  if (localStorage.getItem('courses')) {
    return;
  } else {
    localStorage.setItem('courses', JSON.stringify(COURSES));
  }
}
addInitialStorage();

let courses = JSON.parse(localStorage.getItem('courses'));

function filterCourses(searchText, courses) {
  return courses.filter(course => new RegExp(searchText, 'ig').test(course.name));
}

class App extends React.Component {
  state = {
    courses: courses,
    searchText: '',
    isSearched: false,
    searchedCourses: [],
    actionType: null,
    typedCourseInfo: {},
    isFormValid: false,
    index: null
  }
  
  onChangeHandler = event => {
    event.preventDefault();
    if (!event.target.value.trim()) {
      this.setState({
        searchText: '',
        isSearched: false,
        searchedCourses: [],
      })
      return;
    }
    this.setState({
      searchText: event.target.value,
      isSearched: true,
      searchedCourses: filterCourses(event.target.value, this.state.courses),
    })
  }

  onChangeCourseHandler = event => {
    event.preventDefault();
    switch (event.target.id) {
      case 'courseTitle':
        if (this.state.typedCourseInfo.name !== event.target.value) {
          let typedCourseInfo = Object.assign({}, this.state.typedCourseInfo);
          typedCourseInfo.name = event.target.value;
          this.setState({
            typedCourseInfo
          })
        }
        break;
      case 'courseDescription':
        if (this.state.typedCourseInfo.description !== event.target.value) {
          let typedCourseInfo = Object.assign({}, this.state.typedCourseInfo);
          typedCourseInfo.description = event.target.value;
          this.setState({
            typedCourseInfo
          })
        }
        break;
      case 'courseDuration':
        if (this.state.typedCourseInfo.duration !== event.target.value) {
          let typedCourseInfo = Object.assign({}, this.state.typedCourseInfo);
          typedCourseInfo.duration = event.target.value;
          this.setState({
            typedCourseInfo
          })
        }
        break;
      case 'courseAuthors':
        if (this.state.typedCourseInfo.duration !== event.target.value) {
          let typedCourseInfo = Object.assign({}, this.state.typedCourseInfo);
          typedCourseInfo.authors = event.target.value;
          this.setState({
            typedCourseInfo
          })
        }
        break;
      case 'courseDate':
        if (this.state.typedCourseInfo.duration !== event.target.value) {
          let typedCourseInfo = Object.assign({}, this.state.typedCourseInfo);
          typedCourseInfo.date = event.target.value;
          this.setState({
            typedCourseInfo
          })
        }
        break;
      default: 
        break;
    }

    let isFormValid = Object.values(this.state.typedCourseInfo).reduce((acum, value) => {
      if (value.trim()) {
        acum += 1;
      }
      return acum;
    }, 0) === 4;
    this.setState({ isFormValid });
    // console.log(isFormValid);
  }

  onClickDropdownHandler = event => {
    // event.preventDefault();
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
    if (this.state.actionType === null) {
      this.setState({actionType: 'Add'});
    }
  }

  onCancelClick = event => {
    event.preventDefault();
    this.setState({
      actionType: null
    });
  }

  onSubmitClick = event => {
    event.preventDefault();
    if (this.state.actionType === 'Add') {
      let courses = [...this.state.courses];
      let typedCourseInfo = Object.assign({}, this.state.typedCourseInfo);
      courses.push(typedCourseInfo);
      localStorage.courses = JSON.stringify(courses);
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
      localStorage.courses = JSON.stringify(courses);
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
    localStorage.courses = JSON.stringify(this.state.courses);
    return (
      <div 
        className={classes.App}
        onClick={event => this.onClickDropdownHandler(event)}
      >
        {
          !!this.state.actionType 
          ? <CourseCreationPage 
            typedCourseInfo={this.state.typedCourseInfo}
            actionType={this.state.actionType}
            onChangeCourseHandler={event => this.onChangeCourseHandler(event)}
            onCancelClick={event => this.onCancelClick(event)}
            onSubmitClick={event => this.onSubmitClick(event)}
            isFormValid={this.state.isFormValid}
          /> 
          : <CoursesPage 
            courses={this.state.courses} 
            searchText={this.state.searchText}
            isSearched={this.state.isSearched}
            searchedCourses={this.state.searchedCourses}
            actionType={this.state.actionType}
            onChange={event => this.onChangeHandler(event)}
            onButtonClick={event => this.onButtonClick(event)}
          />
        }
      </div>
    );
  }
}

export default App;