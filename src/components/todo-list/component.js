import React, { PureComponent } from "react";

// UTILS
import { Icon, List, Popconfirm } from "antd";
import * as Colors from "@ant-design/colors";
import Moment from "moment";
import _ from "lodash";
import { TodoFactory } from "app/services";

/**
 * Error Boundary
 *
 * This is a React component that wraps rendered components inside
 * a boundary so that any errors that the rendered component throws will be
 * caught and thus prevents the entire application from crashing.
 */

export default class extends PureComponent {
	/**
	 * TODO LIST
	 *
	 * This dummy (non-redux connected) component is only responsible for
	 * fislpaying a list of Todo items. It calls back a function whenever
	 * it get its "Edit" button triggered, so no modal is going to be
	 * found here, instead, it's going to be found by the parent.
	 */

	render() {
		const { data, renderEmptyList } = this.props;
		const sanitizedData = _.compact(data);

		if(renderEmptyList && _.isArray(sanitizedData) && _.isEmpty(sanitizedData)) return renderEmptyList;

		return (
			<div>
					<List
						dataSource={sanitizedData}
						renderItem={item => {
							// Based on the status, we apply percentage value to the progress bar
							const statusProgress = {
								status: "Planned",
								percent: 0,
								showInfo: false,
								color: Colors.white,
								icon: "clock-circle"
							};
							switch(item.status) {
								case TodoFactory.statusTypes.IN_PROGRESS:
									statusProgress.status = "In Progress";
									statusProgress.percent = 50;
									statusProgress.color = Colors.blue.primary;
									statusProgress.icon = "info-circle";
									break;

								case TodoFactory.statusTypes.COMPLETE:
									statusProgress.status = "Complete";
									statusProgress.percent = 100;
									statusProgress.showInfo = true;
									statusProgress.color = Colors.green.primary
									statusProgress.icon = "check-circle";
									break;

								default:
									statusProgress.percent = 0;
							};

							return (
								<List.Item
									actions={[
										<Icon type="edit" onClick={event => this.props.onEdit(item) || event.stopPropagation()} />,
										<Popconfirm
											title="Delete this item? This action cannot be undone."
											onConfirm={event => this.props.onDelete(item.id) || event.stopPropagation()}
										>
											<Icon type="close" />
										</Popconfirm>

									]}
								>
									<List.Item.Meta
										title={(
											<span style={{ fontSize: "1.5em", wordWrap: "break-word" }}>
												<Icon type={statusProgress.icon} theme="filled" style={{ color: statusProgress.color }} /> { item.name }
											</span>
										)}
										description={(
											<div>
												<p style={{ whiteSpace: "pre-line" }}>{ item.description }</p>
												<sub>Estimate: { item.estimate } hours</sub>
											</div>
										)}
									/>
								</List.Item>
							);
						}}
					/>
			</div>
		);
	}
}