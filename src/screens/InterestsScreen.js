import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import { connect } from 'react-redux';

import * as constants from '../constants';
import * as actions from '../actions';
import Header from '../components/Header';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';

class InterestsScreen extends Component {
  onSubmitPressed = () => {
    if (this.props.currentUser.interestName === '') {
      Alert.alert(
        'Oops',
        'Please pick an interest'
      );
      return;
    }
    this.props.navigation.navigate('signUp');
  }

  renderInterests() {
    const { primarySubcategories, currentUser } = this.props;

    const interestsJsx = primarySubcategories.map(subcategory =>
      <RadioButton
        labelText={subcategory.interestName}
        selected={(subcategory.udemySubcategory === currentUser.interestName)}
        onPress={() => this.props.selectInterest(subcategory.udemySubcategory)}
        key={subcategory.udemySubcategory}
      />
    );
    return interestsJsx;
  }

  render() {
    const { title, interestsListContainer, button } = styles;

    return (
      <View style={{ flex: 1 }}>
        <Header
          mode='onboarding'
          onPressLogo={() => this.props.navigation.navigate('title')}
        />
        <Text style={title}>
          What are you interested in?
        </Text>
        <View style={interestsListContainer}>
          {this.renderInterests()}
        </View>
        <View style={button}>
          <Button
            buttonText='Yes'
            onPress={this.onSubmitPressed}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: constants.TITLE_FONT_SIZE,
    color: constants.BLACK_COLOR,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30
  },
  interestsListContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 50,
    paddingTop: 30
  },
  button: {
    zIndex: 50,
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    bottom: 30,
    height: 80
  }
});

function mapStateToProps({ data, currentUser }) {
  return {
    primarySubcategories: data.primarySubcategories,
    currentUser
  };
}

export default connect(mapStateToProps, actions)(InterestsScreen);
