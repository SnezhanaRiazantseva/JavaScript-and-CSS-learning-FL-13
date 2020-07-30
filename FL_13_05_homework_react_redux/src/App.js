import React from 'react';
import classes from './App.module.css';
import CoursesPage from './containers/CoursesPage/CoursesPage';
import CourseCreationPage from './containers/CourseCreationPage/CourseCreationPage';
// import Button from './components/Button/Button'
// import editIcon from './edit.svg';
// import deleteIcon from "./delete.svg";

const COURSES = [
  { date: "18.02.18", name: "Prerequisites", description: "Webpack, Angular CLI, TypeScript.", duration: "1:34" },
  { date: "01.02.18", name: "Components", description: "Components; lifecicle, templete DSL and data-binding, Custom component.", duration: "2:10" },
  { date: "15.01.18", name: "Directives + Pipes", description: "Directives, types pf directives, built-in directives, custom directive, pipes, built-in pipes, custom pipes, async pipe...", duration: "1:34" },
  { date: "28.12.17", name: "Modules & Services", description: "Services, DI, modules, lazy Loading.", duration: "10:00" },
  // {date: '', name: '', description: '', duration: ''},
];

function filterCourses(searchText, courses) {
  return courses.filter(course => new RegExp(searchText, 'ig').test(course.name));
}

class App extends React.Component {
  state = {
    courses: COURSES,
    searchText: '',
    isSearched: false,
    searchedCourses: [],
    actionType: null,
    typedCourseInfo: ''
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

  onClickDropdownHandler = event => {
    event.preventDefault();
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
      if (event.target.closest('div[class*=deleteButton]')) {
        let date = event.target.closest('div[class*=CourseRowWrapper]').querySelector('div:nth-child(1)').innerHTML;
        let description = event.target.closest('div[class*=CourseRowWrapper]').querySelector('div:nth-child(3)').innerHTML;
        let index = this.state.courses.reduce((acum, course, index) => {
          if (course.date === date && course.description === description) {
            acum = index;
          }
          return acum;
        }, 0);
        let courses = [...this.state.courses];

        courses.splice(index, 1);
        this.setState({courses});
      }
      if (event.target.closest('div[class*=editButton]')) {
        this.setState({actionType: 'edit'});
      }
    } else {
      let dropdownArr = document.querySelectorAll('div[class*=DropdownMenu]');
      for (let dropdownElem of dropdownArr) {
        dropdownElem.hidden = true;
      }
    }
  }

  render() {
    return (
      <div 
        className={classes.App}
        onClick={event => this.onClickDropdownHandler(event)}
      >
        {
          !!this.state.actionType 
          ? <CourseCreationPage course={this.state.typedCourseInfo} /> 
          : <CoursesPage 
            courses={this.state.courses} 
            searchText={this.state.searchText}
            isSearched={this.state.isSearched}
            searchedCourses={this.state.searchedCourses}
            actionType={this.state.actionType}
            onChange={event => this.onChangeHandler(event)}
            // onClickDropdownHandler={event => this.onClickDropdownHandler(event)}
          />
        }
      </div>
    );
  }
}

export default App;

// class OptionsDropdown extends React.Component {
//   render() {
//     return (
//       <div className="dropdown">
//         <div className="editButton">
//           <img src={editIcon} alt="Edit icon" className="editIcon" />
//           <span>Edit</span>
//         </div>
//         <div className="deleteButton">
//           <img src={deleteIcon} alt="Delete icon" className="deleteIcon" />
//           <span>Delete</span>
//         </div>
//       </div>
//     );
//   }
// }

// class CoursesRow extends React.Component {
//   render() {
//     const courses = this.props.courses;

//     let durationFormat = courses.duration.split(':');
//     if (durationFormat[0].length === 1) {
//       durationFormat[0] = '0' + durationFormat[0];
//     }
//     durationFormat[0] = durationFormat[0] + 'h';
//     durationFormat[1] = durationFormat[1] + 'min';
//     let duration = durationFormat.join(' ');

//     return (
//       <div className="courseRow">
//         <div className="course">{courses.date}</div>
//         <div className="course courseName">{courses.name}</div>
//         <div className="course">{courses.description}</div>
//         <div className="course">{duration}</div>
//         <div className="course datacellDropdown"> 
//           <div className="menuDots">&#183; &#183; &#183;</div>
//           <OptionsDropdown/> 
//         </div>
//       </div>
//     )
//   }
// }

// class CoursesTable extends React.Component {
//   render() {
//     let rows = [];
//     this.props.courses.forEach((course, index) => {
//       rows.push(
//         <CoursesRow 
//           courses={course} 
//           key={course.name + index} />
//       )
//     })
//     return (
//       <div className="coursesTable">
//         {rows}
//       </div>
//     )
//   }
// }

// class SearchBar extends React.Component {
//   render() {
//     return(
//       <input className="searchBar" type="search" placeholder="&#128269; &#8195;Search" />
//     )
//   }
// }

// class Button extends React.Component {
//   render() {
//     return(
//       <button className="button">Add course</button>
//     )
//   }
// }

// class CoursesPage extends React.Component {
//   render() {
//     return(
//       <div className="coursesPage">
//         <div className="barWrapper">
//           <SearchBar/>
//           <Button/>
//         </div>
//         <CoursesTable courses={COURSES}/>
//       </div>
//     )
//   }
// }

// class CourseForm extends React.Component {
//   render() {
//     let dateValue = "fromState";
//     return(
//       <form className="courseCreationForm">
//         <div className="mainInfoWrapper">
//           <label htmlFor="courseTitle">Title</label>
//           <input type="text" id="courseTitle" required></input>
//           <br/>
//           <label htmlFor="courseDescription">Description</label>
//           <textarea rows="10" id="courseDescription" required></textarea>
//         </div>
//         <div className="secondaryInfoWrapper">
//           <div className="infoWrapper">
//             <label htmlFor="courseDuration">Duration</label>
//             <input type="text" id="courseDuration" required></input>
//             <label htmlFor="courseAuthors">Authors</label>
//             <input type="text" id="courseAuthors" required></input>
//           </div>
//           <div className="dateWrapper">
//             <div className="dateInfoWrapper">
//               <label htmlFor="courseDate">Date</label>
//               <span>{dateValue}</span>
//             </div>
//             <input type="date" id="courseDate" required></input>
//           </div>
//         </div>
//         <div className="buttonsWrapper">
//           <Button/>
//           <input type="reset" value="Cancel"/>
//         </div>
//       </form>
//     );
//   }
// }

// class CourseCreationPage extends React.Component {
//   render() {
//     return(
//       <div className="courseCreationPage">
//         <h1>... course</h1>
//         <CourseForm />
//       </div>
//     );
//   }
// }

// class App extends React.Component {
//   render() {
//     return (
//       <div className="App"> 
//       {/* delete this div? */}
//         <CoursesPage/>
//         {/* <CourseCreationPage /> */}
//       </div>
//       );
//   }
// }

// export default App;

