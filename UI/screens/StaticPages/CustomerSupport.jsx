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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // or any other icon library
import {Color} from '../../styles/Color';

const predefinedQuestions = [
  'How can I reset my password?',
  'Where can I find my order history?',
  'How do I update my profile information?',
  'What should I do if I encounter a bug?',
];

const CustomerSupportPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!selectedQuestion)
      newErrors.selectedQuestion = 'Please select a question';
    if (!message) newErrors.message = 'Message is required';
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
      await axios.post('https://api.example.com/support', {
        selectedQuestion,
        message,
      });
      Alert.alert(
        'Success',
        'Your support request has been submitted successfully!',
      );
      // Clear the form
      setSelectedQuestion('');
      setMessage('');
    } catch (error) {
      Alert.alert(
        'Error',
        'There was a problem submitting your support request.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{fontSize: 20, color: Color.white, textAlign: 'center'}}>
        Customer Support
      </Text>
      {/* <View style={styles.imageContainer}>
        <Icon name="help-circle" size={100} color="#4CAF50" /> 
      </View>
      
      <Text style={styles.title}>Customer Support</Text>
      <Text style={styles.introText}>
        If you need help, please select a question and provide additional details below.
      </Text>

      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Select a Question:</Text>
        <View style={styles.dropdown}>
          <TextInput
            style={styles.dropdownInput}
            placeholder="Choose a question"
            value={selectedQuestion}
            onFocus={() => {}} // Add logic for dropdown here
            editable={false}
          />
        </View>
        {errors.selectedQuestion && <Text style={styles.error}>{errors.selectedQuestion}</Text>}
      </View>

      <TextInput
        style={[styles.input, styles.message]}
        placeholder="Your message"
        multiline
        onChangeText={setMessage}
        value={message}
      />
      {errors.message && <Text style={styles.error}>{errors.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Submit'}</Text> */}
      {/* </TouchableOpacity> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Color.lightBlack,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  introText: {
    fontSize: 16,
    marginBottom: 20,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  dropdownInput: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  message: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default CustomerSupportPage;
