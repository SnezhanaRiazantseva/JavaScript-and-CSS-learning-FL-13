import React from 'react';
import './App.css';
import editIcon from './edit.svg';
import deleteIcon from "./delete.svg";

const COURSES = [
  { date: "18.02.18", name: "Prerequisites", description: "Webpack, Angular CLI, TypeScript.", duration: "1:34" },
  { date: "01.02.18", name: "Components", description: "Components; lifecicle, templete DSL and data-binding, Custom component.", duration: "2:10" },
  { date: "15.01.18", name: "Directives + Pipes", description: "Directives, types pf directives, built-in directives, custom directive, pipes, built-in pipes, custom pipes, async pipe...", duration: "1:34" },
  { date: "28.12.17", name: "Modules & Services", description: "Services, DI, modules, lazy Loading.", duration: "10:00" },
  // {date: '', name: '', description: '', duration: ''},
];

class OptionsDropdown extends React.Component {
  render() {
    return (
      <div className="dropdown">
        <div className="editButton">
          <img src={editIcon} alt="Edit icon" className="editIcon" />
          <span>Edit</span>
        </div>
        <div className="deleteButton">
          <img src={deleteIcon} alt="Delete icon" className="deleteIcon" />
          <span>Delete</span>
        </div>
      </div>
    );
  }
}

class CoursesRow extends React.Component {
  render() {
    const courses = this.props.courses;

    let durationFormat = courses.duration.split(':');
    if (durationFormat[0].length === 1) {
      durationFormat[0] = '0' + durationFormat[0];
    }
    durationFormat[0] = durationFormat[0] + 'h';
    durationFormat[1] = durationFormat[1] + 'min';
    let duration = durationFormat.join(' ');

    return (
      <div className="courseRow">
        <div className="course">{courses.date}</div>
        <div className="course courseName">{courses.name}</div>
        <div className="course">{courses.description}</div>
        <div className="course">{duration}</div>
        <div className="course datacellDropdown"> 
          <div className="menuDots">&#183; &#183; &#183;</div>
          <OptionsDropdown/> 
        </div>
      </div>
    )
  }
}

class CoursesTable extends React.Component {
  render() {
    let rows = [];
    this.props.courses.forEach((course, index) => {
      rows.push(
        <CoursesRow 
          courses={course} 
          key={course.name + index} />
      )
    })
    return (
      <div className="coursesTable">
        {rows}
      </div>
    )
  }
}

class SearchBar extends React.Component {
  render() {
    return(
      <input className="searchBar" type="search" placeholder="&#128269; &#8195;Search" />
    )
  }
}

class Button extends React.Component {
  render() {
    return(
      <button className="button">Add course</button>
    )
  }
}

class CoursesPage extends React.Component {
  render() {
    return(
      <div className="coursesPage">
        <div className="barWrapper">
          <SearchBar/>
          <Button/>
        </div>
        <CoursesTable courses={COURSES}/>
      </div>
    )
  }
}

class CourseForm extends React.Component {
  render() {
    let dateValue = "fromState";
    return(
      <form className="courseCreationForm">
        <div className="mainInfoWrapper">
          <label htmlFor="courseTitle">Title</label>
          <input type="text" id="courseTitle" required></input>
          <br/>
          <label htmlFor="courseDescription">Description</label>
          <textarea rows="10" id="courseDescription" required></textarea>
        </div>
        <div className="secondaryInfoWrapper">
          <div className="infoWrapper">
            <label htmlFor="courseDuration">Duration</label>
            <input type="text" id="courseDuration" required></input>
            <label htmlFor="courseAuthors">Authors</label>
            <input type="text" id="courseAuthors" required></input>
          </div>
          <div className="dateWrapper">
            <div className="dateInfoWrapper">
              <label htmlFor="courseDate">Date</label>
              <span>{dateValue}</span>
            </div>
            <input type="date" id="courseDate" required></input>
          </div>
        </div>
        <div className="buttonsWrapper">
          <Button/>
          <input type="reset" value="Cancel"/>
        </div>
      </form>
    );
  }
}

class CourseCreationPage extends React.Component {
  render() {
    return(
      <div className="courseCreationPage">
        <h1>... course</h1>
        <CourseForm />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App"> 
      {/* delete this div? */}
        {/* <CoursesPage/> */}
        <CourseCreationPage />
      </div>
      );
  }
}

export default App;

