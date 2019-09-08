import React, { PureComponent } from "react";

// UTILS
import { defaults, Doughnut } from "react-chartjs-2";
import { Statistic, Card } from "antd";
import _ from "lodash";
import { TodoFactory } from "app/services";
import Utils from "./utils";
import Moment from "moment";

defaults.global.legend.display = false;

export default class extends PureComponent {
	render() {
		const { data } = this.props;

		const totalhours = Utils.getTotalHours(data);
		return (
			<div>
				<Card title={(<Statistic.Countdown title="Total Hours Remaining" value={Moment().add(totalhours, "hours")} format="HH:mm:ss" />)}>
				{ this.renderCountByStatusTypes(data) }
				</Card>
			</div>
		);
	}

	renderCountByStatusTypes(data) {
		return (
			<Doughnut
				data={{
					labels: _.map(TodoFactory.statusTypes, a => _.startCase(a)),
					datasets: [{
						data: Utils.getCountByStatusTypes(data),
						backgroundColor: [
							"#e6f7ff",
							"#91d5ff",
							"#40a9ff",
							"#096dd9",
						]
					}]
				}}
			/>
		)
	}
}
