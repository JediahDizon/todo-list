import { TodoActionType } from "../types";

// UTILS
import { notification } from "antd";
import _ from "lodash";

export default (state = getDefaultState(), action = {}) => {
	switch(action.type) {
		// Return the list from the action's payload
		case TodoActionType.LOAD_TODO_LIST_SUCCESS:
			return { data: action.payload, loading: false, error: null };

		// Return the list with the modified item from the action's payload
		case TodoActionType.SAVE_TODO_ITEM_SUCCESS:
			notification["success"]({
				message: "Saved",
				description:
					"Todo item was successfully saved",
			});
			// Replace the old item from the state's list with the payload of the action
			return {
				data: [..._.filter(state.data, a => a.id !== action.payload.id), action.payload],
				loading: false,
				error: null,
				saved: true
			};

		case TodoActionType.DELETE_TODO_ITEM_SUCCESS:
			notification["success"]({
				message: "Deleted",
				description:
					"Todo item was successfully deleted",
			});
			// Replace the old item from the state's list with the payload of the action
			return {
				data: _.filter(state.data, a => a.id !== action.payload.id),
				loading: false,
				error: null,
				saved: true
			};

		// Return the current state alongside the error from the action's payload
		case TodoActionType.LOAD_TODO_LIST_FAILURE:
		case TodoActionType.SAVE_TODO_ITEM_FAILURE:
			notification["error"]({
				message: "Uo oh...",
				description:
					`Todo item failed to save - ${action.error.message}`,
			});
			return { ...state, error: new Error(action.error), loading: false };

		// Return the current state with the loading set to true
		case TodoActionType.LOAD_TODO_LIST_LOADING:
		case TodoActionType.SAVE_TODO_ITEM_LOADING:
			return { ...state, loading: true, error: null };

		default:
			return state;
	}
};

function getDefaultState() {
	return {
		data: [],
		loading: false,
		error: null
	};
}