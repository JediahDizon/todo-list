import React, { PureComponent } from "react";
import { Card } from "antd";

/**
 * Error Boundary
 *
 * This is a React component that wraps rendered components inside
 * a boundary so that any errors that the rendered component throws will be
 * caught and thus prevents the entire application from crashing.
 */

export default class extends PureComponent {
	state = { error: null, errorInfo: null };

	componentDidCatch(error, errorInfo) {
		this.setState({
			error,
			errorInfo
		});
	}

	render() {
		const { error = {}, errorInfo = {} } = this.state;
		if(error) {
			return (
				<Card>
					<p style={{ marginBottom: 10 }}>{ error.message }</p>
				</Card>
			);
		}

		return this.props.children;
	}
}
