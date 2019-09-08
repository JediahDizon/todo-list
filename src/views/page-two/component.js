import React, { Component } from "react";

// UTILS
import { Card, Icon } from "antd";
import _ from "lodash";

export default class extends Component {
	render() {
		const externalLinks = [
			{
				key: "github",
				label: "github",
				icon: "github",
				onClick: () => window.open("https://github.com/JediahDizon", "_blank")
			},
			{
				key: "linkedin",
				label: "linkedin",
				icon: "linkedin",
				onClick: () => window.open("https://www.linkedin.com/in/jediahdizon/", "_blank")
			}
		]
		return (
			<Card
				title="This application was made by"
				style={{ width: "100%", maxWidth: "300px", margin: "auto" }}
				cover={<img alt="profile" src="https://avatars2.githubusercontent.com/u/14999533?s=460&v=4" />}
				actions={_.map(externalLinks, a => <Icon type={a.icon} key={a.key} onClick={a.onClick} theme="filled" />)}
			>
				<Card.Meta title="Jediah Dizon" description="Developer" />
			</Card>
		);
	}
}
