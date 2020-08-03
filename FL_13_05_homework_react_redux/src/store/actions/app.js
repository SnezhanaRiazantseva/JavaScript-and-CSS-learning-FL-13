import {
  SEARCH_BAR_NO_SEARCH, 
  SEARCH_BAR_SET_STATE, 
  ACTION_TYPE_SET_TYPE,
  DELETE_COURSE,
  OPEN_EDIT_COURSE_PAGE,
  INPUT_UPDATE_COURSE_INFO,
  CHECK_IS_FORM_VALID,
  SUBMIT_ADD_COURSE,
  SUBMIT_EDIT_COURSE
} from '../actions/actionTypes';

export function searchBarNoSearch() {
  return {
    type: SEARCH_BAR_NO_SEARCH
  }
}

export function searchBarSetState(searchText, searchedCourses) {
  return {
    type: SEARCH_BAR_SET_STATE,
    searchText,
    searchedCourses
  }
}

export function actionTypeSetType(actionType) {
  return {
    type: ACTION_TYPE_SET_TYPE,
    actionType
  }
}

export function deleteCourse(courses) {
  return {
    type: DELETE_COURSE,
    courses
  }
}

export function openEditCoursePage(typedCourseInfo, index) {
  return {
    type: OPEN_EDIT_COURSE_PAGE,
    typedCourseInfo, 
    index
  }
}

export function inputUpdateCourseInfo(typedCourseInfo) {
  return {
    type: INPUT_UPDATE_COURSE_INFO,
    typedCourseInfo
  }
}

export function checkIsFormValid(isFormValid) {
  return {
    type: CHECK_IS_FORM_VALID,
    isFormValid
  }
}

export function submitAddCourse(courses) {
  return {
    type: SUBMIT_ADD_COURSE,
    courses
  }
}

export function submitEditCourse(courses) {
  return {
    type: SUBMIT_EDIT_COURSE,
    courses
  }
}