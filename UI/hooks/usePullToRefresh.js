import {useState, useCallback} from 'react';

const usePullToRefresh = fetchData => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  return {refreshing, onRefresh};
};

export default usePullToRefresh;
