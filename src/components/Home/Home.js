import React, { Component } from "react";
import axios from "../../config/config";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import decode from "jwt-decode";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";

import { withStyles } from "@material-ui/core/styles";

import Icon from "@material-ui/core/Icon";
const userId = localStorage.getItem("token");
const decoded = decode(userId);
const styles = theme => ({
	button: {
		margin: theme.spacing.unit
	},
	leftIcon: {
		marginRight: theme.spacing.unit
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	iconSmall: {
		fontSize: 20
	}
});

const io = require("socket.io-client");
const socket = io("http://localhost:3001");

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
			messages: [],
			channel: {},
			users: [],
			url: ""
		};
		socket.on("connect", () => {
			console.log("connected front end");
		});
		// this.socket = io("localhost:3001");
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		console.log(this.props);
		let self = this;
		axios
			.get(`/channels/${id}`, {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				const channelData = response.data;
				socket.emit("JOIN_ROOM", { channel: id });
				self.setState(() => ({
					channel: channelData,
					messages: channelData.messages,
					users: channelData.channelUsers
					// url: "http://localhost:3000" + this.props.match.url
				}));
			});
		socket.on("RECEIVE_MESSAGE", data => {
			let messages = self.state.messages;

			messages.push(data);
			self.setState({ messages });
		});
	}

	msgHandle = e => {
		e.persist();
		this.setState(() => ({ message: e.target.value }));
	};

	sendHandle = e => {
		const userId = localStorage.getItem("token");
		const decoded = decode(userId);
		e.preventDefault();
		socket.emit("SEND_MESSAGE", {
			message: this.state.message,
			user: decoded.user_id,
			channel: this.props.match.params.id
		});
		let msg = [];
		// this.setState(() => ({
		// 	messages: msg.push(this.state.message)
		// }));
		//
		msg.push(this.state.message);
		let users = [];
		users.push(decoded.user_id);
		console.log(msg);
		const data = {
			channelName: this.state.channel.channelName,
			description: this.state.channel.description,
			messages: this.state.messages,
			user: decoded.user_id,
			// channel: this.props.match.params.id
			channelUsers: [
				{
					user: decoded.user_id
				}
			]
		};

		//console.log(data);
		// const messages = this.state.messages.concat(data);
		// const formData = {
		// 	messages
		// };
		// console.log(formData);
		axios
			.put(`/channels/${this.props.match.params.id}`, data)
			.then(response => {
				// this.setState(() => ({
				// 	messages: response.data.messages
				// }));
			})
			.catch(err => {
				console.log(err);
			});

		this.setState({ message: "" });
	};

	render() {
		const { classes } = this.props;
		console.log(this.state.messages);
		if (localStorage.getItem("token")) {
			return (
				<div>
					<center>
						<span style={{ color: "red", fontSize: "24px" }}>
							{this.state.channel.channelName}{" "}
						</span>
					</center>

					{/* <aside
						style={{
							width: "280px",
							backgroundColor: "rgba(233,255,219)",
							height: "500px",
							borderRight: "1px solid rgba(189, 189, 192, 0.1)",
							transition: "width 0.3s"
						}}
					>
						{" "}
						{this.state.channel.user}
					</aside> */}

					<div
						style={{
							maxWidth: "100%",
							// height: 400,
							flex: "1 1 0",
							// backgroundColor: "rgba(233,255,219)",
							height: "100%",
							border: "2px solid #dedede",
							backgroundColor: "#f1f1f1",
							borderRadius: "5px",
							padding: "10px",
							margin: "10px 0"
							// marginLeft: "15rem"
						}}
					>
						{" "}
						{this.state.messages.map((msg, i) => {
							if (msg.user === decoded.user_id) {
								return (
									<div key={i}>
										<br />
										<Typography
											style={{
												borderColor: "#ccc",
												backgroundColor: "#ddd",
												textAlign: "left",
												fontSize: "20px"
											}}
										>
											{msg.message}
											{/* {msg.user.username} */}
										</Typography>
									</div>
								);
							} else if (msg.user !== decoded.user_id) {
								return (
									<div key={i}>
										<br />
										<Typography
											style={{
												borderColor: "#ccc",
												backgroundColor: "#ddd",
												textAlign: "right",
												fontSize: "20px"
											}}
										>
											{msg.message}
											{/* {msg.user.username} */}
										</Typography>
									</div>
								);
							}
						})}
						<FormControl margin="normal" required fullWidth>
							<Input
								type="text"
								name="msg"
								value={this.state.message}
								onChange={this.msgHandle}
								placeholder="Your Message"
								required
							/>
						</FormControl>
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
							onClick={this.sendHandle}
							style={{ marginLeft: "65rem" }}
						>
							Send
							{/* This Button uses a Font Icon, see the installation instructions in the docs. */}
							<Icon className={classes.rightIcon}>send</Icon>
						</Button>
					</div>
					{/* <Join url={this.state.url}/> */}
				</div>
			);
		} else {
			return (
				<div>
					<Button color="primary" varaint="outline">
						<Link to="/user/login">please login</Link>
					</Button>
				</div>
			);
		}
	}
}
Home.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
