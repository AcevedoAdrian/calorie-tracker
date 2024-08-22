import type { Activity } from '../types';

// Type Reducer, this is the file that will contain the reducer for the activity
export type ActivityActions = {
	type: 'save-activity';
	payload: { newActivity: Activity };
};

type ActivityState = {
	activities: Activity[];
};

// Initial State, this is the default state of the reducer when the application starts
export const initialState: ActivityState = {
	activities: [],
};

// Reducer, this is the function that will change the state of the application
export const activityReducer = (
	state: ActivityState = initialState,
	action: ActivityActions
) => {
	if (action.type === 'save-activity') {
		// This is the action that will save the activity

		return {
			...state,
			activities: [...state.activities, action.payload.newActivity],
		};
	}
	return state;
};
