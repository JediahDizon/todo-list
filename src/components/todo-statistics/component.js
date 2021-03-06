import React, { PureComponent } from "react";

// UTILS
import { defaults, Doughnut } from "react-chartjs-2";
import { Card, List } from "antd";
import _ from "lodash";
import Utils from "./utils";

defaults.global.legend.display = false;

/**
 * TODO STATISTICS
 *
 * This is another dummy component that is only
 * responsible for displaying charts and graphs
 * of the necessary statistic needed by the client.
 *
 * One of these charts is the total number of hours
 * accumulated by the `estimate` property of the todo
 * item.
 */
export default class extends PureComponent {
	render() {
		const { data } = this.props;

		return (
			<div>
				<List
					grid={{ gutter: 20, column: 1 }}
					dataSource={[
						<Card title={`Total Hours: ${_.round(Utils.getTotalHours(data), 2)}`}>
						{ this.renderHoursByStatusType(data) }
						</Card>,

						<Card title={`Total Tasks: ${_.size(data)}`}>
						{ this.renderCountByStatusTypes(data) }
						</Card>
					]}
					renderItem={item => (
						<List.Item>
							{ item }
						</List.Item>
					)}
				/>
			</div>
		);
	}

	renderHoursByStatusType(data) {
		const dataMapping = Utils.getHoursByStatusType(data);

		return (
			<Doughnut
				data={{
					labels: _.chain(dataMapping).keys().map(a => _.startCase(a)).value(),
					datasets: [{
						data: _.values(dataMapping),
						backgroundColor: [
							"#e6f7ff",
							"#91d5ff",
							"#40a9ff",
							"#096dd9",
						]
					}]
				}}
				options={{
					legend: {
						display: true,
						position: "right"
					}
				}}
			/>
		)
	}

	renderCountByStatusTypes(data) {
		const dataMapping = Utils.getCountByStatusTypes(data);

		return (
			<Doughnut
				data={{
					labels: _.chain(dataMapping).keys().map(a => _.startCase(a)).value(),
					datasets: [{
						data: _.values(dataMapping),
						backgroundColor: [
							"#e6f7ff",
							"#91d5ff",
							"#40a9ff",
							"#096dd9",
						]
					}]
				}}
				options={{
					legend: {
						display: true,
						position: "right"
					}
				}}
			/>
		)
	}
}
