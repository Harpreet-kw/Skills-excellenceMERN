import { FIFTH_STEP, FIRST_STEP, FOURTH_STEP, SECOND_STEP, THIRD_STEP } from "./types";

export const firstStep = (data) => (dispatch) => {
    dispatch({
        type: FIRST_STEP,
        payload: data
    })
  };
export const secondStep = (data) => (dispatch) => {
    dispatch({
        type: SECOND_STEP,
        payload: data
    })
  };
export const thirdStep = (data) => (dispatch) => {
    dispatch({
        type: THIRD_STEP,
        payload: data
    })
  };
export const fourthStep = (data) => (dispatch) => {
    dispatch({
        type: FOURTH_STEP,
        payload: data
    })
  };
export const fifthStep = (data) => (dispatch) => {
    dispatch({
        type: FIFTH_STEP,
        payload: data
    })
  };