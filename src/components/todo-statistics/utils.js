// UTILS
import _ from "lodash";
import Moment from "moment";
import { TodoFactory } from "app/services";

export default {
	getCountByStatusTypes(items) {
		return _.map(TodoFactory.statusTypes, type => _.size(_.filter(items, { status: type })));
	},

	// Get the remaining hours excluding completed tasks
	getTotalHours(items) {
		items = _.filter(items, a => a.status !== TodoFactory.statusTypes.COMPLETE);
		let toReturn = 0;
		_.each(items, item => toReturn += Moment.duration(Moment(item.estimate).diff(Moment())).asHours());
		return toReturn;
	}
}