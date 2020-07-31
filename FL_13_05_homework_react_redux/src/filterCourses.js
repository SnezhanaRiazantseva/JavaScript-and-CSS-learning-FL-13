export default function filterCourses(searchText, courses) {
  return courses.filter(course => course.name.toLowerCase().includes(searchText.toLowerCase()));
}