import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/es/styles/withStyles";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Index extends React.Component {
    render() {
        return <div className={this.props.classes.root}>
            <Grid container spacing={24} justify="center">
                <Grid item xs={4}>
                    <Paper className={this.props.classes.paper}>xs=12</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={this.props.classes.paper}>xs=12</Paper>
                </Grid>
            </Grid>
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
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index));
