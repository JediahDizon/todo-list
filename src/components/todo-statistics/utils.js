// UTILS
import _ from "lodash";
import Moment from "moment";
import { TodoFactory } from "app/services";

export default {
	getCountByStatusTypes(items) {
		const toReturn = {};
		_.each(items, a => toReturn[a.status] = [...toReturn[a.status] || [], a]);
		_.each(toReturn, (value, key) => toReturn[key] = _.size(value));
		return toReturn;
	},

	getTotalHours(items) {
		return _.chain(items).map("estimate").sum().value();
	},

	getHoursByStatusType(items) {
		const toReturn = {};
		_.each(items, a => toReturn[a.status] = [...toReturn[a.status] || [], a]);
		_.each(toReturn, (value, key) => toReturn[key] = _.sum(_.map(value, "estimate")));
		return toReturn;
	}
}