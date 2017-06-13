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
		});
		
		this.handleNavSelect = this.handleNavSelect.bind(this);
		this.handlePacmanClick = this.handlePacmanClick.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.hidePacmanModal = this.hidePacmanModal.bind(this);
	}
	
	componentDidMount(){
		kickStartAnimateScales();
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
	}
	
	hidePacmanModal(){
		if (confirm('Are you sure you want to leave this game?')){
			this.setState({showPacmanModal: false});
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
				
				<DialogPacman show={this.state.showPacmanModal} onUserHideModal={this.hidePacmanModal} />
				
				<ScrollWrapper onWindowScroll={this.handleScroll}>
					<div id="introBackground">
						<div id="emptySpace"></div>
						<Grid fluid={true} className="scalesContainer">
							<Row className="show-grid" bsClass="scaleRow">
								<Col md={2} xs={4} id="scaleCol1_1" className={"scaleCol scaleCol1 bgGrey"} ><div className="scaleCell"><div><div><div className="ring3"><div className="ring2"><div className="ring1"></div></div></div></div></div></div><Bubble show={!this.state.showPacmanModal} /></Col>
								<Col md={2} xs={4} id="scaleCol1_2" className={"scaleCol scaleCol1"} ><div className="scaleCell"><div><div><div className="ring3"><div className="ring2"><div className="ring1"></div></div></div></div></div></div><Bubble show={!this.state.showPacmanModal}/><Bubble show={!this.state.showPacmanModal}/></Col>
								<Col md={2} xs={4} id="scaleCol1_3" className={"scaleCol scaleCol1"} ><div className="scaleCell"><div><div><div className="ring3"><div className="ring2"><div className="ring1"></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol1_4" className={"scaleCol scaleCol1 bgGrey"} ><div className="scaleCell"><div><div><div className="ring3"><div><div></div></div></div></div></div></div><Bubble show={!this.state.showPacmanModal}/></Col>
								<Col md={2} xsHidden smHidden id="scaleCol1_5" className={"scaleCol scaleCol1 bgBlush"} ><div className="scaleCell"><div><div><div className="ring3"><div><div></div></div></div></div></div></div><Bubble show={!this.state.showPacmanModal}/></Col>
								<Col md={2} xsHidden smHidden id="scaleCol1_6" className={"scaleCol scaleCol1 bgAqua"} ><div className="scaleCell"><div><div><div className="ring3"><div><div></div></div></div></div></div></div></Col>
							</Row>
							<Row className="show-grid" bsClass="scaleRow altColour overlap">
								<Col md={1} xs={2} id="scaleCol2_1" className={"scaleCellLeftHalf scaleCol2"} ><div className="scaleCell"><div><div><div className="ring3"><div className="ring2"><div className="ring1"></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol2_2" className={"scaleCol scaleCol2 bgGrey"} ><div className="scaleCell"><div><div><div className="ring3"><div className="ring2"><div className="ring1"></div></div></div></div></div></div><Bubble show={!this.state.showPacmanModal}/><Bubble show={!this.state.showPacmanModal}/></Col>
								<Col md={2} xs={4} id="scaleCol2_3" className={"scaleCol scaleCol2 bgGrey"} ><div className="scaleCell"><div><div><div className="ring3"><div className="ring2"><div className="ring1"></div></div></div></div></div></div><ShortcutPacman onUserClick={this.handlePacmanClick}/></Col>
								<Col md={2} xsHidden smHidden id="scaleCol2_4" className={"scaleCol scaleCol2"} ><div className="scaleCell"><div><div><div><div className="ring3"><div><div></div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol2_5" className={"scaleCol scaleCol2"} ><div className="scaleCell"><div><div><div><div className="ring3"><div><div></div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol2_6" className={"scaleCol scaleCol2 bgBlush"} ><div className="scaleCell"><div><div><div><div className="ring3"><div><div></div></div></div></div></div></div></div><Bubble show={!this.state.showPacmanModal}/><Bubble show={!this.state.showPacmanModal}/></Col>
								<Col md={1} xs={2} id="scaleCol2_7" className={"scaleCellRightHalf scaleCol2"} ><div className="scaleCell"><div><div><div><div className="ring3"><div><div></div></div></div></div></div></div></div></Col>
							</Row>
							<Row className="show-grid" bsClass="scaleRow overlap">
								<Col md={2} xs={4} id="scaleCol3_1" className={"scaleCol scaleCol3"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol3_2" className={"scaleCol scaleCol3"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble show={!this.state.showPacmanModal}/></Col>
								<Col md={2} xs={4} id="scaleCol3_3" className={"scaleCol bgAqua scaleCol3"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble show={!this.state.showPacmanModal}/></Col>
								<Col md={2} xsHidden smHidden id="scaleCol3_4" className={"scaleCol scaleCol3"} ><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div><Bubble show={!this.state.showPacmanModal}/></Col>
								<Col md={2} xsHidden smHidden id="scaleCol3_5" className={"scaleCol scaleCol3"} ><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div><Bubble show={!this.state.showPacmanModal}/><Bubble show={this.state.showPacmanModal}/><Tentacle /></Col>
								<Col md={2} xsHidden smHidden id="scaleCol3_6" className={"scaleCol scaleCol3"} ><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div></Col>
							</Row>
							<Row className="show-grid" bsClass="scaleRow altColour overlap">
								<Col md={1} xs={2} id="scaleCol4_1" className={"scaleCellLeftHalf scaleCol4"}><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol4_2" className={"scaleCol bgAqua scaleCol4"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol4_3" className={"scaleCol bgAqua scaleCol4"}><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div><Bubble show={!this.state.showPacmanModal}/></Col>
								<Col md={2} xsHidden smHidden id="scaleCol4_4" className={"scaleCol bgGrey scaleCol4"}><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol4_5" className={"scaleCol scaleCol4"}><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div><ShortcutCupcake/><Bubble show={!this.state.showPacmanModal}/></Col>
								<Col md={2} xsHidden smHidden id="scaleCol4_6" className={"scaleCol scaleCol4"}><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div></Col>
								<Col md={1} xs={2} id="scaleCol4_7" className={"scaleCellRightHalf scaleCol4"}><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div></Col>
							</Row>
							<Row className="show-grid" bsClass="scaleRow overlap">
								<Col md={2} xs={4} id="scaleCol5_1" className={"scaleCol scaleCol5"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble show={!this.state.showPacmanModal}/></Col>
								<Col md={2} xs={4} id="scaleCol5_2" className={"scaleCol bgAqua scaleCol5"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol5_3" className={"scaleCol scaleCol5"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble show={!this.state.showPacmanModal}/><Bubble show={!this.state.showPacmanModal}/><Bubble show={!this.state.showPacmanModal}/></Col>
								<Col md={2} xsHidden smHidden id="scaleCol5_4" className={"scaleCol scaleCol5"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble show={!this.state.showPacmanModal}/></Col>
								<Col md={2} xsHidden smHidden id="scaleCol5_5" className={"scaleCol bgGrey scaleCol5"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble show={!this.state.showPacmanModal}/><Bubble show={!this.state.showPacmanModal}/></Col>
								<Col md={2} xsHidden smHidden id="scaleCol5_6" className={"scaleCol scaleCol5"}><div className="scaleCell"><div><div><div><div><div><div></div></div></div></div></div></div></div></Col>
							</Row>
							<Row className="show-grid" bsClass="scaleRow altColour overlap">
								<Col md={1} xs={2} id="scaleCol6_1" className={"scaleCellLeftHalf scaleCol6"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol6_2" className={"scaleCol scaleCol6"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xs={4} id="scaleCol6_3" className={"scaleCol bgAqua scaleCol6"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol6_4" className={"scaleCol bgAqua scaleCol6"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol6_5" className={"scaleCol bgBlush scaleCol6"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
								<Col md={2} xsHidden smHidden id="scaleCol6_6" className={"scaleCol bgGrey scaleCol6"}><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div><Bubble show={!this.state.showPacmanModal}/></Col>
								<Col md={1} xs={2} id="scaleCol6_7" className={"scaleCellRightHalf scaleCol6"} ><div className="scaleCell"><div><div><div><div><div></div></div></div></div></div></div></Col>
							</Row>
							<Row className="show-grid" bsClass="scaleRow bgRulesDontApply bgGradient altColour overlap">
								<Col md={2} xs={4} id="scaleCol7_1" className={"scaleCol scaleCol7 fakeBorder"}>
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
								<Col md={2} xs={4} id="scaleCol7_2" className={"scaleCol scaleCol7 fakeBorder"}>
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
								</Col><Col md={2} xs={4} id="scaleCol7_3" className={"scaleCol scaleCol7 fakeBorder"}>
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
								</Col><Col md={2} xs={4} id="scaleCol7_4" className={"scaleCol scaleCol7 fakeBorder"}>
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
								</Col><Col md={2} xs={4} id="scaleCol7_5" className={"scaleCol scaleCol7 fakeBorder"}>
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
								<Col md={2} xs={4} id="scaleCol7_6" className={"scaleCol scaleCol7 fakeBorder"}>
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
								<Col md={1} xs={2} id="scaleCol8_1" className={"scaleCellLeftHalf fakeBorder scaleCol8"}>
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
								<Col md={2} xs={4} id="scaleCol8_2" className={"scaleCol scaleCol8 fakeBorder"}>
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
								</Col><Col md={2} xs={4} id="scaleCol8_3" className={"scaleCol scaleCol8 fakeBorder"}>
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
								</Col><Col md={2} xs={4} id="scaleCol8_4" className={"scaleCol scaleCol8 fakeBorder"}>
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
								<Col md={2} xs={4} id="scaleCol8_5" className={"scaleCol scaleCol8 fakeBorder"}>
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
								<Col md={2} xs={4} id="scaleCol8_6" className={"scaleCol scaleCol8 fakeBorder"}>
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
								<Col md={1} xs={2} id="scaleCol8_7" className={"scaleCellRightHalf fakeBorder scaleCol8"}>
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
							<Row>
								<Col md={12} className="contentRow">
									<div id="contentBackground">
										<PacmanSection />
										<nav id="sandyBottomContainer" className="navbar navbar-inverse navbar-fixed-bottom">
											<div id="sandyBottom"></div>
											<Bubble show={!this.state.showPacmanModal}/>
										</nav>
									</div>
								</Col>
							</Row>
						</Grid>
						
					</div>
				</ScrollWrapper>
			</div>
		);
	}
}

class PacmanSection extends Component{
	render(){
		return(
			<section id="sectionPacman">
				<div id="contentPacman">
					<div id="animatedPacmanContainer">
						<div id="animatedPacmanTop"></div>
						<div id="animatedPacmanBottom"></div>
					</div>
					<div id="labelPlayPacman">click to play</div>
				</div>
			</section>
		);
	}
}

class Tentacle extends Component{
	render(){
		return (
			<div className="tentacle">
				<div className="tentacleBend">
					<div className="tentacleBend">
						<div className="tentacleBend">
							<div className="tentacleBend">
								<div className="tentacleBend">
									<div className="tentacleBend">
										<div className="tentacleBend">
											<div className="tentacleBend">
												<div className="tentacleBendOther2">
													<div className="tentacleBendOther2">
														<div className="tentacleBendOther2">
															<div className="tentacleBendOther2">
																<div className="tentacleBendOther2">
																	<div className="tentacleBendOther2">
																		<div className="tentacleBendOther2">
																			<div className="tentacleBendOther2">
																				<div className="tentacleBendOther2">
																					<div className="tentacleBendOther2">
																						<div className="tentacleBendOther2">
																							<div className="tentacleBendOther2">
																								<div className="tentacleBendOther2">
																									<div className="tentacleBendOther2">
																										<div className="tentacleBendOther2">
																											<div className="tentacleBendOther">
																												<div className="tentacleBendOther">
																													<div className="tentacleBendOther">
																														<div className="tentacleBendOther">
																															<div className="tentacleBendOther">
																																<div className="tentacleBendOther">
																																	<div className="tentacleBendOther">
																																		<div className="tentacleBendOther">
																																			<div className="tentacleBendOther">
																																				<div className="tentacleBendOther">
																																					<div className="tentacleBendOther">
																																						<div className="tentacleBendOther">
																																							<div className="tentacleBendOther">
																																								<div className="tentacleBendOther">
																																									<div className="tentacleBendOther">
																																										<div className="tentacleBendOther">
																																											<div className="tentacleBendOther">
																																												<div className="tentacleBendOther">
																																													<div className="tentacleBendOther">
																																														<div className="tentacleBendOther">
																																															<div className="tentacleBendOther">
																																																<div className="tentacleBendOther">
																																																	<div className="tentacleBendOther">
																																																		<div className="tentacleBendOther">
																																																			<div className="tentacleBendOther">
																																																				<div className="tentacleBendOther">
																																																					<div className="tentacleBendOther">
																																																						<div className="tentacleBendOther">
																																																							<div className="tentacleBendOther">
																																																								<div className="tentacleBendOther">
																																																									<div className="tentacleBendOther">
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
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
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
		// Generate a random animation speed class from 1,2,3,4
		var animationClass = Math.round(Math.random() * 4 + 1);
		
		this.expand = true;
		
		this.state = ({
			intervalId: null,
			x: startX,
			y: startY,
			startX: startX,
			startY: startY,
			diameter: startDiameter,
			startDiameter: startDiameter,
			opacity: 1,
			animationClass: "bubbleSpeed"+animationClass
		});
		this.updateBubblePosition;
	}
	componentDidMount() {
		/*
		// Random interval between 20-55 milisecs
		var randomInterval = Math.round(Math.random() * (55-20) + 20);
		this.timerID = setInterval(
		  () => this.updateBubblePosition(),
		  randomInterval
		);
		*/
	}
	componentWillUnmount() {
		//clearInterval(this.timerID);
	}
	/*
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
	}*/
	render(){
		if (!this.props.show) {
			return null;
		}
		
		var bubbleStyle = {
			right: this.state.x+"%",
			top: this.state.y+"%",
			width: this.state.diameter,
			height: this.state.diameter,
			opacity: this.state.opacity
		}
		
		return <div className={'scaleBubble '+this.state.animationClass} style={bubbleStyle} ></div>;
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
	}
	render(){
		return <span className='shortcutSpan' onClick={this.onClick}>
					<a id='shortcutPacmanLink'>
					</a><div id='shortcutPacmanDiv' className='shortcutDiv'></div>
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

export default App;
