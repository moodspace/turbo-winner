import React from 'react';
import ReactDOM from 'react-dom';
import {DefaultRoute, Link, Route, RouteHandler} from 'react-router';
import {TextField, FlatButton, RaisedButton, Dialog, Snackbar} from 'material-ui';
import {Row, Col} from 'elemental';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import Theme from '../theme.js';
import Colors from 'material-ui/lib/styles/colors';
import $ from 'jquery';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bid: 750,
      netid: "",
      note: "",
      showInstant: true,
      message: "",
      snackIsOpen: false,
      modalIsOpen: false,
      errorText1: "",
      errorText2: "",
      count: props.initialCount
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleSnack = this.toggleSnack.bind(this);
    this.handleBid = this.handleBid.bind(this);
    this.handleNote = this.handleNote.bind(this);
    this.handleNetID = this.handleNetID.bind(this);
    this.placeBid = this.placeBid.bind(this);
  }

  //the key passed through context must be called "muiTheme"
  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(Theme)};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  placeBid() {
    var bid = this.state.bid;
    var netid = this.state.netid;
    var note = this.state.note;
    var updateMessage = (msg) => {
      this.setState({
        message: msg.match(/(error)|(not)|(invalid)|(fail)/i)
          ? `An error occured: ${msg}`
          : `Congrats, ${msg}`,
        snackIsOpen: true
      });
    }
    this.serverRequest = $.ajax({
      url: 'http://127.0.0.1:27942/bid-submit',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({bid: bid, netid: netid, note: note}),
      success: function(data) {
        updateMessage(data.toString());
      }
    });
    this.toggleModal();
  }

  componentWillUnmount() {
    if (this.serverRequest) {
      this.serverRequest.abort();
    }
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  toggleSnack() {
    this.setState({
      snackIsOpen: !this.state.snackIsOpen
    });
  }

  handleBid(event) {
    var valueInt = parseInt(event.target.value, 10);
    if (isNaN(valueInt) || valueInt === 0) {
      valueInt = 0;
      this.state.errorText2 = "Check your input.";
    } else {
      this.state.errorText2 = "";
    }
    this.setState({
      bid: valueInt,
      showInstant: valueInt >= 750
    });
  }

  handleNetID(event) {
    var value = event.target.value;
    if (value.toString() === "") {
      this.state.errorText1 = "This field is required.";
    } else if (!value.toString().match(/^[a-z]{2,3}[0-9]{2,3}$/)) {
      this.state.errorText1 = "Enter your Cornell NetID.";
    } else {
      this.state.errorText1 = "";
    }
    this.setState({netid: value});
  }

  handleNote(event) {
    var value = event.target.value;
    this.setState({note: value});
  }

  render() {
    let action0 = (<FlatButton label="Reserve" secondary={true} onTouchTap={this.placeBid}/>);
    let action1 = (<FlatButton label="Instant lease" primary={true} onTouchTap={this.placeBid} style={{
      color: Theme.palette.secondary1Color
    }}/>);
    let action = this.state.showInstant
      ? action1
      : action0;
    let actionCancel = (<FlatButton label="Cancel" primary={true} onTouchTap={this.toggleModal} style={{
      color: Theme.palette.primary2Color
    }}/>);
    let actions = [actionCancel, action];

    return (
      <div style={{
        backgroundImage: "url('res/bg.jpg')",
        height: "100vh",
        backgroundSize: "cover"
      }}>
        <Row id="container">
          <Col xs="0" sm="0" md="6/12" id="left-container">
            <Row id="square1" className="square-wrapper">
              <div className="square"></div>
              <div className="square-text">513 Dryden Rd is located in the heart of Collegetown, 7 min. walk to the Engineering Quad. You will live in this three story house with other 5 residents, or fewer due to the break.</div>
            </Row>
            <Row id="square2" className="square-wrapper">
              <div className="square"></div>
              <div className="square-text">The lease starts after the final week and ends at noon on August 19, 2016. Longer stay for whatever reason is not allowed. Parking is not guaranteed, but you can always take TCAT after a short walk.</div>
            </Row>
            <Row id="square3" className="square-wrapper">
              <div className="square"></div>
              <div className="square-text">The room allows one person only (sorry!) Notice you need to bring your own bedding. There are 2.5 baths located in the house, as well as a kitchen and living area. House tour is first come first served.</div>
            </Row>
          </Col>
          <Col xs="1" sm="1" md="5/12">
            <Row>
              <Col xs="0" sm="0" md="3/7">
                <span id="typewriter-filler">&nbsp;</span>
                <span className="right-aligned" id="typewriter"></span>
              </Col>
              <Col xs="1" sm="1" md="4/7">
                <h1 className="center" id="header">513 Dryden</h1>
              </Col>
            </Row>
            <Row>
              <Col xs="1" sm="1" md="1" className="center">
                <RaisedButton style={{
                  height: "56px",
                  minWidth: "120px"
                }} labelStyle={{
                  letterSpacing: "0.1em",
                  fontFamily: "'Montserrat', sans-serif"
                }} className="center" onTouchTap={this.toggleModal} label="Reserve" secondary={true}/>
              </Col>
            </Row>
          </Col>
          <Col xs="0" sm="0" md="1/12"></Col>
        </Row>

        <Dialog title="Place your bid" actions={actions} modal={true} open={this.state.modalIsOpen || false} onRequestClose={this.toggleModal}>
          <Row>
            <Col xs="1" sm="1" md="1">
              By placing a bid, you're committing to pay at least the same amount if you win.
              Bidder list will be reset every week. If you have not been contacted, or
              wish to get a better chance, update your bid using the same NetID. Forgery is
              subject to criminal charges. The amount below is the monthly rate. By submitting
              this form, you authorize me to use your contact information as appropriate. This
              is NOT a lease.
            </Col>
          </Row>
          <Row>
            <Col xs="1/2" sm="1/2" md="1/5">
              <TextField errorText={this.state.errorText1} value={this.state.netid} fullWidth={true} floatingLabelText="NetID" hintText="e.g. ab123" name="netid" onChange={this.handleNetID}/>
            </Col>
            <Col xs="1/2" sm="1/2" md="1/5">
              <TextField errorText={this.state.errorText2} value={this.state.bid} fullWidth={true} floatingLabelText="Bid" name="bid-amount" onChange={this.handleBid}/>
            </Col>
            <Col xs="1" sm="1" md="3/5">
              <TextField value={this.state.note} fullWidth={true} floatingLabelText="Note" name="additional-info" onChange={this.handleNote}/>
            </Col>
          </Row>
        </Dialog>
        <Snackbar open={this.state.snackIsOpen} message={this.state.message} action="dismiss" autoHideDuration={3000} onRequestClose={this.toggleSnack} onActionTouchTap={this.toggleSnack}/>
      </div>
    );
  }
}

export default Landing;
