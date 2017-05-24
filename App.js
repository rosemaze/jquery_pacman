import React, { Component } from 'react';
import './App.css';
import './bootstrap.css';
import './bootstrap-theme.css';
import './scales.css';
import PacmanApp from './Pacman';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';


var ScrollWrapper = React.createClass({
    propTypes: {
        onWindowScroll: React.PropTypes.func
    },

    handleScroll: function(event) {
        // Do something generic, if you have to
        //console.log("ScrollWrapper's handleScroll");

        // Call the passed-in prop
        if (this.props.onWindowScroll) this.props.onWindowScroll(event);
    },

    render: function () {
        return this.props.children;
    },

    componentDidMount: function() {
        if (this.props.onWindowScroll) window.addEventListener("wheel", this.handleScroll);
    },

    componentWillUnmount: function() {
        if (this.props.onWindowScroll) window.removeEventListener("wheel", this.handleScroll);
    }
});

class App extends Component {
	constructor(props){
		super(props);
		
		this.state = ({
			showPacmanModal: false,
			rowX1 : 0,
			rowX2 : 0,
			rowX3 : 0,
			rowX4 : 0,
			rowX5 : 0,
			scrollClass : '',
		});
		
		this.handleNavSelect = this.handleNavSelect.bind(this);
		this.handlePacmanClick = this.handlePacmanClick.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
	}
	componentDidMount(){
		window.addEventListener("wheel", this.handleScroll);
	}
	handleNavSelect(selectedKey){
		switch (selectedKey){
			case 1:
				this.setState({showPacmanModal: true});
				break;
		}
	}
	handlePacmanClick(e){
		this.setState({showPacmanModal: true});
	}
	handleScroll(event){
		// ## We only want the sign from deltaY 
		if (event.deltaY > 0){
			this.setState({scrollClass : " scaleColScrollDown"});
		}else{
			this.setState({scrollClass : " scaleColScrollUp"});
		}
	}
	
