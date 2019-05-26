import React, { Component } from "react";

import axios from "../../config/config";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import decode from "jwt-decode";
const io = require("socket.io-client");
const socket = io("http://localhost:3001");

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
			messages: [],
			channel: {}
		};
		socket.on("connect", () => {
			console.log("connected front end");
		});
		// this.socket = io("localhost:3001");
	}

	componentDidMount() {
		const id = this.props.match.params.id;
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
					messages: channelData.messages
				}));
			});
		socket.on("RECEIVE_MESSAGE", data => {
			self.setState({ messages: data });
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
		const data = {
			message: this.state.message,
			user: decoded.user_id
			// channel: this.props.match.params.id
		};
		const messages = this.state.messages.concat(data);
		const formData = {
			messages
		};
		axios
			.put(`/channels/${this.state.channel._id}`, formData)
			.then(result => {
				console.log(result.data);
				this.setState({ message: "" });
			})
			.catch(err => {
				console.log(err);
			});
		// socket.emit("SEND_MESSAGE", {
		// 	message: this.state.message,
		// 	user: decoded.user_id,
		// 	channel: this.props.match.params.id
		// });
	};

	render() {
		if (localStorage.getItem("token")) {
			return (
				<div>
					<center>
						<span style={{ color: "red", fontSize: "24px" }}>
							{this.state.channel.channelName}{" "}
						</span>
					</center>

					<div>
						<aside
							style={{
								width: "280px",
								backgroundColor: "rgba(233,255,219)",
								height: "500px",
								borderRight: "1px solid rgba(189, 189, 192, 0.1)",
								transition: "width 0.3s"
							}}
						/>
					</div>
					<div
						style={{
							flex: "1 1 0",
							backgroundColor: "rgba(233,255,219)",
							height: "100%",
							marginLeft: "15rem"
						}}
					>
						{this.state.messages.map((msg, i) => {
							// if (this.state.channel._id === msg.channel) {
							return (
								<div key={i}>
									<p>{msg.message}</p>
								</div>
							);
							// }
						})}
					</div>
					<div
						style={{
							flex: "1 1 0",
							backgroundColor: "rgba(233,255,219)",
							height: "100%",
							marginLeft: "15rem"
						}}
					>
						<input
							type="text"
							size="35"
							name="text"
							value={this.state.message}
							onChange={this.msgHandle}
						/>
						<button onClick={this.sendHandle}>send</button>
					</div>
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

export default Home;
