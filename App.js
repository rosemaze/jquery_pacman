import React, { Component } from 'react';
import './App.css';
import './bootstrap.css';
import './bootstrap-theme.css';
import './scales.css';
import './bubbles.css';
import PacmanApp from './Pacman';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { kickStartAnimateScales } from './parallax';

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
        if (this.props.onWindowScroll){ 
			window.addEventListener("scroll", this.handleScroll);
			//window.addEventListener("wheel", this.handleScroll);
		}
    },

    componentWillUnmount: function() {
        if (this.props.onWindowScroll) {
			window.removeEventListener("scroll", this.handleScroll);
			//window.removeEventListener("wheel", this.handleScroll);
		}
    }
});

class App extends Component {
	constructor(props){
		super(props);
		
		this.state = ({
			showPacmanModal: false,
			navBarClass: 'navBarShow'
		});
		
		this.lastScrollTop = window.scrollTop;
		
		this.handleNavSelect = this.handleNavSelect.bind(this);
		this.handlePacmanClick = this.handlePacmanClick.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.hidePacmanModal = this.hidePacmanModal.bind(this);
	}
	
	componentDidMount(){
		kickStartAnimateScales();
		window.addEventListener('scroll', this.handleScroll);
	}
	
	componentDidMount(){
		kickStartAnimateScales();
		window.removeEventListener('scroll', this.handleScroll);
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
		var currentY = window.pageYOffset;
		if (this.lastScrollTop > window.pageYOffset){
			// Scrolling up, show navbar
			this.setState({navBarClass: ''});
		}else{
			// Scrolling down, hide navbar
			this.setState({navBarClass: 'navBarHide'});
		}
		this.lastScrollTop = currentY;
	}
	
