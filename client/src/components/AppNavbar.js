import React, { Component } from "react";
import {
	Navbar,
	NavbarBrand,
	Nav,
	Button
} from "react-bootstrap";
import './style.css';
import PropTypes from "prop-types";

// Todo:
// Make player switch after ending vid

var timeout;

class AppNavbar extends Component {

	state = {
		placeholderTitle: "Nothing Is Currently Playing",
		track_index: 0,
		isShuffling: false,
		isLooping: false,
		isPlaying: false,
	};

	playTrack = (previousTrack_Index) => { 

		this.setState({
			isPlaying: true
		}, () => {
			// Load a new track
		
			if (this.state.isShuffling) {

				let tempState = { ...this.state }
				let previousState = previousTrack_Index
				tempState.track_index = previousState

				const randomTrack_Index = () => {
					tempState.track_index =  Math.floor(Math.random() * this.props.items.length)
				}

				while (tempState.track_index === previousState) {
					randomTrack_Index();
				}

				tempState.placeholderTitle = this.props.items[tempState.track_index].name

				this.setState(tempState, () => {
					this.props.toggle(this.props.items[this.state.track_index]._id)
					clearTimeout(timeout)
					timeout = setTimeout(this.nextTrack, this.props.items[this.state.track_index].duration + 3000)
					console.log(this.props.items[this.state.track_index].duration + 3000)
				})

			}
			else if (this.state.isLooping) {
				this.props.toggle(this.props.items[this.state.track_index]._id)
				this.setState({
				}, () => {
					this.props.toggle(this.props.items[this.state.track_index]._id)
					clearTimeout(timeout)
					timeout = setTimeout(this.nextTrack, this.props.items[this.state.track_index].duration + 3000)
					console.log(this.props.items[this.state.track_index].duration + 3000)
				}, () => this.setState({
					isPlaying: true,
					placeholderTitle: this.props.items[this.state.track_index].name
				})
				)
				
			}
			else {
				this.setState({
					placeholderTitle: this.props.items[this.state.track_index].name
				}, () => {
					this.props.toggle(this.props.items[this.state.track_index]._id)
					clearTimeout(timeout)
					timeout = setTimeout(this.nextTrack, this.props.items[this.state.track_index].duration + 3000)
					console.log(this.props.items[this.state.track_index].duration + 3000)
				})

			}
			
			// Move to the next track if the current finishes playing 
			// using the 'ended' event 


		})
	}

	playpauseTrack = () => { 

		clearTimeout(timeout)

		// Switch between playing and pausing 
		// depending on the current state 
		if (!this.state.isPlaying) this.playTrack(); 
		else this.pauseTrack(); 
	}

	pauseTrack = () => {

		clearTimeout(timeout)

		// Pause the loaded track 
		this.setState({
			isPlaying: false,
			isShuffling: false,
			isLooping: false
		}, () => {this.props.toggle(this.props.items[this.state.track_index]._id)})
		
		// Replace icon with the play icon 
		// playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';

	}
		
	nextTrack = () => { 
		// Go back to the first track if the 
		// current one is the last in the track list

		clearTimeout(timeout)

		// much preferred imo. very easy to reason about, probably more performant
		const settingTempState = () => {
			// this acts as a sort of "draft" version of the next state
			const tempState = { ...this.state }
			const previousTrack_Index = tempState.track_index
	
			// you use it throughout the function instead of this.state
	
			if (tempState.track_index < this.props.items.length - 1 && !tempState.isLooping) {
				tempState.track_index = tempState.track_index + 1
			}
			else if (tempState.isLooping) {
				tempState.track_index = tempState.track_index
			}
			else { 
				tempState.track_index = 0
			}
	
			// only one state update occurs
			this.setState(tempState, () => {
				this.playTrack(previousTrack_Index)
			})
		}

		settingTempState()
		
		// Load and play the new track
	} 
		
