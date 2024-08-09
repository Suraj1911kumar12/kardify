import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';
import {Color} from '../../styles/Color';
import CustomButton from '../../component/CustomButton';

// Star Rating Component
const StarRating = ({rating, onChange}) => {
  const stars = [1, 2, 3, 4, 5]; // 5-star rating

  return (
    <View style={styles.ratingContainer}>
      {stars.map(star => (
        <TouchableOpacity key={star} onPress={() => onChange(star)}>
          <Text
            style={[styles.star, {color: rating >= star ? '#FFD700' : '#ccc'}]}>
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const FeedbackPage = () => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!message) newErrors.message = 'Message is required';
    if (rating === 0) newErrors.rating = 'Rating is required';
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await axios.post('https://api.example.com/feedback', {message, rating});
      Alert.alert('Success', 'Your feedback has been submitted successfully!');
      // Clear the form
      setMessage('');
      setRating(0);
    } catch (error) {
      Alert.alert('Error', 'There was a problem submitting your feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Feedback Form</Text>
      <Text style={styles.introText}>
        We value your feedback and are committed to continuously improving your
        experience on our e-commerce multi-vendor application. Your insights,
        suggestions, and opinions help us enhance our platform and provide you
        with better services. Here's how you can share your feedback:
      </Text>
      <Text style={styles.introText}>
        We appreciate your feedback! Please let us know your thoughts and rate
        our service.
      </Text>

      <TextInput
        style={[styles.input, styles.message]}
        placeholder="Message"
        multiline
        onChangeText={setMessage}
        value={message}
      />
      {errors.message && <Text style={styles.error}>{errors.message}</Text>}

      <Text style={styles.ratingTitle}>Rating:</Text>
      <StarRating rating={rating} onChange={setRating} />
      {errors.rating && <Text style={styles.error}>{errors.rating}</Text>}

      {/* <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Submitting...' : 'Submit'}
        </Text>
      </TouchableOpacity> */}
      <CustomButton onPressButton='' title='Submit' />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Color.lightBlack,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Color.white,
    textAlign: 'center',
  },
  introText: {
    fontSize: 16,
    marginBottom: 20,
    color: Color.grey,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: Color.white,
  },
  message: {
    height: 100,
    textAlignVertical: 'top',
    color: Color.white,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  ratingTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: Color.white,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: Color.white,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default FeedbackPage;
