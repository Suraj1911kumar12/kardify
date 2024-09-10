import AsyncStorage from '@react-native-async-storage/async-storage';

const checkOnboardingStatus = async () => {
  try {
    const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
    return hasSeenOnboarding === 'true';
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
};

const setOnboardingCompleted = async () => {
  try {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
  } catch (error) {
    console.error('Error setting onboarding status:', error);
  }
};

export {checkOnboardingStatus, setOnboardingCompleted};