	prevTrack = () => { 
		// Go back to the last track if the 
		// current one is the first in the track list 

		clearTimeout(timeout)

		const settingTempState = () => {
			// this acts as a sort of "draft" version of the next state
			const tempState = { ...this.state }
			const previousTrack_Index = tempState.track_index
	
			// you use it throughout the function instead of this.state
	
			if (tempState.track_index > 0 && !tempState.isLooping) {
				tempState.track_index = tempState.track_index - 1
			}
			else if (tempState.isLooping) {
				tempState.track_index = tempState.track_index
			}
			else { 
				tempState.track_index = this.props.items.length - 1
			}
	
			// only one state update occurs
			this.setState(tempState, () => this.playTrack(previousTrack_Index))
		}

		settingTempState()

		// Load and play the new track 
	}


	// Connect to loop track icon
	loopTrack = () => {
		if (!this.state.isLooping) {
			this.loopOn();
			this.shuffleOff();
		}
		else this.LoopOff();
	}

	// Connect to shuffle track icon
	shuffleTrack = () => {
		if (!this.state.isShuffling) {
			this.shuffleOn();
			this.LoopOff();
		}
		else this.shuffleOff();
	}

	loopOn = () => {
		this.setState({
			isLooping: true
		})
	}

	LoopOff = () => {
		this.setState({
			isLooping: false
		})
	}

	shuffleOn = () => {
		this.setState({
			isShuffling: true
		})
	}

	shuffleOff = () => {
		this.setState({
			isShuffling: false
		})
	}

	render() {

		return (

			<Navbar className="Navbar">
				<NavbarBrand id="Logo" href="#home">
					<img
					alt=""
					src={require('../images/Logo-Smaller.png')}
					/>
				</NavbarBrand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">

					<Nav className="mr-auto">

						<ul className="navbar-nav">

							<li>
								<a href="#" className="Title">
									Embedded Music
								</a>
							</li>
						
						</ul>

					</Nav>

					<Nav className="mr-auto">

					<div id="PlayerBox">

						<ul className="navbar-nav">

							<li>

								<header id="Player">
									Now Playing:
								</header>

								<div id="textbox">
									<header id="textbox">
										{this.state.placeholderTitle}
									</header>
								</div>

								<img class="transparent" id="Player" 
								alt=""
								onClick={this.prevTrack}
								src={require('../images/Previous-smallest.png')}
								/>

								<img class="transparent" id="Player"
								alt=""
								onClick={this.playpauseTrack}
								src={this.state.isPlaying ? require("../images/Pause-smallest.png") : require('../images/Play-smallest.png')}
								/>
								
								<img class="transparent" id="Player" 
								alt=""
								onClick={this.nextTrack}
								src={require('../images/Next-smallest.png')}
								/>

								<img class="transparent" id="Player" style={{opacity: this.state.isLooping ? "1" : "0.8"}}
								alt=""
								onClick={this.loopTrack}
								src={require('../images/Loop-small.png')}
								/>

								<img class="transparent" id="Player" style={{opacity: this.state.isShuffling ? "1" : "0.8"}}
								alt=""
								onClick={this.shuffleTrack}
								src={require('../images/Shuffle-smallest.png')}
								/>

							</li>

						</ul>

					</div>

					</Nav>

					<ul className="navbar-nav">

						<li>
							<a href="#Help/FAQ">
								<Button className="btn btn-secondary Button">Help/FAQ</Button>
							</a>
						</li>

						<li>
							<a href="#Contact">
								<Button className="btn btn-secondary Button">Contact</Button>
							</a>
						</li>

						<li>
							<a href="#Donate">
								<Button className="btn btn-secondary Button">Donate</Button>
							</a>
						</li> 

					</ul>

				</Navbar.Collapse>
			</Navbar>
		)
	}
}

AppNavbar.propTypes = {
	toggle: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
}


export default AppNavbar;
