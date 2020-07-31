import COURSES from './coursesData'

export default function addInitialStorage() {
  if (localStorage.getItem('courses')) {
    return;
  } else {
    localStorage.setItem('courses', JSON.stringify(COURSES));
  }
}
