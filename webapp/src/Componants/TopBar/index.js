import React from 'react';
import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar/index";
import Toolbar from "@material-ui/core/Toolbar/index";
import Typography from "@material-ui/core/Typography/index";
import Button from "@material-ui/core/Button/index";
import withStyles from "@material-ui/core/es/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress/index";
import {bindActionCreators} from "redux";
import * as bleActions from '../../actions/bleActions'
import {connect} from "react-redux";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Index extends React.Component {
    render() {
        return <div className={this.props.classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={this.props.classes.grow}>
                        Oxymètre de formation
                    </Typography>
                    { !this.props.ble.connected && !this.props.ble.isConnecting && (<Button color="inherit" onClick={this.props.bleActions.connect}>Connecter</Button>) }
                    { this.props.ble.connected && (<Button color="inherit" onClick={this.props.bleActions.disconnect}>Déconnexion</Button>) }
                    { this.props.ble.isConnecting && (<CircularProgress color="inherit" size={20} />) }
                </Toolbar>
            </AppBar>
        </div>;
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
    bleActions: PropTypes.object,
    ble: PropTypes.object
};

function mapStateToProps(state) {
    return {
        ble: state.ble
    };
}

function mapDispatchToProps(dispatch) {
    return {
        bleActions: bindActionCreators(bleActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index));
