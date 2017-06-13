import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Pacman_Jquery.css';
import DocumentEvents from 'react-document-events';
import { kickStartJqueryPacmanGame, removeJqueryPacmanEventListeners, kickStartJqueryPacmanGameWithBehaviour } from './Pacman_Jquery';
import { DropdownButton, MenuItem, Button, ButtonGroup, Glyphicon, Dropdown } from 'react-bootstrap';


class PacmanApp extends Component {
  constructor(props){
	  super(props);
	  this.state = ({stringy: 'hello'});
  }
  
  componentDidMount(){
	  kickStartJqueryPacmanGame();
  }
  
  componentWillUnmount(){
	  removeJqueryPacmanEventListeners();
  }
  
  render() {
	//<GameMap /> --- insert back into gameDiv, remove all other child elements in pacmanContainer and block kickstartJquery fn to execute react implementation
    return (
		<div id="pacmanContainer">
			
			<div id="gameDiv">
				<div className="ghost left" id="ghostBlueDiv"></div>
				<div className="ghost left" id="ghostRedDiv"></div>
				<div className="ghost left" id="ghostPinkDiv"></div>
				<div className="ghost left" id="ghostOrangeDiv"></div>
				<div id="pacmanDiv"></div>
				<div id="mapDiv"></div>
			</div>
			<GhostButtonGroup />
			<div id="scoreDiv" ><div id="scoreIcon" className="statusIcon"></div><span id="scoreValue">&nbsp;0</span></div>
			<div id="livesDiv" ><div id="livesIcon" className="statusIcon"></div><span id="livesValue">&nbsp;2</span></div>
		</div>
    );
  }
}

class GhostButtonGroup extends Component{
	constructor(props){
		super(props);
		
		this.state = ({
			showConfirm : false,
			behaviours : ['Random', 'Random', 'Random', 'Random']
		});
		
		// Temporary new behaviours to be confirmed
		this.toBeSelectedBehaviours = this.state.behaviours.slice();
		
		this.showConfirmPanel = this.showConfirmPanel.bind(this);
		this.onClickYes = this.onClickYes.bind(this);
		this.onClickNo = this.onClickNo.bind(this);
	}
	showConfirmPanel(selectedItem, buttonIndex){
		if (window.gameIsPaused){
			this.toBeSelectedBehaviours = this.state.behaviours.slice();
			
			this.toBeSelectedBehaviours[buttonIndex] = selectedItem;
			
			this.setState({showConfirm : true});
		}else{
			// No running game just change the behaviour array
			this.toBeSelectedBehaviours[buttonIndex] = selectedItem;
			this.setState({behaviours :  this.toBeSelectedBehaviours});
			
			kickStartJqueryPacmanGameWithBehaviour(this.state.behaviours);
		}
	}
	onClickYes(){
		this.setState({showConfirm : false});
		this.setState({behaviours :  this.toBeSelectedBehaviours});
		
		window.gameIsPaused = false;
		kickStartJqueryPacmanGameWithBehaviour(this.state.behaviours);
	}
	onClickNo(){
		this.setState({showConfirm : false});
		
		this.toBeSelectedBehaviours = this.state.behaviours.slice();
	}
	
	render(){
		return ( 
			<div>
				<div className="ghostButtonConfirmContainer">
					<div className="confirmContainer" style={{display:(this.state.showConfirm) ? 'block' : 'none'}} >
						<div className="confirmDiv">
							<div className="confirmDivMessage">Do you want to start a new game?
								<ButtonGroup bsStyle="confirmButtons" vertical>
									<Button bsStyle="success" bsSize="large" active onClick={this.onClickYes}>YES</Button>
									<Button bsStyle="danger"  bsSize="large" active onClick={this.onClickNo}>NO</Button>
								</ButtonGroup>
							</div>
						</div>
					</div>
				</div>
				<GhostButton onUserSelect={this.showConfirmPanel} buttonIndex={0} colour="Red" behaviour={this.state.behaviours[0]} />
				<GhostButton onUserSelect={this.showConfirmPanel} buttonIndex={1} colour="Pink" behaviour={this.state.behaviours[1]} />
				<GhostButton onUserSelect={this.showConfirmPanel} buttonIndex={2} colour="Blue" behaviour={this.state.behaviours[2]} />
				<GhostButton onUserSelect={this.showConfirmPanel} buttonIndex={3} colour="Orange" behaviour={this.state.behaviours[3]} />
			</div>
		);
	}
}

class GhostButton extends Component{
	constructor(props){
		super(props);
		
		this.onSelect = this.onSelect.bind(this);
	}
	onSelect(eventKey){
		this.props.onUserSelect(eventKey, this.props.buttonIndex);
		
		this.hackFocusInput.focus();
	}
	render(){
		return (
			<div className="ghostButtonContainer" style={{position:'relative'}}>
				<input style={{position:'absolute',width:'10px',left:'0px'}}
				  ref={(input) => { this.hackFocusInput = input; }}
				/>
				<DropdownButton onSelect={this.onSelect} bsSize="small" bsStyle={"ghost"+this.props.colour+" ghostGeneric"} 
					title={this.props.behaviour} id={'ghost-dropdown-0'} dropup >
					<MenuItem eventKey="Aggressive" >Aggressive</MenuItem>
					<MenuItem eventKey="Ambush" disabled >Ambush</MenuItem>
					<MenuItem eventKey="Fickle" disabled >Fickle</MenuItem>
					<MenuItem eventKey="Sneaky" disabled >Sneaky</MenuItem>
					<MenuItem divider />
					<MenuItem eventKey="Random" active={true}>Random</MenuItem>
				</DropdownButton>
			</div>
		);
	}
}

export default PacmanApp;