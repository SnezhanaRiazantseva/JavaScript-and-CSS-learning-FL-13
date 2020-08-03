import {
  SEARCH_BAR_NO_SEARCH, 
  SEARCH_BAR_SET_STATE, 
  ACTION_TYPE_SET_TYPE
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

