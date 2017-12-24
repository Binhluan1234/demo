import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Animated, Easing, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const pointText = ['Hmm', 'OK', 'Cool', 'Nice', 'Great', 'Excellent', 'Wonderful', 'Amazing', 'Mint', 'Rad', 'AWESOME']

export default class BikeSlider extends Component {

  constructor(Props) {
    super(Props)
    this.state = {
      movingMargin: new Animated.Value(0),
      movingMarginTop: new Animated.Value(0),
      rotate: new Animated.Value(0),
      point: 0,
    }
  }

  onMove(evt) {
    // do some thing when move on slider
    const { pageX } = evt.nativeEvent;
    console.log('X: ' + pageX)
    const piece = width / 14;
    let point = (pageX / piece) <= 10 ? (pageX / piece) : 10;
    const round = Math.floor(point);
    point = Math.floor(point < round + 0.5 ? point : round + 1);

    if (pageX > piece * 10) return;

    if ( Math.abs(point - this.state.point) > 1 ) return;

    // this.moveTo(pageX, point);
    this.moveTo(point * piece, point)

    this.setState({ point: point });
  }

  onRelease(evt) {
    const { pageX } = evt.nativeEvent;
    const piece = width / 14;
    let point = (pageX / piece) <= 10 ? (pageX / piece) : 10;
    const round = Math.floor(point);
    point = Math.floor(point < round + 0.5 ? point : round + 1);

    if ( Math.abs(point - this.state.point) > 1 ) return;

    this.moveTo(point * piece, point)

    this.setState({ point: point });
  }

  onPress(evt) {
    // do some thing when press on slider
  }

  moveTo(valueMarginLeft, point) {
    const rotateState = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]

    Animated.timing(
      this.state.movingMargin,
      {
        toValue: valueMarginLeft,
        duration: 10,
      }
    ).start()

    Animated.timing(
      this.state.movingMarginTop,
      {
        toValue: 6 * rotateState[10 - point],
        duration: 10,
      }
    ).start()

    Animated.timing(
      this.state.rotate,
      {
        toValue: rotateState[point],
        duration: 10,
      }
    ).start()
  }

  render() {

    const movingMargin = this.state.movingMargin;
    const movingMarginTop = this.state.movingMarginTop;

    const rotate = this.state.rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['18deg', '-22deg']
    });

    return (
      <View style={styles.Container}>
        <View style={styles.row}>
          <Text style={styles.textReteIt}>rate it</Text>
          <Text style={styles.textExtra}>{this.state.point}- {pointText[this.state.point]}</Text>
        </View>
        <View style={styles.bikeSlider}>
          <View style={styles.left}
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onResponderMove={this.onMove.bind(this)}
            //onResponderRelease={this.onRelease.bind(this)}
            onResponderGrant={this.onPress.bind(this)}
          >
            <Image source={require('../../assets/images/bar_rate-it.png')} style={styles.background} />
            <Animated.Image
              style={{
                marginLeft: movingMargin,
                marginTop: movingMarginTop,
                transform: [{ rotate }],
                position: 'absolute',
                height: 54,
                width: 54,
                resizeMode: 'contain',
              }}
              source={require('../../assets/images/mtb-vector.png')}
            />
          </View>
          <View style={styles.right}>
            <Text style={styles.text}>&#43;{this.state.point} pts</Text>
            <Text style={styles.textPoints}>2332 pts</Text>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  Container: {
    margin: 4,
  },
  row: {
    flexDirection: 'row',
  },
  bikeSlider: {
    flexDirection: 'row',
    height: 80,
  },
  left: {
    flex: 5,
  },
  right: {
    margin: 10,
    flex: 1
  },
  background: {
    marginLeft: 10,
    position: 'relative',
    height: undefined,
    width: undefined,
    flex: 1,
    top: 0,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 11,
    textAlign: 'right',
    marginTop: 3,
    color: '#DE0A33'
  },
  textPoints: {
    fontSize: 11,
    textAlign: 'right',
    marginTop: 3,
    color: '#E9C516'
  },
  textReteIt: {
    marginLeft: 10,
    flex: 5,
  },
  textExtra: {
    flex: 9
  }
});