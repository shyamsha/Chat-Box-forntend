import React, { Component } from "react";
import decode from "jwt-decode";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
// import { Link } from "react-router-dom";
const styles = theme => ({
	main: {
		width: "auto",
		display: "block",
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
			.spacing.unit * 3}px`
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing.unit
	},
	submit: {
		marginTop: theme.spacing.unit * 3
	}
});

class ChannelForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			channelName: "",
			nameError: "",
			nError: false,
			description: ""
		};
	}
	nameHandle = e => {
		e.persist();
		this.setState(() => ({ channelName: e.target.value }));
	};
	descHandle = e => {
		e.persist();
		this.setState(() => ({ description: e.target.value }));
	};
	formHandle = e => {
		e.preventDefault();
		const userId = localStorage.getItem("token");
		const decoded = decode(userId);

		const formData = {
			channelName: this.state.channelName,
			description: this.state.description,
			user: decoded.user_id
		};
		// eslint-disable-next-line no-useless-escape
		const nameReg = /^[a-zA-Z0-9\s.\-]+$/.test(this.state.name);
		if (!nameReg) {
			this.setState(() => ({
				nameError: "Give Proper Nameing Format",
				nError: true
			}));
		} else {
			this.props.formHandle(formData);
			this.setState(() => ({ nameError: "", nError: false }));
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<main className={classes.main}>
					<CssBaseline />
					<Paper className={classes.paper}>
						<Avatar className={classes.avatar}>
							<VerifiedUserIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Name Of Channel
						</Typography>

						<form className={classes.form}>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="email">Name Of Channel</InputLabel>
								<Input
									type="text"
									name="name"
									value={this.state.channelName}
									onChange={this.nameHandle}
									placeholder="Your Channel Name"
									required
									error={this.state.nError}
								/>
								<span style={{ color: "red" }}>{this.state.nameError}</span>
							</FormControl>
							<FormControl margin="normal" fullWidth>
								<InputLabel htmlFor="email">Description</InputLabel>
								<Input
									type="text"
									name="name"
									value={this.state.description}
									onChange={this.descHandle}
									placeholder="Your Channel Description"
									multiline={true}
								/>
							</FormControl>
							<Button
								type="submit"
								fullWidth
								variant="outlined"
								color="secondary"
								size="small"
								className={classes.submit}
								onClick={this.formHandle}
							>
								Submit
							</Button>
						</form>
					</Paper>
				</main>
			</div>
		);
	}
}
ChannelForm.propTypes = {
	classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ChannelForm);
