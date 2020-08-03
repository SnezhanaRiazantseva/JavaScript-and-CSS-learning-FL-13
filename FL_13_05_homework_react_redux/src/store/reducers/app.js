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
} from "../actions/actionTypes";

let courses = JSON.parse(localStorage.getItem('courses'));

export const initialState = {
  courses: courses,
  searchText: '',
  isSearched: false,
  searchedCourses: [],
  actionType: null,
  typedCourseInfo: {},
  isFormValid: false,
  index: null
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BAR_NO_SEARCH:
      return {
        ...state, searchText: '', isSearched: false, searchedCourses: [],
      }
    case SEARCH_BAR_SET_STATE:
      return {
        ...state, searchText: action.searchText, isSearched: true, searchedCourses: action.searchedCourses
      }
    case ACTION_TYPE_SET_TYPE:
      return {
        ...state, actionType: action.actionType
      }
    case DELETE_COURSE:
      return {
        ...state, courses: action.courses
      }
    case OPEN_EDIT_COURSE_PAGE:
      return {
        ...state, typedCourseInfo: action.typedCourseInfo, index: action.index
      }
    case INPUT_UPDATE_COURSE_INFO:
      return {
        ...state, typedCourseInfo: action.typedCourseInfo
      }
    case CHECK_IS_FORM_VALID:
      return {
        ...state, isFormValid: action.isFormValid
      }
    case SUBMIT_ADD_COURSE:
      return {
        ...state, courses: action.courses, typedCourseInfo: {}, actionType: null
      }
    case SUBMIT_EDIT_COURSE:
      return {
        ...state, courses: action.courses, typedCourseInfo: {}, actionType: null, index: null
      }
    default:
      return state;
  }
}