	hidePacmanModal(){
		if (confirm('Are you sure you want to leave this game?')){
			this.setState({showPacmanModal: false});
		}
	}
	render() {
		return (
			<div id='bodyDiv'>
				<Navbar inverse collapseOnSelect fixedTop className={this.state.navBarClass + ' navBar'}>
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
				
				<DialogPacman show={this.state.showPacmanModal} onUserHideModal={this.hidePacmanModal} />
				
				<div id="bubbles1"/>
				<div id="bubbles2"/>
				<div id="bubbles3"/>
				<Fish show={!this.state.showPacmanModal}/>
				<ScrollWrapper onWindowScroll={this.handleScroll}>
					<div id="introBackground">
						<div id="parallaxDarken"></div>
						<div id="sky"/>
						<Grid fluid={true} className="scalesContainer">
							<Row className="show-grid" bsClass="scaleRow">
								<Col md={2} xs={4} id="scaleCol1_1" className={"scaleCol scaleCol1 bgGrey"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol1_2" className={"scaleCol scaleCol1"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol1_3" className={"scaleCol scaleCol1"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol1_4" className={"scaleCol scaleCol1 bgGrey"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol1_5" className={"scaleCol scaleCol1 bgBlush"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol1_6" className={"scaleCol scaleCol1 bgAqua"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
							</Row>
							<Row className="show-grid" bsClass="scaleRow altColour overlap">
								<Col md={1} xs={2} id="scaleCol2_1" className={"scaleCellLeftHalf scaleCol2"} ><div className="scaleCell"><div><div><div ><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol2_2" className={"scaleCol scaleCol2 bgGrey"} ><div className="scaleCell"><div><div><div ><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol2_3" className={"scaleCol scaleCol2 bgGrey noAnimation"} ><div className="scaleCell"><div><div><div ><div><div></div></div></div></div></div></div><ShortcutPacman onUserClick={this.handlePacmanClick}/></Col>
								<Col md={2} xsHidden smHidden id="scaleCol2_4" className={"scaleCol scaleCol2"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol2_5" className={"scaleCol scaleCol2"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol2_6" className={"scaleCol scaleCol2 bgBlush"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={1} xs={2} id="scaleCol2_7" className={"scaleCellRightHalf scaleCol2"} ><div className="scaleCell"><div><div><div><div ><div><div></div></div></div></div></div></div></div></Col>
							</Row>
							<Row className="show-grid" bsClass="scaleRow overlap">
								<Col md={2} xs={4} id="scaleCol3_1" className={"scaleCol scaleCol3"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol3_2" className={"scaleCol scaleCol3"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol3_3" className={"scaleCol bgAqua scaleCol3"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol3_4" className={"scaleCol scaleCol3"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol3_5" className={"scaleCol scaleCol3 noAnimation"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol3_6" className={"scaleCol scaleCol3"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
							</Row>
							<Row className="show-grid" bsClass="scaleRow altColour overlap">
								<Col md={1} xs={2} id="scaleCol4_1" className={"scaleCellLeftHalf scaleCol4"}><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol4_2" className={"scaleCol bgAqua scaleCol4"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol4_3" className={"scaleCol bgAqua scaleCol4"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol4_4" className={"scaleCol bgGrey scaleCol4"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol4_5" className={"scaleCol scaleCol4"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><ShortcutCupcake/></Col>
								<Col md={2} xsHidden smHidden id="scaleCol4_6" className={"scaleCol scaleCol4"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={1} xs={2} id="scaleCol4_7" className={"scaleCellRightHalf scaleCol4"}><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div></Col>
							</Row>
							<Row className="show-grid" bsClass="scaleRow overlap">
								<Col md={2} xs={4} id="scaleCol5_1" className={"scaleCol scaleCol5"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol5_2" className={"scaleCol bgAqua scaleCol5"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol5_3" className={"scaleCol scaleCol5"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol5_4" className={"scaleCol scaleCol5"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol5_5" className={"scaleCol bgGrey scaleCol5"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol5_6" className={"scaleCol scaleCol5"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
							</Row>
							<Row className="show-grid" bsClass="scaleRow altColour overlap">
								<Col md={1} xs={2} id="scaleCol6_1" className={"scaleCellLeftHalf scaleCol6"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol6_2" className={"scaleCol scaleCol6"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol6_3" className={"scaleCol bgAqua scaleCol6"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol6_4" className={"scaleCol bgAqua scaleCol6"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol6_5" className={"scaleCol bgBlush scaleCol6"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol6_6" className={"scaleCol bgGrey scaleCol6"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={1} xs={2} id="scaleCol6_7" className={"scaleCellRightHalf scaleCol6"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
							</Row>
							<Row className="show-grid" bsClass="scaleRow bgRulesDontApply bgGradient altColour overlap">
								<Col md={2} xs={4} id="scaleCol7_1" className={"scaleCol scaleCol7 fakeBorder noAnimation"}>
									<div className="scaleCell">
										<div className="fakeBorder">
											<div>
												<div className="fakeBorder">
													<div>
														<div className="fakeBorder">
															<div>
																<div className="fakeBorder">
																	<div>
																		<div className="fakeBorder">
																			<div>
																				<div className="fakeBorder">
																					<div></div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Col>
								<Col md={2} xs={4} id="scaleCol7_2" className={"scaleCol scaleCol7 fakeBorder noAnimation"}>
									<div className="scaleCell">
										<div className="fakeBorder">
											<div>
												<div className="fakeBorder">
													<div>
														<div className="fakeBorder">
															<div>
																<div className="fakeBorder">
																	<div>
																		<div className="fakeBorder">
																			<div>
																				<div className="fakeBorder">
																					<div></div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Col><Col md={2} xs={4} id="scaleCol7_3" className={"scaleCol scaleCol7 fakeBorder noAnimation"}>
									<div className="scaleCell">
										<div className="fakeBorder">
											<div>
												<div className="fakeBorder">
													<div>
														<div className="fakeBorder">
															<div>
																<div className="fakeBorder">
																	<div>
																		<div className="fakeBorder">
																			<div>
																				<div className="fakeBorder">
																					<div></div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Col>
								<Col md={2}  xsHidden smHidden id="scaleCol7_4" className={"scaleCol scaleCol7 fakeBorder noAnimation"}>
									<div className="scaleCell">
										<div className="fakeBorder">
											<div>
												<div className="fakeBorder">
													<div>
														<div className="fakeBorder">
															<div>
																<div className="fakeBorder">
																	<div>
																		<div className="fakeBorder">
																			<div>
																				<div className="fakeBorder">
																					<div></div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Col>
								<Col md={2} xsHidden smHidden id="scaleCol7_5" className={"scaleCol scaleCol7 fakeBorder noAnimation"}>
									<div className="scaleCell">
										<div className="fakeBorder">
											<div>
												<div className="fakeBorder">
													<div>
														<div className="fakeBorder">
															<div>
																<div className="fakeBorder">
																	<div>
																		<div className="fakeBorder">
																			<div>
																				<div className="fakeBorder">
																					<div></div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Col>
								<Col md={2} xsHidden smHidden id="scaleCol7_6" className={"scaleCol scaleCol7 fakeBorder noAnimation"}>
									<div className="scaleCell">
										<div className="fakeBorder">
											<div>
												<div className="fakeBorder">
													<div>
														<div className="fakeBorder">
															<div>
																<div className="fakeBorder">
																	<div>
																		<div className="fakeBorder">
																			<div>
																				<div className="fakeBorder">
																					<div></div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Col>
							</Row>
							<Row className="show-grid" bsClass="scaleRow bgRulesDontApply bgDarkest altColour overlap">
								<Col md={1} xs={2} id="scaleCol8_1" className={"scaleCellLeftHalf fakeBorder scaleCol8 noAnimation"}>
									<div className="scaleCell">
										<div className="fakeBorder">
											<div>
												<div className="fakeBorder">
													<div>
														<div className="fakeBorder">
															<div>
																<div className="fakeBorder">
																	<div>
																		<div className="fakeBorder">
																			<div>
																				<div className="fakeBorder">
																					<div></div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Col>
								<Col md={2} xs={4} id="scaleCol8_2" className={"scaleCol scaleCol8 fakeBorder noAnimation"}>
									<div className="scaleCell">
										<div className="fakeBorder">
											<div>
												<div className="fakeBorder">
													<div>
														<div className="fakeBorder">
															<div>
																<div className="fakeBorder">
																	<div>
																		<div className="fakeBorder">
																			<div>
																				<div className="fakeBorder">
																					<div></div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Col><Col md={2} xs={4} id="scaleCol8_3" className={"scaleCol scaleCol8 fakeBorder noAnimation"}>
									<div className="scaleCell">
										<div className="fakeBorder">
											<div>
												<div className="fakeBorder">
													<div>
														<div className="fakeBorder">
															<div>
																<div className="fakeBorder">
																	<div>
																		<div className="fakeBorder">
																			<div>
																				<div className="fakeBorder">
																					<div></div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Col><Col md={2} xsHidden smHidden id="scaleCol8_4" className={"scaleCol scaleCol8 fakeBorder noAnimation"}>
									<div className="scaleCell">
										<div className="fakeBorder">
											<div>
												<div className="fakeBorder">
													<div>
														<div className="fakeBorder">
															<div>
																<div className="fakeBorder">
																	<div>
																		<div className="fakeBorder">
																			<div>
																				<div className="fakeBorder">
																					<div></div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Col>
								<Col md={2} xsHidden smHidden id="scaleCol8_5" className={"scaleCol scaleCol8 fakeBorder noAnimation"}>
									<div className="scaleCell">
										<div className="fakeBorder">
											<div>
												<div className="fakeBorder">
													<div>
														<div className="fakeBorder">
															<div>
																<div className="fakeBorder">
																	<div>
																		<div className="fakeBorder">
																			<div>
																				<div className="fakeBorder">
																					<div></div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Col>
								<Col md={2} xsHidden smHidden id="scaleCol8_6" className={"scaleCol scaleCol8 fakeBorder noAnimation"}>
									<div className="scaleCell">
										<div className="fakeBorder">
											<div>
												<div className="fakeBorder">
													<div>
														<div className="fakeBorder">
															<div>
																<div className="fakeBorder">
																	<div>
																		<div className="fakeBorder">
																			<div>
																				<div className="fakeBorder">
																					<div></div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Col>
								<Col md={1} xs={2} id="scaleCol8_7" className={"scaleCellRightHalf fakeBorder scaleCol8 noAnimation"}>
									<div className="scaleCell">
										<div className="fakeBorder">
											<div>
												<div className="fakeBorder">
													<div>
														<div className="fakeBorder">
															<div>
																<div className="fakeBorder">
																	<div>
																		<div className="fakeBorder">
																			<div>
																				<div className="fakeBorder">
																					<div></div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Col>
							</Row>
						</Grid>
						<div id="contentBackground">
							<div id="bottomWaveDarkMargin"></div>
							<div id="gradientDisappearBubble"/>
							<PacmanSection onUserClick={this.handlePacmanClick} show={!this.state.showPacmanModal}/>
						</div>
					</div>
				</ScrollWrapper>
			</div>
		);
	}
}

class PacmanSection extends Component{
	constructor(props){
		super(props);
		
		this.onClick = this.onClick.bind(this);
	}
	onClick(e){
		this.props.onUserClick(e);
	}
	render(){
		if (!this.props.show) {
			return null;
		}
		return(
			<section id="pacmanSection">
				<div>
					<div id="pacmanSectionBubble">
					</div>
					<div id="animatedPacmanContainer" onClick={this.onClick}>
						<div id="animatedPacmanTop">
							<div id="animatedPacmanEye"></div>
						</div>
						<div id="animatedPacmanBottom"></div>
					</div>
					<ChatBubble chat="Click me to play !!!" showImage={false}/>
				</div>
			</section>
		);
	}
}

class ChatBubble extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div id={this.props.assignId} className="chatBubbleContainer">
				<div className="chatBubbleText">{this.props.chat}</div>
				{this.props.showImage && <div className="chatBubbleImage" >
					<div className="chatBubbleImg"/>
					<div className="chatBubbleImg"/>
					<div className="chatBubbleImg"/>
					<div className="chatBubbleImg"/>
					<div className="chatBubbleImg"/>
					<div className="chatBubbleImg"/>
				</div>}
			</div>
		);
	}
}

class ShortcutCupcake extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return <span className='shortcutSpan'>
					<a id='shortcutCupcakeLink'>
					</a><div id='shortcutCupcakeDiv' className='shortcutDiv'></div>
			   </span>;
	}
}

class ShortcutPacman extends Component{
	constructor(props){
		super(props);
		
		this.onClick = this.onClick.bind(this);
	}
	onClick(e){
		this.props.onUserClick(e);
		//<div id='shortcutPacmanDiv' className='shortcutDiv'></div>
	}
	render(){
		return <span className='shortcutSpan' onClick={this.onClick}>
					<a id='shortcutPacmanLink'>
						<div id="shortcutPacmanDiv" className="shortcutDiv" onClick={this.onClick}>
							<div id="shortcutPacmanAnimatedTop">
								<div id="shortcutPacmanEye"/>
							</div>
							<div id="shortcutPacmanAnimatedBottom"></div>
						</div>
					</a>
			   </span>;
	}
}

class MainDescription extends Component{
	render(){
		return (
		<div className="mainDescContainer">
			<section className="mainDesc">
				<h2>An Implementation of </h2>
				<h1>PACMAN in JAVASCRIPT</h1>
				<div className="scallopedEdges top"></div>
				<p>Click on the Pacman below to start.</p> 
				<p>Change the ghost's behaviour to aggressive for a harder workout. </p>
				<p>Enjoy!</p>
				<div className="scallopedEdges bottom"></div>
			</section>
		</div>);
	}
}

class LogoGrid extends Component{
	render(){
		return (
			<section id="logoGridContainer">
				<Grid fluid={true} className="logoGrid">
					<Row className="show-grid">
						<Col xs={6} md={4}><div className="logoRow" id="logoJS"/></Col>
						<Col xs={6} md={4}><div className="logoRow" id="logoCSS"/></Col>
						<Col xs={6} md={4}><div className="logoRow" id="logoNodeJS"/></Col>
						<Col xs={6} md={4}><div className="logoRow" id="logoReact"/></Col>
						<Col xs={6} md={4}><div className="logoRow" id="logoBootstrap"/></Col>
					</Row>
				</Grid>
			</section>
		);
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
		this.props.onUserHideModal();
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

class Fish extends Component{
	constructor(props){
		super(props);
		
		this.state = ({show : true});
	}
	componentWillReceiveProps(nextProps){
		this.setState({'show' : nextProps.show});
	}
	render(){
		//<div id="logoHTML5" className="logoRow"></div>
		var displayValue = this.state.show ? 'block' : 'none';
		var cssObj = { display : displayValue };
		
		return(
			<div id="fish" className="fish" style={cssObj}>
				<div id="fish-direction" className="fish-direction">
					<div className="fishTail"/>
					<div className="fishBody"/>
					<div className="fishFin"/>
					<div className="fishGill"/>
				</div>
				<ChatBubble assignId="fish-chat" chat="" showImage={true}/>
			</div>
		)
	}
}

export default App;
