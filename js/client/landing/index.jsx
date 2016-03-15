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
      count: props.initialCount
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  //the key passed through context must be called "muiTheme"
  static childContextTypes = {
    muiTheme: React.PropTypes.object,
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

  render() {
    const actions = [ < FlatButton label = "Reserve" secondary = {
        true
      }
      onTouchTap = {
        this.toggleModal
      } />, < FlatButton label = "Instant lease" primary = {
        true
      }
      onTouchTap = {
        this.toggleModal
      }
      style = {
        {
          color: Theme.palette.secondary1Color
        }
      } />
    ];

    return (
      <div style={{
        backgroundImage: "url('res/bg.jpg')",
        height: "100vh",
        backgroundSize: "cover"
      }}>
        <Row>
          <Col sm="4/9"></Col>
          <Col sm="4/9">
            <Row>
              <Col sm="3/7">
                <span className="right-aligned" id="typewriter"></span>
              </Col>
              <Col sm="4/7">
                <h1 className="right" id="header">513 Dryden</h1>
              </Col>
            </Row>
          </Col>
          <Col sm="1/9"></Col>
        </Row>
        <Row>
          <Col sm="4/9"></Col>
          <Col sm="4/9">
            <RaisedButton style={{
              height: "56px",
              minWidth: "120px"
            }} labelStyle={{
              letterSpacing: "0.1em",
              fontFamily: "'Montserrat', sans-serif"
            }} className="right" onClick={this.toggleModal} label="Reserve" secondary={true}/>
          </Col>
          <Col sm="1/9"></Col>
        </Row>
        <Dialog title="Leave your contact info below" actions={actions} modal={true} open={this.state.modalIsOpen || false} onRequestClose={this.toggleModal}>
          <Row>
            <Col sm="1/5">
              <TextField fullWidth={true} floatingLabelText="NetID" hintText="e.g. ab123" name="netid"/>
            </Col>
            <Col sm="4/5">
              <TextField fullWidth={true} floatingLabelText="Note" name="additional-info"/>
            </Col>
          </Row>
        </Dialog>
      </div>
    );
  }
}

export default Landing;
