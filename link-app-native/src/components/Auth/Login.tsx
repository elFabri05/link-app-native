import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  ScrollView,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { 
  COLORS, 
  FONT_SIZES, 
  SPACING, 
  BORDER_RADIUS, 
  SHADOWS,
  TEXT_STYLES,
  BUTTON_STYLES,
  INPUT_STYLES
} from '../../styles/theme';

// Define the navigation prop type
type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

type FormData = {
  emailAddress: string;
  password: string;
};

const Login: React.FC<Props> = ({ navigation }) => {
  const [failedLogin, setFailedLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const passwordInputRef = useRef<TextInput>(null);
  
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      emailAddress: '',
      password: ''
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      Keyboard.dismiss();
      setIsLoading(true);
      setFailedLogin(false);
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you'd make an API call here
      console.log('Login submitted with:', data);
      
      // Mocking a successful login
      if (data.emailAddress === 'demo@example.com' && data.password === 'password') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabs' }],
        });
      } else {
        setFailedLogin(true);
        Alert.alert('Login Failed', 'Incorrect email or password. Try demo@example.com / password');
      }
    } catch (error) {
      console.error('Failed to login:', error);
      setFailedLogin(true);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <Image 
              source={require('../../assets/logo-devlinks-large.png')} 
              style={styles.logo}
              resizeMode="contain"
              accessibilityLabel="DevLinks logo"
            />
            
            <View style={styles.loginContainer}>
              <Text style={TEXT_STYLES.heading}>Login</Text>
              <Text style={[TEXT_STYLES.body, { color: COLORS.gray, textAlign: 'center', marginBottom: SPACING.xl }]}>
                Add your details below to get back into the app
              </Text>
              
              <View style={styles.formContainer}>
                <Text style={TEXT_STYLES.label}>Email address</Text>
                <Controller
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={INPUT_STYLES.container}>
                      <Icon name="mail" size={16} color={COLORS.gray} style={styles.inputIcon} />
                      <TextInput
                        style={INPUT_STYLES.text}
                        placeholder="e.g. alex@gmail.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                        returnKeyType="next"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        onSubmitEditing={() => passwordInputRef.current?.focus()}
                        testID="email-input"
                        accessible={true}
                        accessibilityLabel="Email input"
                      />
                    </View>
                  )}
                  name="emailAddress"
                />
                {errors.emailAddress && (
                  <Text style={TEXT_STYLES.error}>{errors.emailAddress.message}</Text>
                )}
                
                <Text style={[TEXT_STYLES.label, { marginTop: SPACING.l }]}>Password</Text>
                <Controller
                  control={control}
                  rules={{
                    required: 'Password is required'
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={INPUT_STYLES.container}>
                      <Icon name="lock" size={16} color={COLORS.gray} style={styles.inputIcon} />
                      <TextInput
                        ref={passwordInputRef}
                        style={INPUT_STYLES.text}
                        placeholder="Enter your password"
                        secureTextEntry
                        returnKeyType="done"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        onSubmitEditing={handleSubmit(onSubmit)}
                        testID="password-input"
                        accessible={true}
                        accessibilityLabel="Password input"
                      />
                    </View>
                  )}
                  name="password"
                />
                {errors.password && (
                  <Text style={TEXT_STYLES.error}>{errors.password.message}</Text>
                )}
                {failedLogin && (
                  <Text style={TEXT_STYLES.error}>Incorrect email or password</Text>
                )}
                
                <TouchableOpacity
                  style={[BUTTON_STYLES.primary, styles.button]}
                  onPress={handleSubmit(onSubmit)}
                  disabled={isLoading}
                  testID="login-button"
                  accessible={true}
                  accessibilityLabel="Login button"
                  accessibilityHint="Double tap to log in"
                >
                  {isLoading ? (
                    <ActivityIndicator color={COLORS.white} />
                  ) : (
                    <Text style={[styles.buttonText, { color: COLORS.white }]}>Login</Text>
                  )}
                </TouchableOpacity>
                
                <View style={styles.footer}>
                  <Text style={[TEXT_STYLES.body, { color: COLORS.gray }]}>Don't have an account?</Text>
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('CreateAccount')}
                    testID="create-account-link"
                    accessible={true}
                    accessibilityLabel="Create account button"
                  >
                    <Text style={[TEXT_STYLES.body, { color: COLORS.primary, fontWeight: 'bold' }]}>
                      Create account
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Platform.OS === 'ios' ? COLORS.background : COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: SPACING.m,
  },
  logo: {
    width: 185,
    height: 40,
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  loginContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.xl,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  formContainer: {
    width: '100%',
  },
  inputIcon: {
    marginRight: SPACING.s,
  },
  button: {
    marginTop: SPACING.l,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: FONT_SIZES.body,
  },
  footer: {
    marginTop: SPACING.xl,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.xs,
  },
});

export default Login;