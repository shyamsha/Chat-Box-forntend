import React, { Component } from "react";
import io from "socket.io-client";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
			messages: []
		};
		this.socket = io("localhost:3001");
		this.socket.on("RECEIVE_MESSAGE", function(data) {
			addMessage(data);
		});
		const addMessage = data => {
			console.log(data);
			this.setState({ messages: [...this.state.messages, data] });
			console.log(this.state.messages);
		};
	}
	msgHandle = e => {
		e.persist();
		this.setState(() => ({ message: e.target.value }));
	};

	sendHandle = e => {
		e.preventDefault();
		this.socket.emit("SEND_MESSAGE", {
			message: this.state.message
		});
		this.setState({ message: "" });
	};

	render() {
		return (
			<div>
				<div>
					<aside style={{ hight: "auto", width: "256px" }}>channel list</aside>
				</div>
				<div style={{ marginLeft: "35rem" }}>
					{this.state.messages.map((msg, i) => {
						return (
							<div key={i}>
								<p>{msg.message}</p>
							</div>
						);
					})}
				</div>
				<div style={{ marginLeft: "35rem" }}>
					<input
						type="text"
						name="text"
						value={this.state.message}
						onChange={this.msgHandle}
					/>
					<button onClick={this.sendHandle}>send</button>
				</div>
			</div>
		);
	}
}

export default Home;
