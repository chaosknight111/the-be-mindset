import React from 'react';
import {GestureResponderEvent, PanResponder, View} from 'react-native';
import {Svg, Path, Circle, G} from 'react-native-svg';
import ColorPalette from 'resources/ColorPalette';

interface PolarToCartesianParameters {
  centerX: number;
  centerY: number;
  radius: number;
  angleInDegrees: number;
}

interface Props {
  size: number;
  width: number;
  backgroundWidth?: number;
  tintColor: string;
  backgroundColor: string;
  style?: any;
  rotation: number;
  lineCap: string;
  arcSweepAngle: number;
  fill: number;
  onFillChanged?: (fill: number) => void;
  children?: (fill: number) => React.ReactNode;
}

interface State {
  moving: boolean;
  fill: number;
}

export default class CircularProgress extends React.PureComponent<Props, State> {
  state = {
    moving: false,
    fill: 0,
  };

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => {
      return true;
    },
    onPanResponderMove: (e) => {
      this.onMove(e);
    },
    onPanResponderRelease: (e) => {
      this.onEndMove(e);
      return true;
    },
  });

  getQuadrant = (x: number, y: number) => {
    if (x >= 0 && y >= 0) return 1;
    if (x <= 0 && y >= 0) return 2;
    if (x <= 0 && y <= 0) return 3;
    if (x >= 0 && y <= 0) return 4;
    return 1;
  };

  /**
   * Returns the angle (degrees) given a point.
   * Assumes 0,0 as the center of the circle
   * @param {number} x
   * @param {number} y
   */
  getAngleForPoint = (x: number, y: number) => {
    if (x == 0 && y == 0) return 0;

    const angle = Math.atan(x / y);
    let angleDeg = (angle * 180) / Math.PI;
    // The final value depends on the quadrant
    const quadrant = this.getQuadrant(x, y);

    if (quadrant === 1) {
      angleDeg = 90 - angleDeg;
    }
    if (quadrant === 2) {
      angleDeg = 90 - angleDeg;
    }
    if (quadrant === 3) {
      angleDeg = 270 - angleDeg;
    }
    if (quadrant === 4) {
      angleDeg = 270 - angleDeg;
    }
    return angleDeg;
  };

  onMove = (e: GestureResponderEvent) => {
    const fill = this.getMovingFill(e);

    this.setState({moving: true, fill});
  };

  onEndMove = (e: GestureResponderEvent) => {
    const fill = this.getMovingFill(e);
    const {onFillChanged} = this.props;
    if (onFillChanged) onFillChanged(fill);
    this.setState({moving: false});
    return true;
  };

  getMovingFill = (e: GestureResponderEvent) => {
    const x = e.nativeEvent.locationX;
    const y = e.nativeEvent.locationY;

    const {size} = this.props;
    const radius = size / 2;

    let angle = this.getAngleForPoint(x - radius, y - radius);
    angle += 90;
    angle %= 360;

    return (angle / 360) * 100;
  };

  static defaultProps: {
    tintColor: string;
    rotation: number;
    lineCap: string;
    arcSweepAngle: number;
  };

  static polarToCartesian({
    centerX,
    centerY,
    radius,
    angleInDegrees,
  }: PolarToCartesianParameters) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  static circlePath(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
  ) {
    const start = CircularProgress.polarToCartesian({
      centerX: x,
      centerY: y,
      radius,
      angleInDegrees: endAngle * 0.9999,
    });
    const end = CircularProgress.polarToCartesian({
      centerX: x,
      centerY: y,
      radius,
      angleInDegrees: startAngle,
    });
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    const d = [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ];
    return d.join(' ');
  }

  clampFill = (fill: number) => Math.min(100, Math.max(0, fill));

  render() {
    const {
      size,
      width,
      backgroundWidth,
      tintColor,
      backgroundColor,
      style,
      rotation,
      arcSweepAngle,
      children,
    } = this.props;

    let {fill} = this.props;
    if (this.state.moving) {
      fill = this.state.fill;
    }

    const maxWidthCircle = backgroundWidth ? Math.max(width, backgroundWidth) : width;

    const capWidth = 7;

    const backgroundPath = CircularProgress.circlePath(
      size / 2,
      size / 2,
      size / 2 - maxWidthCircle / 2 - capWidth,
      0,
      arcSweepAngle,
    );
    const circlePath = CircularProgress.circlePath(
      size / 2,
      size / 2,
      size / 2 - maxWidthCircle / 2 - capWidth,
      0,
      (arcSweepAngle * this.clampFill(fill)) / 100,
    );

    const borderWidth = capWidth > width ? capWidth : width;
    const radius = (size - (borderWidth / 2) * 3 - capWidth) / 2;
    const center = size / 2;

    const circleDg = (fill / 100) * 360 - 90;

    const radian = (Math.PI * circleDg) / 180;
    const capX = radius * Math.cos(radian) + center;
    const capY = radius * Math.sin(radian) + center;

    return (
      <View style={style}>
        <Svg width={size} height={size} {...this.panResponder.panHandlers}>
          <G rotation={rotation} originX={size / 2} originY={size / 2}>
            {backgroundColor && (
              <Path
                d={backgroundPath}
                stroke={backgroundColor}
                strokeWidth={backgroundWidth || width}
                strokeLinecap="butt"
                fill="#ffffff33"
              />
            )}
            {fill > 0 && (
              <Path
                d={circlePath}
                stroke={tintColor}
                strokeWidth={width}
                strokeLinecap="butt"
                fill="transparent"
              />
            )}
            <Circle cx={capX} cy={capY} r={capWidth} fill={tintColor} />
          </G>
        </Svg>
        {children && (
          <View style={{position: 'absolute', left: 50, top: 50, right: 50, bottom: 50}}>
            {children(fill)}
          </View>
        )}
      </View>
    );
  }
}

CircularProgress.defaultProps = {
  tintColor: ColorPalette.black,
  rotation: 90,
  lineCap: 'butt',
  arcSweepAngle: 360,
};
