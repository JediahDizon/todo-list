import { TodoActionType } from "../types";

// UTILS
import _ from "lodash";
import { TodoFactory } from "app/services";

/**
 * GET TODO LIST
 *
 * Gets the list of Todo items from the TodoFactory
 * service.
 *
 * @return {object} - The list of todos.
 */
export function getTodoList() {
	return async dispatch => {
		dispatch({
			type: TodoActionType.LOAD_TODO_LIST_LOADING
		});

		try {
			const TodoList = await TodoFactory.getTodoList();
			if(_.isNil(TodoList)) {
				return dispatch({
					type: TodoActionType.LOAD_TODO_LIST_FAILURE,
					error: new Error("Cannot get the list of todos.")
				});
			}

			dispatch({
				type: TodoActionType.LOAD_TODO_LIST_SUCCESS,
				payload: TodoList
			});
		} catch(error) {
			dispatch({
				type: TodoActionType.LOAD_TODO_LIST_FAILURE,
				error
			});
		}
	};
}

/**
 * SAVE TODO
 *
 * Saves the provided todo item to the TodoFactory service.
 *
 * @return {object} - The list of todos.
 */
export function saveTodo(toSave) {
	return async dispatch => {
		dispatch({
			type: TodoActionType.SAVE_TODO_ITEM_LOADING
		});

		try {
			const savedItem = await TodoFactory.saveTodo(toSave);

			dispatch({
				type: TodoActionType.SAVE_TODO_ITEM_SUCCESS,
				payload: savedItem
			});
		} catch(error) {
			dispatch({
				type: TodoActionType.SAVE_TODO_ITEM_FAILURE,
				error
			});
		}
	};
}

/**
 * DELETE TODO
 *
 * Deletes the todo from the store which contains the same
 * ID as the parameterized string
 *
 * @param {string} - The ID of the todo-item to delete
 * @return {object} - The item that was deleted.
 */
export function deleteTodo(todoId) {
	return async dispatch => {
		dispatch({
			type: TodoActionType.SAVE_TODO_ITEM_LOADING
		});

		try {
			const deletedItem = await TodoFactory.deleteTodo(todoId);

			dispatch({
				type: TodoActionType.DELETE_TODO_ITEM_SUCCESS,
				payload: deletedItem
			});
		} catch(error) {
			dispatch({
				type: TodoActionType.SAVE_TODO_ITEM_FAILURE,
				error
			});
		}
	};
}

export function saveTodoFailTest(toSave) {
	return async dispatch => {
		dispatch({
			type: TodoActionType.SAVE_TODO_ITEM_LOADING
		});

		try {
			await TodoFactory.saveTodoFailTest(toSave);
		} catch(error) {
			dispatch({
				type: TodoActionType.SAVE_TODO_ITEM_FAILURE,
				error
			});
		}
	};
}