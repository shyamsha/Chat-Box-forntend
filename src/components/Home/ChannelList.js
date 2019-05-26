import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "../../config/config";
import decode from "jwt-decode";

class ChannelList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			channelList: []
		};
	}
	componentDidMount() {
		axios
			.get("/channels", {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				const channels = response.data;

				this.setState(() => ({ channelList: channels }));
			});
	}
	render() {
		const userId = localStorage.getItem("token");
		const decoded = decode(userId);
		if (this.state.channelList.length >= 0 && localStorage.getItem("token")) {
			return (
				<div>
					<Button color="default" varaint="outline">
						<Link to="/user/createchannel">Create New Chat Room</Link>
					</Button>
					{localStorage.getItem("token") ? (
						this.state.channelList.map(channel => {
							if (channel.user === decoded.user_id) {
								return (
									<div key={channel._id}>
										<aside>
											<Button color="secondary" varaint="outline">
												<Link to={`/channel/show/${channel._id}`}>
													{channel.channelName}
												</Link>
											</Button>
										</aside>
									</div>
								);
							}
						})
					) : (
						<p>channel not yet created</p>
					)}
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

export default ChannelList;
