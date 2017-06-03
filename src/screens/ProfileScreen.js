import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import * as helpers from '../helpers';
import * as actions from '../actions';
import * as constants from '../constants';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';
import ProfileIcon from '../icons/ProfileIcon';
import ScreenContainer from '../components/ScreenContainer';
import ProfilePhoto from '../components/ProfilePhoto';
import Course from '../components/Course';
import AddCourse from '../components/AddCourse';

class ProfileScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <ProfileIcon
        color={tintColor}
      />
    )
  }

  state = {
    photoLoading: false,
  }

  componentWillReceiveProps(nextProps) {
    console.log('component will receive props:');
    console.log(nextProps.isGood);
  }

  logOut = () => {
    this.props.logOutUser();
  }

  showImagePicker = () => {
    const imageOptions = {
      title: 'Choose a photo',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      allowsEditing: true,
      maxWidth: 200,
      maxHeight: 200,
      quality: 0.8
    };

    this.setState({
      photoLoading: true
    });

    ImagePicker.showImagePicker(imageOptions, (response) => {
      if (response.didCancel) {
        this.setState({
          photoLoading: false
        });
      } else if (response.error) {
        this.setState({
          photoLoading: false
        });
      } else {
        helpers.uploadImage(response.uri, this.props.uid)
          .then(() => {
            this.props.refreshUserState();
            this.setState({
              photoLoading: false
            });
          })
          .catch(() => {
            Alert.alert(
              'Oops',
              'There was an error uploading your photo. Please try again.'
            );
          });
      }
    });
  }

  toggleGoodStatus = () => {
    let alertMessage = 'Crap... out of a job and ready to learn something new?';
    if (!this.props.isGood.isGood) {
      alertMessage = 'If you\'ve got a job and are ready to be a success story, click Yes.';
    }
    // Alert will have to be customized for Android
    Alert.alert(
      'You sure?',
      alertMessage,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => this.props.toggleGoodStatus() },
      ],
    );
  }

  renderProfilePhoto() {
    if (this.state.photoLoading) {
      return (
        <ActivityIndicator
          size="large"
          style={styles.activityIndicator}
        />
      );
    }
    return (
      <ProfilePhoto
        size="large"
        photoUid={this.props.uid}
      />
    );
  }

  renderSavedCourses() {
    const reversedArray = _.reverse(this.props.savedCourses);

    return (
      <View style={{ flex: 1 }}>
        {reversedArray.map(courseId => {
          return (
            <Course
              id={courseId}
              style={{ marginBottom: 20 }}
              key={courseId}
            />
          );
        })}
      </View>
    );
  }

  render() {
    const {
      profilePhoto,
      goodContainer,
      username,
      goodLabel,
      goodRadioButton,
      coursesContainer,
      coursesLabel
    } = styles;

    return (
      <ScreenContainer
        navigation={this.props.navigation}
      >
        <View
          style={{ flex: 1 }}
          key={this.props.uid}
        >
          <View
            style={profilePhoto}
          >
            <TouchableOpacity
              onPress={this.showImagePicker}
              key={this.props.profilePhotoUrl}
            >
              {this.renderProfilePhoto()}
            </TouchableOpacity>
          </View>
          <Text style={username}>{this.props.username}</Text>
          <View style={goodContainer}>
            <Text style={goodLabel}>
              Got a job?
            </Text>
            <RadioButton
              labelText="I'm good!"
              selected={this.props.isGood.isGood}
              onPress={this.toggleGoodStatus}
              style={goodRadioButton}
            />
          </View>
          <View
            style={coursesContainer}
          >
            <Text style={coursesLabel}>
              Your courses:
            </Text>
            <AddCourse />
            {this.renderSavedCourses()}
          </View>
          <Button
            onPress={this.logOut}
            buttonText="Log out"
          />
        </View>
      </ScreenContainer>
    );
  }
}

const styles = StyleSheet.create({
  profilePhoto: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 150
  },
  activityIndicator: {
    marginTop: 60,
    marginBottom: 54
  },
  username: {
    fontSize: constants.BODY_FONT_SIZE,
    color: constants.BLACK_COLOR,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 15,
    paddingBottom: 20
  },
  goodContainer: {
    flexDirection: 'row',
    minWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  goodLabel: {
    color: constants.LIGHT_GRAY_COLOR,
    fontSize: constants.BODY_FONT_SIZE
  },
  goodRadioButton: {
    marginLeft: 20,
    paddingTop: 20
  },
  coursesContainer: {
    flex: 1,
    paddingBottom: 30
  },
  coursesLabel: {
    flex: 1,
    color: constants.LIGHT_GRAY_COLOR,
    fontSize: constants.BODY_FONT_SIZE,
    marginBottom: 20,
    textAlign: 'center'
  }
});

function mapStateToProps({ currentUser }) {
  return {
    profilePhotoUrl: currentUser.profilePhotoUrl,
    uid: currentUser.uid,
    username: currentUser.username,
    isGood: currentUser.isGood,
    savedCourses: currentUser.savedCourses
  };
}

export default connect(mapStateToProps, actions)(ProfileScreen);
