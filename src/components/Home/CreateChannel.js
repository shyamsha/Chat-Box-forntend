import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import Button from "@material-ui/core/Button";
import ChannelForm from "../Home/ChannelForm";
import axios from "../../config/config";
import io from "socket.io-client";

class CreateChannel extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.socket = io("localhost:3001");
	}
	formHandle = formData => {
		axios
			.post("/channels", formData, {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				console.log(response.data);
				this.socket.emit("JOIN_ROOM", { channel: response.data._id });
				this.props.history.push(`/channel/show/${response.data._id}`);
			})
			.catch(err => {
				console.log(err);
			});
	};

	render() {
		return (
			<div>
				<ChannelForm formHandle={this.formHandle} />
			</div>
		);
	}
}

export default CreateChannel;
