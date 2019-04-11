import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/es/styles/withStyles";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";

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
            <Button color="inherit">Poul 100</Button>
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