	render() {
		return (
			<div id='bodyDiv'>
				<Navbar inverse collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="#">Maze Portfolio</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav onSelect={this.handleNavSelect}>
							<NavItem eventKey={1} href="#">pacman</NavItem>
							<NavDropdown eventKey={3} title="Technology" id="basic-nav-dropdown">
							<MenuItem eventKey={3.1}>Javascript</MenuItem>
							<MenuItem eventKey={3.2}>HTML</MenuItem>
							<MenuItem eventKey={3.3}>CSS</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={3.3}>Node.js</MenuItem>
							<MenuItem eventKey={3.3}>React</MenuItem>
							<MenuItem eventKey={3.3}>jQuery</MenuItem>
							</NavDropdown>
						</Nav>
						<Nav pullRight>
							<NavItem eventKey={1} href="#">lam.meisze@gmail.com</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				
				<DialogPacman show={this.state.showPacmanModal} />
				
				<ScrollWrapper onWindowScroll={this.handleScroll}>
					<nav className="scalesGridContainer navbar navbar-inverse navbar-fixed-bottom">
						<Grid fluid={true} className="scalesContainer">
							<Row id="row1" className="show-grid" bsClass="scaleRow">
								<Col xs={4} md={2} className={"scaleCol scaleCol1 bgGrey"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble/></Col>
								<Col xs={4} md={2} className={"scaleCol scaleCol1"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble/><Bubble/></Col>
								<Col xs={4} md={2} className={"scaleCol scaleCol1"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble/></Col>
								<Col xs={4} md={2} xsHidden smHidden className={"scaleCol scaleCol1 bgGrey"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble/></Col>
								<Col xs={4} md={2} xsHidden smHidden className={"scaleCol scaleCol1 bgBlush"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble/></Col>
								<Col xs={4} md={2} xsHidden smHidden className={"scaleCol scaleCol1 bgAqua"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble/></Col>
							</Row>
							<Row id="row2" className="show-grid" bsClass="scaleRow altColour overlap">
								<Col xs={2} md={1} className={"scaleCellLeftHalf scaleCol2"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div></Col>
								<Col xs={4} md={2} className={"scaleCol scaleCol2 bgGrey"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div><Bubble/><Bubble/><Bubble/></Col>
								<Col xs={4} md={2} className={"scaleCol scaleCol2 bgGrey"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div><ShortcutPacman onUserClick={this.handlePacmanClick}/></Col>
								<Col xs={4} md={2} xsHidden smHidden className={"scaleCol scaleCol2"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div><Bubble/></Col>
								<Col xs={4} md={2} xsHidden smHidden className={"scaleCol scaleCol2"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div></Col>
								<Col xs={4} md={2} xsHidden smHidden className={"scaleCol scaleCol2 bgBlush"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div><Bubble/><Bubble/></Col>
								<Col xs={2} md={1} className={"scaleCellRightHalf scaleCol2"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div></Col>
							</Row>
							<Row className="show-grid" bsClass="scaleRow overlap">
								<Col xs={4} md={2} className={"scaleCol scaleCol3"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div><Bubble/></Col>
								<Col xs={4} md={2} className={"scaleCol scaleCol3"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div><Bubble/><Bubble/></Col>
								<Col xs={4} md={2} className={"scaleCol bgAqua scaleCol3"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div><Bubble/></Col>
								<Col xs={4} md={2} xsHidden smHidden className={"scaleCol scaleCol3"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div><Bubble/></Col>
								<Col xs={4} md={2} xsHidden smHidden className={"scaleCol scaleCol3"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div><Bubble/><Bubble/></Col>
								<Col xs={4} md={2} xsHidden smHidden className={"scaleCol scaleCol3"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div></Col>
							</Row>
							<Row className="show-grid" bsClass="scaleRow altColour overlap">
								<Col xs={2} md={1} className={"scaleCellLeftHalf scaleCol4"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div></Col>
								<Col xs={4} md={2} className={"scaleCol bgAqua scaleCol4"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble/></Col>
								<Col xs={4} md={2} className={"scaleCol bgAqua scaleCol4"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div><Bubble/></Col>
								<Col xs={4} md={2} xsHidden smHidden className={"scaleCol bgGrey scaleCol4"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div></Col>
								<Col xs={4} md={2} xsHidden smHidden className={"scaleCol scaleCol4"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div><ShortcutCupcake/><Bubble/><Bubble/></Col>
								<Col xs={4} md={2} xsHidden smHidden className={"scaleCol scaleCol4"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div><Bubble/><Bubble/></Col>
								<Col xs={2} md={1} className={"scaleCellRightHalf scaleCol4"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div></Col>
							</Row>
							<Row className="show-grid" bsClass="scaleRow overlap">
								<Col xs={4} md={2} className={"scaleCol scaleCol5"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble/><Bubble/><Bubble/></Col>
								<Col xs={4} md={2} className={"scaleCol bgAqua scaleCol5"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col xs={4} md={2} className={"scaleCol scaleCol5"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble/><Bubble/><Bubble/></Col>
								<Col xs={4} md={2} xsHidden smHidden className={"scaleCol scaleCol5"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble/><Bubble/></Col>
								<Col xs={4} md={2} xsHidden smHidden className={"scaleCol bgGrey scaleCol5"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble/><Bubble/><Bubble/></Col>
								<Col xs={4} md={2} xsHidden smHidden className={"scaleCol scaleCol5"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div></Col>
							</Row>
							<Row className="show-grid" bsClass="scaleRow altColour overlap">
								<Col xs={2} md={1} className={"scaleCellLeftHalf scaleCol6"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col xs={4} md={2} className={"scaleCol scaleCol6"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col xs={4} md={2} className={"scaleCol bgAqua scaleCol6"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col xs={4} md={2} xsHidden smHidden className={"scaleCol bgAqua scaleCol6"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble/><Bubble/><Bubble/></Col>
								<Col xs={4} md={2} xsHidden smHidden className={"scaleCol bgBlush scaleCol6"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble/>><Bubble/></Col>
								<Col xs={4} md={2} xsHidden smHidden className={"scaleCol bgGrey scaleCol6"+this.state.scrollClass}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble/><Bubble/><Bubble/></Col>
								<Col xs={2} md={1} className={"scaleCellRightHalf scaleCol6"+this.state.scrollClass} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
							</Row>
						</Grid>
					</nav>
				</ScrollWrapper>
			
			
			</div>
		);
	}
}

class Bubble extends Component{
	constructor(props){
		super(props);
		
		this.LIMIT_UPPER = -300;
		this.LIMIT_DIAMETER = 80;
		
		// Generate a random integer for X btw 0-100
		var startX = Math.round(Math.random() * 100); 
		// Y btw 5-50
		var startY = Math.round(Math.random() * (50-5) + 5);
		// Diameter btw 15-40
		var startDiameter = Math.round(Math.random() * (30-5) + 15);
		
		this.expand = true;
		
		this.state = ({
			intervalId: null,
			x: startX,
			y: startY,
			startX: startX,
			startY: startY,
			diameter: startDiameter,
			startDiameter: startDiameter,
			opacity: 1
		});
		this.updateBubblePosition;
	}
	componentDidMount() {
		// Random interval between 20-55 milisecs
		var randomInterval = Math.round(Math.random() * (55-20) + 20);
		this.timerID = setInterval(
		  () => this.updateBubblePosition(),
		  randomInterval
		);
	}
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	updateBubblePosition(){
		var newY        = this.state.y;
		var newOpacity  = this.state.opacity;
		var newDiameter = this.state.diameter;
		
		// Raise bubbles and fade the higher they rise
		if (newY > this.LIMIT_UPPER){
			newY--;
			newOpacity = newOpacity - 0.005;
		}else{
			// We have reached top of page, start from initial position
			newY = this.state.startY;
			newOpacity = 1;
		}
		// Shrink bubbles
		if (newDiameter > 1){
			newDiameter = newDiameter - 0.2;
		}else{
			newDiameter = this.state.startDiameter;
		}
			
		this.setState({ y: newY, opacity: newOpacity, diameter: newDiameter });
	}
	render(){
		var bubbleStyle = {
			right: this.state.x+"%",
			top: this.state.y+"%",
			width: this.state.diameter,
			height: this.state.diameter,
			opacity: this.state.opacity
		}
		
		return <div className='scaleBubble' style={bubbleStyle} ></div>;
	}
}


class ShortcutPacman extends Component{
	constructor(props){
		super(props);
		
		this.onClick = this.onClick.bind(this);
	}
	onClick(e){
		this.props.onUserClick(e);
	}
	render(){
		return <span className='shortcutSpan' onClick={this.onClick}>
					<a id='shortcutPacmanLink'>
					</a><div id='shortcutPacmanDiv' className='shortcutDiv'></div>
			   </span>;
	}
}

class ShortcutCupcake extends Component{
	constructor(props){
		super(props);
		
		this.state = ({ show: false });
	}
	/*
	openModal() {
		this.setState({ show: true });
	}*/
	render(){
		return <span className='shortcutSpan'>
					<a id='shortcutCupcakeLink'>
					</a><div id='shortcutCupcakeDiv' className='shortcutDiv'></div>
					<DialogPacman show={this.state.show} />
			   </span>;
	}
}

class DialogPacman extends Component{
	constructor(props){
		super(props);
		
		this.state = ({show : false});
		
		this.hideModal = this.hideModal.bind(this);
	}
	componentWillReceiveProps(nextProps){
		this.setState({'show' : nextProps.show});
	}
	hideModal(e) {
		if (confirm('Are you sure you want to leave this game?')){
			this.setState({'show': false});
		}
	}
	render() {
		return (
				<Modal
				  {...this.props}
				  show={this.state.show}
				  onHide={this.hideModal}
				  dialogClassName="pacman-modal"
				>
					<Modal.Header closeButton>
					</Modal.Header>
					<Modal.Body>
						<PacmanApp />
					</Modal.Body>
					<Modal.Footer>
					</Modal.Footer>
				</Modal>
		);
	}
}

export default App;
