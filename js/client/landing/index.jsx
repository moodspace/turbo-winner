import React from 'react';
import ReactDOM from 'react-dom';
import {DefaultRoute, Link, Route, RouteHandler} from 'react-router';
import {TextField, FlatButton, RaisedButton, Dialog, Snackbar} from 'material-ui';
import {Row, Col} from 'elemental';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from '../theme.js';
import Colors from 'material-ui/lib/styles/colors';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bid: 750,
      showInstant: true,
      count: props.initialCount
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleBid = this.handleBid.bind(this);
  }

  //the key passed through context must be called "muiTheme"
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext() {
    return {muiTheme: ThemeManager.getMuiTheme(Theme)};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  handleBid(event) {
    var valueInt = parseInt(event.target.value, 10);
    if (isNaN(valueInt)) {
      valueInt = 0;
    }
    this.setState({
      bid: valueInt,
      showInstant: valueInt >= 750
    });
  }

  render() {
    let action0 = (<FlatButton label="Reserve" secondary={true} onTouchTap={this.toggleModal}/>);
    let action1 = (<FlatButton label="Instant lease" primary={true} onTouchTap={this.toggleModal} style={{
      color: Theme.palette.secondary1Color
    }}/>);
    let action = this.state.showInstant ? action1 : action0;
    let actionCancel = (<FlatButton label="Cancel" primary={true} onTouchTap={this.toggleModal} style={{
      color: Theme.palette.primary3Color
    }}/>);
    let actions = [actionCancel,action];

    return (
      <div style={{
        backgroundImage: "url('res/bg.jpg')",
        height: "100vh",
        backgroundSize: "cover"
      }}>
        <Row>
          <Col xs="0" sm="0" md="4/9"></Col>
          <Col xs="1" sm="1" md="4/9">
            <Row>
              <Col xs="1" sm="1" md="3/7">
                <span className="right-aligned" id="typewriter"></span>
              </Col>
              <Col xs="1" sm="1" md="4/7">
                <h1 className="center" id="header">513 Dryden</h1>
              </Col>
            </Row>
          </Col>
          <Col xs="0" sm="0" md="1/9"></Col>
        </Row>
        <Row>
          <Col xs="0" sm="0" md="4/9"></Col>
          <Col xs="1" sm="1" md="4/9" className="center">
            <RaisedButton style={{
              height: "56px",
              minWidth: "120px"
            }} labelStyle={{
              letterSpacing: "0.1em",
              fontFamily: "'Montserrat', sans-serif"
            }} className="center" onTouchTap={this.toggleModal} label="Reserve" secondary={true}/>
          </Col>
          <Col xs="0" sm="0" md="1/9"></Col>
        </Row>
        <Dialog title="Place your bid" actions={actions} modal={true} open={this.state.modalIsOpen || false} onRequestClose={this.toggleModal}>
          <Row>
            <Col xs="1/2" sm="1/2" md="1/5">
              <TextField fullWidth={true} floatingLabelText="NetID" hintText="e.g. ab123" name="netid"/>
            </Col>
            <Col xs="1/2" sm="1/2" md="1/5">
              <TextField value={this.state.bid} fullWidth={true} floatingLabelText="Bid" name="bid-amount" onChange={this.handleBid}/>
            </Col>
            <Col xs="1" sm="1" md="3/5">
              <TextField fullWidth={true} floatingLabelText="Note" name="additional-info"/>
            </Col>
          </Row>
        </Dialog>
      </div>
    );
  }
}

export default Landing;
