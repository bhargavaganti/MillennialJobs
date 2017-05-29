import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import * as constants from '../constants';
import Button from './Button';

class Course extends Component {
  static defaultProps = {
    imageUri: '',
    title: '',
    description: '',
    rating: '',
    url: ''
  }

  render() {
    const {
      container,
      imageTitleContainer,
      image,
      title,
      description,
      ratingButtonContainer,
      rating,
      button
    } = styles;

    return (
      <View style={container}>
        <View style={imageTitleContainer}>
          <Image
            style={image}
            source={{ uri: 'http://udemy-images.udemy.com/course/50x50/1172996_0241_5.jpg' }}
            resizeMode="contain"
          />
          <Text style={title}>
            Advanced React Native
          </Text>
        </View>
        <Text style={description}>
          Master the advanced topics of React Native: Animations, Maps,
          Notifications, Navigation and More stuff going to the right!
        </Text>
        <View style={ratingButtonContainer}>
          <Text style={rating}>
            4.7 stars
          </Text>
          <View style={button}>
            <Button
              size="small"
              onPress={() => {}}
              buttonText="Go"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: constants.LIGHT_GRAY_COLOR,
    padding: 15,
    flexDirection: 'column'
  },
  imageTitleContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 13
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderWidth: 1,
    borderColor: constants.DARK_GRAY_COLOR
  },
  title: {
    flex: 1,
    minWidth: 0,
    paddingTop: 5,
    color: constants.BLACK_COLOR,
    fontWeight: 'bold',
    fontSize: constants.BODY_FONT_SIZE
  },
  description: {
    fontSize: constants.BODY_FONT_SIZE,
    color: constants.BLACK_COLOR,
    marginBottom: 12
  },
  ratingButtonContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 7
  },
  rating: {
    flex: 1,
    color: constants.LIGHT_GRAY_COLOR,
    fontSize: constants.BODY_FONT_SIZE,
    paddingTop: 8
  },
  button: {
    width: 65,
  }
});

export default Course;