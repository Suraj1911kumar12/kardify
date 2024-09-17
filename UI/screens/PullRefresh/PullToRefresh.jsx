import React from 'react';
import {RefreshControl, View} from 'react-native';
import usePullToRefresh from '../../hooks/usePullToRefresh';

const PullToRefreshScrollView = ({fetchData}) => {
  const {refreshing, onRefresh} = usePullToRefresh(fetchData);

  return (
    <View
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default PullToRefreshScrollView;
