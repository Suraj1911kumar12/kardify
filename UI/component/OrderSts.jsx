import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const OrderStatusLine = ({status}) => {
  const statuses = ['Ordered', 'Shipped', 'Out for Delivery', 'Delivered'];

  const getStatusIndex = status => {
    return statuses.indexOf(status);
  };

  const currentIndex = getStatusIndex(status);

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {statuses.map((item, index) => (
          <React.Fragment key={index}>
            <View style={styles.statusItem}>
              <View
                style={[
                  styles.circle,
                  currentIndex >= index ? styles.active : styles.inactive,
                ]}>
                {currentIndex >= index && <View style={styles.innerCircle} />}
              </View>
              <Text style={styles.statusText}>{item}</Text>
            </View>
            {index < statuses.length - 1 && (
              <View
                style={[
                  styles.line,
                  currentIndex >= index + 1
                    ? styles.completedLine
                    : styles.pendingLine,
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    position: 'relative',
  },
  statusItem: {
    alignItems: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // To cover the line underneath
  },
  innerCircle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
  },
  active: {
    borderColor: '#4CAF50',
  },
  inactive: {
    borderColor: '#ccc',
  },
  statusText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    width: 70, // Adjust width for better text alignment
  },
  line: {
    width: 50,
    height: 2,
    marginTop: -13, // Adjust margin to align with the circle
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
