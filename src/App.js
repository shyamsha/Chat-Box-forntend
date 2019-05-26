import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Logout from "./components/users/Logout";
import Chat from "./components/Home/Chat";
import CreateChannel from "./components/Home/CreateChannel";
import ChannelList from "./components/Home/ChannelList";
import Home from "./components/Home/Home";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
//import "./App.css";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";

const styles = {
	root: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	}
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//login: false,
			//logout: false
		};
	}
	handleLogin = () => {
		this.setState(() => ({
			// login: true,
			// logout: false
		}));
	};
	handleLogout = () => {
		this.setState(() => ({
			// logout: true,
			// login: false
		}));
	};

	render() {
		let login = false;
		let logout = false;

		if (localStorage.getItem("token")) {
			login = true;
		} else {
			logout = true;
		}
		const { classes } = this.props;
		return (
			<BrowserRouter>
				<div>
					<AppBar className={classes.root}>
						<Toolbar position="static">
							<Link
								to="/"
								style={{
									color: "white",
									textDecoration: "none"
								}}
							>
								Home
							</Link>
							{logout && (
								<div>
									<Link
										to="/user/register"
										style={{
											color: "white",
											textDecoration: "none",
											marginLeft: "55rem"
										}}
									>
										Register
									</Link>
									{" | "}
									<Link
										to="/user/login"
										style={{
											color: "white",
											textDecoration: "none"
										}}
									>
										Login
									</Link>
								</div>
							)}
							{login && (
								<div>
									<Link
										to="/user/logout"
										style={{
											color: "white",
											textDecoration: "none",
											marginLeft: "55rem"
										}}
									>
										Logout
									</Link>
								</div>
							)}
						</Toolbar>
					</AppBar>
				</div>
				<br />
				<br />
				<br />
				<div>
					<Switch>
						<Route path="/" component={Chat} exact />
						<Route path="/channel/show/:id" component={Home} exact />
						<Route path="/user/register" component={Register} exact />
						<Route
							path="/user/login"
							render={props => {
								return (
									<Login {...props} handleLogin={this.handleLogin} exact />
								);
							}}
							exact
						/>
						<Route
							path="/user/logout"
							render={props => {
								return (
									<Logout {...props} handleLogout={this.handleLogout} exact />
								);
							}}
							exact
						/>

						<Route path="/user/createchannel" component={CreateChannel} exact />
						<Route path="/user/channellist" component={ChannelList} exact />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}
App.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
