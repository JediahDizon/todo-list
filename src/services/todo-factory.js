// UTILS
import _ from "lodash";
import Moment from "moment";

const statusTypes = {
	PLANNED: "Planned",
	IN_PROGRESS: "InProgress",
	COMPLETE: "Complete"
};

const sampleData = [
	{
		id: -1,
		name: "Test",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		status: statusTypes.PLANNED,
		estimate: _.random(1, 10),
		timestamp: Moment().subtract(_.random(1, 50), "hours").format()
	},
	{
		id: -2,
		name: "Test 2",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		status: statusTypes.IN_PROGRESS,
		estimate: _.random(1, 10),
		timestamp: Moment().subtract(_.random(1, 50), "hours").format()
	},
	{
		id: -3,
		name: "Test 3",
		description: "Lorem ipsum dolor sit amet",
		status: statusTypes.COMPLETE,
		estimate: _.random(1, 10),
		timestamp: Moment().subtract(_.random(1, 50), "hours").format()
	}
];

export default {
	statusTypes,

	getTodoList: () => {
		return new Promise(resolve => setTimeout(resolve, _.random(100, 1500)))
		.then(() => sampleData);
	},

	saveTodo: toSave => {
		return new Promise(resolve => setTimeout(resolve, _.random(100, 1500)))
		.then(() => {
			return {
				id: Math.random(), // Due to the "simplicity" nature of this app, we assign a random number as the ID instead of a proper UUID to keep the library count at minimum
				...toSave
			};
		});
	},

	deleteTodo: id => {
		return new Promise(resolve => setTimeout(resolve, _.random(100, 1500)))
		.then(() => {
			return { id };
		});
	},

	saveTodoFailTest: toSave => {
		return new Promise((resolve, reject) => setTimeout(() => reject(new Error("Save fail test successful")), _.random(100, 1500)));
	}
}