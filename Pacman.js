import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Pacman_Jquery.css';
import DocumentEvents from 'react-document-events';
import { kickStartJqueryPacmanGame, removeJqueryPacmanEventListeners, kickStartJqueryPacmanGameWithBehaviour } from './Pacman_Jquery';
import { DropdownButton, MenuItem, Button, ButtonGroup } from 'react-bootstrap';


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
			<GhostButton title='Red' i='0'/>
			<GhostButton title='Pink' i='1' />
			<GhostButton title='Blue' i='2' />
			<GhostButton title='Orange' i='3' />
			<div id="gameDiv">
				
				<div className="ghost left" id="ghostRedDiv"></div>
				<div className="ghost left" id="ghostBlueDiv"></div>
				<div className="ghost left" id="ghostOrangeDiv"></div>
				<div className="ghost left" id="ghostPinkDiv"></div>
				<div id="pacmanDiv"></div>
				<div id="mapDiv"></div>
			</div>
			
			<div id="scoreDiv" ><div id="scoreIcon" className="statusIcon"></div><span id="scoreValue">&nbsp;0</span></div>
			<div id="livesDiv" ><div id="livesIcon" className="statusIcon"></div><span id="livesValue">&nbsp;2</span></div>
		</div>
    );
  }
}

class GhostButton extends Component{
	constructor(props){
		super(props);
		this.props = ({
			title : 'ghost name',
			    i : 0
		});
		
		this.state = ({
			selectedBehaviour : 'Random',
			showConfirm : false
		});
		
		this.onSelect   = this.onSelect.bind(this);
		this.onClickYes = this.onClickYes.bind(this);
		this.onClickNo = this.onClickNo.bind(this);
		
		this.toBeSelectedBehaviour = '';
		
		//const KEYS_TO_BEHAVIOURDESC = []
	}
	onClickYes(){
		this.setState({showConfirm : false});
		this.setState({selectedBehaviour : this.toBeSelectedBehaviour});
		kickStartJqueryPacmanGameWithBehaviour(this.toBeSelectedBehaviour, this.props.title);
	}
	onClickNo(){
		this.setState({showConfirm : false});
	}
	onSelect(eventKey, event){
		this.setState({showConfirm : true});
		this.toBeSelectedBehaviour = eventKey;
		
		// Always set focus to this input box hidden underneath the button so that when user hits arrow keys when playing it won't accidentally toggle the ghost box
		this.hackFocusInput.focus();
	}
	render() {
	  var displayConfirmContainerValue = (this.state.showConfirm) ? 'block' : 'none';
	  var confirmContainerStyle = {display:displayConfirmContainerValue};
		
	  return ( 
		<div className="ghostButtonConfirmContainer">
			<div className="confirmContainer" style={confirmContainerStyle} >
				<div className="confirmDiv">
					<div className="confirmDivMessage">Do you want to start a new game?
						<ButtonGroup bsStyle="confirmButtons" vertical>
							<Button bsStyle="success" bsSize="large" active onClick={this.onClickYes}>YES</Button>
							<Button bsStyle="danger"  bsSize="large" active onClick={this.onClickNo}>NO</Button>
						 </ButtonGroup>
					</div>
					
				</div>
			</div>
			<div className="ghostButtonContainer" style={{position:'relative'}}>
				<input style={{position:'absolute',width:'10px',left:'0px'}} 
				  ref={(input) => { this.hackFocusInput = input; }}
				/>
				<DropdownButton onSelect={this.onSelect} bsSize="small" bsStyle={"ghost"+this.props.title + " ghostGeneric"} 
					title={this.state.selectedBehaviour} key={this.props.i} id={'ghost-dropdown-'+this.props.i} dropup>
					<MenuItem eventKey="Shadow" >Shadow</MenuItem>
					<MenuItem eventKey="Ambush" active>Ambush</MenuItem>
					<MenuItem eventKey="Fickle">Fickle</MenuItem>
					<MenuItem eventKey="Sneaky">Sneaky</MenuItem>
					<MenuItem divider />
					<MenuItem eventKey="Random">Random</MenuItem>
				</DropdownButton>
				
			</div>
		</div>
	  );
	}
}


export default PacmanApp;