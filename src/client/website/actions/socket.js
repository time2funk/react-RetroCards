import {
  ACTION_USER_CONNECT, ACTION_USER_SET_NAME,
  USER_CONNECT_SUCCESS, USER_CONNECT_FAILURE,
  USER_SET_NAME_SUCCESS, USER_SET_NAME_FAILURE
} from './user';
import {
  ACTION_RETRO,
  ACTION_RETRO_JOIN, ACTION_RETRO_LEAVE, ACTION_RETRO_NEW, ACTION_RETRO_EDIT,
  RETRO_JOIN_FAILURE, RETRO_JOIN_SUCCESS, RETRO_LEAVE,
  RETRO_NEW_FAILURE, RETRO_NEW_SUCCESS, RETRO_RECEIVED,
  RETRO_EDIT_SUCCESS, RETRO_EDIT_FAILURE
} from './retro';
import {
  ACTION_COLUMN_ADD, ACTION_COLUMN_EDIT, ACTION_COLUMN_REMOVE,
  COLUMN_ADD_FAILURE, COLUMN_ADD_SUCCESS,
  COLUMN_EDIT_FAILURE, COLUMN_EDIT_SUCCESS,
  COLUMN_REMOVE_FAILURE, COLUMN_REMOVE_SUCCESS
} from './column';
import {
  ACTION_CARD_ADD, ACTION_CARD_EDIT, ACTION_CARD_REMOVE, ACTION_CARD_MOVE,
  CARD_ADD_FAILURE, CARD_ADD_SUCCESS,
  CARD_EDIT_FAILURE, CARD_EDIT_SUCCESS,
  CARD_REMOVE_FAILURE, CARD_REMOVE_SUCCESS,
  CARD_MOVE_FAILURE, CARD_MOVE_SUCCESS
} from './card';
import {
  ACTION_STEPS_CHANGE, STEPS_CHANGE_SUCCESS, STEPS_CHANGE_FAILURE
} from './steps';

export const socketActions = {
  [ACTION_USER_CONNECT]: [USER_CONNECT_SUCCESS, USER_CONNECT_FAILURE],
  [ACTION_USER_SET_NAME]: [USER_SET_NAME_SUCCESS, USER_SET_NAME_FAILURE],
  [ACTION_COLUMN_ADD]: [COLUMN_ADD_SUCCESS, COLUMN_ADD_FAILURE],
  [ACTION_COLUMN_EDIT]: [COLUMN_EDIT_SUCCESS, COLUMN_EDIT_FAILURE],
  [ACTION_COLUMN_REMOVE]: [COLUMN_REMOVE_SUCCESS, COLUMN_REMOVE_FAILURE],
  [ACTION_CARD_ADD]: [CARD_ADD_SUCCESS, CARD_ADD_FAILURE],
  [ACTION_CARD_EDIT]: [CARD_EDIT_SUCCESS, CARD_EDIT_FAILURE],
  [ACTION_CARD_REMOVE]: [CARD_REMOVE_SUCCESS, CARD_REMOVE_FAILURE],
  [ACTION_CARD_MOVE]: [CARD_MOVE_SUCCESS, CARD_MOVE_FAILURE],
  [ACTION_RETRO_NEW]: [RETRO_NEW_SUCCESS, RETRO_NEW_FAILURE],
  [ACTION_RETRO_EDIT]: [RETRO_EDIT_SUCCESS, RETRO_EDIT_FAILURE],
  [ACTION_RETRO_JOIN]: [RETRO_JOIN_SUCCESS, RETRO_JOIN_FAILURE],
  [ACTION_RETRO_LEAVE]: RETRO_LEAVE,
  [ACTION_RETRO]: RETRO_RECEIVED,
  [ACTION_STEPS_CHANGE]: [STEPS_CHANGE_SUCCESS, STEPS_CHANGE_FAILURE]
};

export default socketActions;
