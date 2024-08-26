import type { Activity } from '../types';

// Type Reducer, this is the file that will contain the reducer for the activity
export type ActivityActions =
	| {
			type: 'save-activity';
			payload: { newActivity: Activity };
	  }
	| {
			type: 'set-activeId';
			payload: { id: Activity['id'] };
	  }
	| {
			type: 'delete-activeId';
			payload: { id: Activity['id'] };
	  }
	| {
			type: 'reset-activities';
	  };

const localStorageActivities = (): Activity[] => {
	const activities = localStorage.getItem('activities');
	return activities ? JSON.parse(activities) : [];
};
export type ActivityState = {
	activities: Activity[];
	activeId: Activity['id'];
};

// Initial State, this is the default state of the reducer when the application starts
export const initialState: ActivityState = {
	activities: localStorageActivities(),
	activeId: '',
};

// Reducer, this is the function that will change the state of the application
export const activityReducer = (
	state: ActivityState = initialState,
	action: ActivityActions
) => {
	if (action.type === 'save-activity') {
		// This is the action that will save the activity
		let updatedActivities: Activity[] = [];
		if (state.activeId) {
			updatedActivities = state.activities.map(activity =>
				activity.id === state.activeId ? action.payload.newActivity : activity
			);
		} else {
			updatedActivities = [...state.activities, action.payload.newActivity];
		}
		return {
			...state,
			activities: updatedActivities,
			activeId: '',
		};
	}

	if (action.type === 'set-activeId') {
		// This is the action that will set the active id
		return {
			...state,
			activeId: action.payload.id,
		};
	}

	if (action.type === 'delete-activeId') {
		// This is the action that will delete the active id
		return {
			...state,
			activities: state.activities.filter(activity => activity.id !== action.payload.id),
		};
	}

	if (action.type === 'reset-activities') {
		// This is the action that will reset the activities
		return {
			activities: [],
			activeId: '',
		};
	}
	return state;
};
