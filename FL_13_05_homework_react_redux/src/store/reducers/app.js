import { 
  SEARCH_BAR_NO_SEARCH, 
  SEARCH_BAR_SET_STATE, 
  ACTION_TYPE_SET_TYPE 
} from "../actions/actionTypes";
// import addInitialStorage from "../../addInitialStorage";

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
  // addInitialStorage();
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
    default:
      return state;
  }
}