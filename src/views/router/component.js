import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

// UTILS
import { Layout, Menu, List, Avatar } from "antd";
import "./style.css";
import _ from "lodash";

// PAGES
import { Home, PageTwo } from "app/views"

export default class extends Component {
	render() {
		return (
			<Router>
				<Layout style={{ minHeight: "100vh" }}>
					<Layout.Header className="header">
						{ this.renderNavLinks() }
					</Layout.Header>

					<Layout>
						<Layout.Content style={{ paddingTop: "100px" /* Compensate for the fixed header */ }}>
							<Route path="/" exact component={Home} />
							<Route path="/about/" component={PageTwo} />
						</Layout.Content>
					</Layout>
				</Layout>
			</Router>
		);
	}

	renderNavLinks() {
		const routeLinks = [
			{
				key: "home",
				to: "/",
				label: "Home"
			},
			{
				key: "about",
				to: "/about/",
				label: "About"
			}
		];

		return (
			<Menu
				theme="dark"
				mode="horizontal"
				style={{ lineHeight: "64px" }}
			>
				{
					_.map(routeLinks, link => (
						<Menu.Item key={link.key}>
							<NavLink to={link.to}>{link.label}</NavLink>
						</Menu.Item>
					))
				}
			</Menu>
		);
	}
}