import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Logout from "./components/users/Logout";

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
		return (
			<BrowserRouter>
				<div style={{ color: "white", textDecoration: "none" }}>
					{logout && (
						<div>
							<Link to="/user/register">Register</Link>
							<Link to="/user/login">Login</Link>
						</div>
					)}
					{login && (
						<div>
							<Link to="/user/logout">Logout</Link>
						</div>
					)}
				</div>
				<div>
					<Switch>
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
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
