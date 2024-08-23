import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {Color} from '../styles/Color';

const SCREEN_WIDTH = Dimensions.get('window').width;

const OrderStatusLine = ({
  status,
  statuses = ['Cart', 'Address', 'Payment'],
}) => {
  const getStatusIndex = status => {
    return statuses.indexOf(status);
  };

  const currentIndex = getStatusIndex(status);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {statuses.map((item, index) => (
          <React.Fragment key={index}>
            <View style={styles.statusItem}>
              {index < statuses.length && (
                <View
                  style={[
                    styles.line,
                    currentIndex >= index
                      ? styles.completedLine
                      : styles.pendingLine,
                  ]}
                />
              )}
              <View
                style={[
                  styles.circle,
                  currentIndex >= index ? styles.active : styles.inactive,
                ]}>
                {currentIndex >= index && <View style={styles.innerCircle} />}
              </View>
              <Text style={styles.statusText}>{item}</Text>
            </View>
          </React.Fragment>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 10, // Added padding for better spacing
  },
  statusItem: {
    // flex: 1,
    // width: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    // borderWidth:2
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  innerCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
  },
  active: {
    borderColor: '#4CAF50',
  },
  inactive: {
    borderColor: '#ccc',
  },
  statusText: {
    // marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    width: 'auto',
    color: Color.white,
  },
  line: {
    width: 50,
    height: 5,
    // marginTop: -13,
    zIndex: -1,
  },
  completedLine: {
    backgroundColor: '#4CAF50',
  },
  pendingLine: {
    backgroundColor: '#ccc',
  },
});

export default OrderStatusLine;
