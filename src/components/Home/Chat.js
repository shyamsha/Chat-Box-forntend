import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";



class Chat extends Component {
	render() {
		return (
			<div style={{ marginTop: "10rem" }}>
				<Paper
					style={{
						width: "425px",
						height: "174px",
						padding: "5px 15px",
						margin: "0px 25rem"
					}}
				>
					<Typography variant="h5" component="h3">
						This is a ChatBox.
					</Typography>
					<Typography component="p">
						Chatbox is an integrated messaging ecosystem that businesses
						leverage to create and automate personalized, results-oriented
						conversations across texting, chat and social channels.
					</Typography>
				</Paper>
			</div>
		);
	}
}

export default Chat;
