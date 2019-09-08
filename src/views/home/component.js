import React, { Component } from "react";

// COMPONENTS
import { Layout, Menu, Button, Spin, Modal, Divider, Collapse } from "antd";
import _ from "lodash";
import { TodoList, TodoEditForm, TodoStatistics } from "app/components";
import Moment from "moment";

export default class extends Component {
	state = {
		editModal: {
			visible: false,
			data: null,
			error: null
		}
	};

	componentDidMount() {
		// Upon changing screen sizes, rerender the layout of the page accordingly
		const handleResize = () => this.setState({});
		window.addEventListener("resize", handleResize);
	}

	render() {
		const { Todo } = this.props;
		const { editModal } = this.state;

		// Sort the list by their ID
		Todo.data = _.orderBy(Todo.data, a => Moment(a.timestamp), ["desc"]);

		// Responsiveness
		const isMobile = window.innerWidth <= 600;

		return (
			<Spin spinning={Todo.loading}>
				<div style={{ width: "100%", margin:"auto", padding: "0 20px", maxWidth: "800px" }}>
					<Layout style={{ padding: "20px 0", background: "#fff" }}>
					{
						isMobile ? (
							<Layout style={{ background: "#fff", marginBottom: "20px" }} width={275}>
								{ this.renderCompactDashboard() }
							</Layout>
							) : (
								<Layout.Sider style={{ background: "#fff" }} width={275}>
									{ this.renderDashboard() }
								</Layout.Sider>
							)
					}
						<Layout.Content style={{ padding: "0 24px", minHeight: 280 }}>
							<Layout.Content style={{ padding: "0 24px", minHeight: 280 }}>
								<TodoList
									data={Todo.data}
									onEdit={toEdit => this.openEditModal(toEdit)}
									onSave={toSave => this.props.saveTodo(toSave)}
									onDelete={todoId => this.props.deleteTodo(todoId)}
									renderEmptyList={(
										<div>
											<h3>Empty</h3>
											<sub>Your To-do list is empty. <br />Click the button below to geenrate a list.</sub>

											<h5>
												<Button
													type="outline"
													onClick={() => this.props.getTodoList()}
													style={{ marginTop: 10 }}
												>
													Generate List
												</Button>
											</h5>
										</div>
									)}
									/>
							</Layout.Content>
						</Layout.Content>
					</Layout>
				</div>

				<Modal
					title="Edit"
					visible={editModal.visible}
					footer={null}
					onCancel={() => this.closeEditModal()}
				>
					{ this.state.editModal.render }
				</Modal>
			</Spin>
		);
	}


	renderCompactDashboard() {
		const { Todo } = this.props;
		return (
			<div>
				<div style={{ padding: "0 20px", marginBottom: "20px" }}><TodoEditForm key={_.size(Todo.data)} onSubmit={toSave => this.props.saveTodo(toSave)} /></div>
				{
					_.size(Todo.data) > 0 && (
						<Collapse bordered={false}>
							<Collapse.Panel header="Statistics" key="1"><TodoStatistics data={Todo.data} /></Collapse.Panel>
						</Collapse>
					)
				}
			</div>
		);
	}

	renderDashboard() {
		const { Todo } = this.props;
		return (
			<Menu mode="inline">
				<div style={{ padding: "0 20px", marginBottom: "20px" }}><TodoEditForm key={_.size(Todo.data)} onSubmit={toSave => this.props.saveTodo(toSave)} /></div>
				{
					_.size(Todo.data) > 0 && <div key="0" style={{ padding: "0 20px" }}><TodoStatistics data={Todo.data} /></div>
				}
			</Menu>
		);
	}

	openEditModal(toEdit) {
		this.setState({
			editModal: {
				...this.state.editModal,
				visible: true,
				render: (
					<TodoEditForm
						key={Math.random() /* So a unique form instance generates everytime the modal opens */}
						data={toEdit}
						onSubmit={toSave => this.closeEditModal() || this.props.saveTodo({...toEdit, ...toSave})}
					/>
				),
				error: null
			}
		});
	}

	closeEditModal() {
		this.setState({
			editModal: {
				...this.state.editModal,
				visible: false,
				error: null
			}
		})
	}
}
