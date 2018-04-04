import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

class NavBarItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: props.inited ? props.label : 'Welcome, below you will find all of the routes for this transit authority'
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inited) {
      this.setState({ label: nextProps.label });
    }

    if (this.props.inited && (nextProps.label !== this.props.label)) {
      this.setState({ label: nextProps.label });
    }
  }

  render() {
    const { iconName, onPress } = this.props;
    return (
      <TouchableOpacity
        accessible={true}
        style={{ paddingHorizontal: 20 }}
        onPress={() => onPress()}
        accessibilityLabel={this.state.label}
      >
        <Text>Back</Text>
      </TouchableOpacity>

    );
  }
}

NavBarItem.propTypes = {
  iconName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { inited } = state.prefReducer;

  return { inited };
}

export default connect(mapStateToProps)(NavBarItem);
