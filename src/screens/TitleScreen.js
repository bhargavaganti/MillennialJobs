import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import * as constants from '../constants';
import Button from '../components/Button';

class TitleScreen extends Component {
  render() {
    const {
      viewContainer,
      backgroundImageContainer,
      title,
      button,
      subtitle,
      loginContainer,
      loginText,
      loginButton
    } = styles;

    return (
      <View style={viewContainer}>
        <StatusBar barStyle="light-content" />
        <View style={backgroundImageContainer}>
          <Image
            source={require('../images/money.jpg')}
          />
        </View>
        <Text style={title}>F{'\''}ed</Text>
        <Text style={subtitle}>Welcome. {'\n'}Let{'\''}s get you a job.</Text>
        <View style={button}>
          <Button
            onPress={() => {}}
            size='large'
            buttonText='Why not'
          />
        </View>
        <TouchableOpacity style={loginContainer}>
          <Text style={loginText}>Already have an account? </Text>
          <Text style={loginButton}>Log in</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: constants.BLACK_COLOR
  },
  title: {
    fontFamily: constants.TITLE_FONT_FAMILY,
    zIndex: 50,
    color: constants.WHITE_COLOR,
    fontSize: 144,
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginTop: 80
  },
  subtitle: {
    fontSize: constants.TITLE_FONT_SIZE,
    color: constants.WHITE_COLOR,
    textAlign: 'center',
    marginTop: 120,
    marginBottom: 25,
    zIndex: 50,
    backgroundColor: 'transparent'
  },
  backgroundImageContainer: {
    zIndex: -10,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.41
  },
  button: {
    zIndex: 50
  },
  loginContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    height: 30,
    zIndex: 50,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loginText: {
    color: constants.WHITE_COLOR,
    fontSize: constants.BODY_FONT_SIZE
  },
  loginButton: {
    color: constants.GREEN_COLOR,
    fontSize: constants.BODY_FONT_SIZE
  }
});

export default TitleScreen;
