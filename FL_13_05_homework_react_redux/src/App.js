import React from 'react';
import './App.css';

const COURSES = [
  { date: "18.02.18", name: "Prerequisites", description: "Webpack, AngularCLI, TypeScript.", duration: "1:34" },
  { date: "01.02.18", name: "Components", description: "Components; lifecicle, templete DSL and data-binding, Custom component.", duration: "2:10" },
  { date: "15.01.18", name: "Directives + Pipes", description: "Directives, types pf directives, built-in directives, custom directive, pipes, built-in pipes, custom pipes, async pipe...", duration: "1:34" },
  { date: "28.12.17", name: "Modules & Services", description: "Services, DI, modules, lazy Loading.", duration: "10:00" },
  // {date: '', name: '', description: '', duration: ''},
];

class CoursesRow extends React.Component {
  render() {
    const courses = this.props.courses;

    let durationFormat = courses.duration.split(':');
    if (durationFormat[0].length === 1) {
      durationFormat[0] = '0' + durationFormat[0];
    }
    let duration = durationFormat.join(':');

    return (
      <tr>
        <td>{courses.date}</td>
        <td>{courses.name}</td>
        <td>{courses.description}</td>
        <td>{duration}</td>
      </tr>
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
      <table>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">Learn React!</header>
      <CoursesTable courses={COURSES}/>
    </div>
    );
  }

export default App;

