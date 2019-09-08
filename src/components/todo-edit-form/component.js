import React, { PureComponent } from "react";

// UTILS
import { Form, Input, Button, DatePicker, Slider, Divider } from "antd";
import * as Colors from "@ant-design/colors";
import _ from "lodash";
import Moment from "moment";
import { TodoFactory } from "app/services";

export default Form.create({ name: "editTodo" })(
	class extends PureComponent {
		render() {
			const { getFieldDecorator, getFieldError } = this.props.form;
			let { data } = this.props;
			data = data || {};

			// Based on the status, we apply percentage value to the progress bar
			const statusProgress = {
				percent: 0,
				showInfo: false,
				color: Colors.blue.primary
			};
			switch(data.status) {
				case TodoFactory.statusTypes.IN_PROGRESS:
					statusProgress.percent = 50;
					break;

				case TodoFactory.statusTypes.COMPLETE:
					statusProgress.percent = 100;
					statusProgress.showInfo = true;
					statusProgress.color = Colors.green.primary
					break;

				default:
					statusProgress.percent = 0;
			};

			return (
				<Form onSubmit={e => e.preventDefault() || this.handleSubmit(e)}>
					<Form.Item validateStatus={getFieldError("name") ? "error" : ""} help={getFieldError("name") || ""} style={{ marginBottom: "10px" }}>
						{getFieldDecorator("name", {
							rules: [{ required: true, message: "Please provide a name" }],
							initialValue: data.name || null
						})(
							<Input
								placeholder="Name..."
							/>
						)}
					</Form.Item>

					<Form.Item validateStatus={getFieldError("description") ? "error" : ""} help={getFieldError("description") || ""} style={{ marginBottom: "10px" }}>
						{getFieldDecorator("description", {
							rules: [{ required: true, message: "Please provide a description" }],
							initialValue: data.description || null
						})(
							<Input.TextArea
								placeholder="Description..."
								autosize={{ minRows: 3, maxRows: 6 }}
							/>
						)}
					</Form.Item>

					<Form.Item validateStatus={getFieldError("estimate") ? "error" : ""} help={getFieldError("estimate") || ""} style={{ marginBottom: "10px" }}>
						{getFieldDecorator("estimate", {
							rules: [{ type: "object", required: true, message: "Please provide an estimate" }],
							initialValue: data.estimate ? Moment(data.estimate) : null
						})(
							<DatePicker
								showTime
								format="YYYY-MM-DD HH:mm:ss"
								placeholder="Estimate..."
								disabledDate={current => current && current < Moment().endOf("day")}
								style={{ minWidth: 0 /* For some reason, AntD has their date pickers have minWidth of 195px */ }}
							/>
						)}
					</Form.Item>

					<Form.Item style={{ margin: "0 20px" }}>
						{getFieldDecorator("status", {
							initialValue: statusProgress.percent || 0
						})(
							<Slider
								dots
								tooltipVisible={false}
								step={50}
								marks={{ 0: "Planned", 50: "In Progress", 100: "Complete"}}
							/>
						)}
					</Form.Item>

					<Form.Item style={{ margin: "10px 0 0 0", textAlign: "right" }}>
						<Button.Group>
							<Button type="primary" htmlType="submit">Save</Button>
							{ _.isFunction(this.props.onFail) && <Button type="outline" onClick={() => this.props.onFail(data)}>Fail Test</Button> }
						</Button.Group>
					</Form.Item>
				</Form>
			);
		}

		handleSubmit(e) {
			this.props.form.validateFields((err, values) => {
				if (!err) {
					// Considering the slider returns a number, we convert this number to its corresponding status enum
					let statusProgress = null;
					switch(values.status) {
						case 50:
							statusProgress = TodoFactory.statusTypes.IN_PROGRESS;
							break;

						case 100:
							statusProgress = TodoFactory.statusTypes.COMPLETE;
							break;

						default:
							statusProgress = TodoFactory.statusTypes.PLANNED;
					};

					const toSubmit = {
						...values,
						status: statusProgress
					};

					this.props.onSubmit(toSubmit);
				}
			});
		};
	}
)