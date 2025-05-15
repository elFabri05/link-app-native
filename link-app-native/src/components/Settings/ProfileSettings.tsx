import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Platform,
  ScrollView,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'react-native-image-picker';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, INPUT_HEIGHT, BUTTON_HEIGHT } from '../../styles/theme';
import { platformColor } from '../../utils/platformColor';

// Define the navigation prop type
type ProfileSettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileSettings'>;

type Props = {
  navigation: ProfileSettingsScreenNavigationProp;
};

interface LinkData {
  id: string;
  platform: string;
  link: string;
}

interface UserProfileData {
  firstName?: string;
  lastName?: string;
  profileEmail?: string;
  profilePicture?: string;
  links?: LinkData[];
}

interface UserProfileForm {
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

const ProfileSettings: React.FC<Props> = ({ navigation }) => {
  const [profile, setProfile] = useState<UserProfileData>({});
  const [savedProfileData, setSavedProfileData] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  const { control, handleSubmit, setValue } = useForm<UserProfileForm>();

  useEffect(() => {
    // In a real app, you'd fetch this data from an API
    // For now, let's mock some user data
    const mockProfile: UserProfileData = {
      firstName: 'John',
      lastName: 'Doe',
      profileEmail: 'john.doe@example.com',
      profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
      links: [
        { id: '1', platform: 'Github', link: 'https://github.com/johndoe' },
        { id: '2', platform: 'Twitter', link: 'https://twitter.com/johndoe' }
      ]
    };
    
    setProfile(mockProfile);
    setImageUri(mockProfile.profilePicture);
    setValue('firstName', mockProfile.firstName);
    setValue('lastName', mockProfile.lastName);
    setValue('email', mockProfile.profileEmail);
  }, [setValue]);

  const onSubmit = async (data: UserProfileForm) => {
    try {
      // In a real app, you'd send this data to an API
      console.log('Submitting profile data:', {
        ...data,
        profilePicture: imageUri
      });
      
      // Update the profile state with the new data
      setProfile({
        ...profile,
        firstName: data.firstName,
        lastName: data.lastName,
        profileEmail: data.email,
        profilePicture: imageUri
      });
      
      // Show success message
      setSavedProfileData(true);
      Alert.alert('Success', 'Your profile has been updated');
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSavedProfileData(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  const handleChoosePhoto = () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 0.8,
    };
    
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => navigation.navigate('LinksSettings')}
        >
          <Icon name="link" size={20} color={COLORS.gray} />
          <Text style={styles.tabButtonText}>Links</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => navigation.navigate('ProfileSettings')}
        >
          <Icon name="user" size={20} color={COLORS.primary} />
          <Text style={[styles.tabButtonText, { color: COLORS.primary }]}>Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.previewButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon name="eye" size={20} color={COLORS.primary} />
          <Text style={styles.previewButtonText}>Preview</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.profileSettingsContainer}>
            <Text style={styles.heading}>Profile Details</Text>
            <Text style={styles.subheading}>Add your details to create a personal touch to your profile.</Text>
            
            <View style={styles.formContainer}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Profile picture</Text>
                <View style={styles.pictureContainer}>
                  <TouchableOpacity
                    style={styles.imageUploadContainer}
                    onPress={handleChoosePhoto}
                  >
                    {imageUri ? (
                      <Image
                        source={{ uri: imageUri }}
                        style={styles.profileImage}
                      />
                    ) : (
                      <View style={styles.placeholderContainer}>
                        <Icon name="image" size={40} color={COLORS.primary} />
                        <Text style={styles.uploadText}>+ Upload Image</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  
                  <View style={styles.imageGuideContainer}>
                    <Text style={styles.imageGuideText}>
                      Image must be below 1024x1024px. Use PNG or JPG format.
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.sectionContainer}>
                <View style={styles.formField}>
                  <Text style={styles.label}>First Name</Text>
                  <Controller
                    control={control}
                    name="firstName"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </View>
                
                <View style={styles.formField}>
                  <Text style={styles.label}>Last Name</Text>
                  <Controller
                    control={control}
                    name="lastName"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </View>
                
                <View style={styles.formField}>
                  <Text style={styles.label}>Email</Text>
                  <Controller
                    control={control}
                    name="email"
                    rules={{
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </View>
              </View>
              
              <View style={styles.saveButtonContainer}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                
                {savedProfileData && (
                  <Text style={styles.savedMessage}>Your profile has been updated</Text>
                )}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.s,
    borderRadius: BORDER_RADIUS.s,
  },
  tabButtonText: {
    fontSize: FONT_SIZES.body,
    marginLeft: SPACING.xs,
    color: COLORS.gray,
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.s,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.s,
  },
  previewButtonText: {
    fontSize: FONT_SIZES.body,
    marginLeft: SPACING.xs,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  profileSettingsContainer: {
    backgroundColor: COLORS.white,
    margin: SPACING.m,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.m,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  heading: {
    fontSize: FONT_SIZES.heading,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  subheading: {
    fontSize: FONT_SIZES.body,
    color: COLORS.gray,
    marginBottom: SPACING.l,
  },
  formContainer: {
    width: '100%',
  },
  sectionContainer: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.s,
    padding: SPACING.m,
    marginBottom: SPACING.m,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.subheading,
    fontWeight: 'bold',
    marginBottom: SPACING.m,
  },
  pictureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageUploadContainer: {
    width: 193,
    height: 193,
    borderRadius: BORDER_RADIUS.s,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    marginTop: SPACING.s,
  },
  imageGuideContainer: {
    flex: 1,
    paddingLeft: SPACING.m,
  },
  imageGuideText: {
    color: COLORS.gray,
    fontSize: FONT_SIZES.body,
  },
  formField: {
    marginBottom: SPACING.m,
  },
  label: {
    fontSize: FONT_SIZES.label,
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  input: {
    height: INPUT_HEIGHT,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: BORDER_RADIUS.s,
    paddingHorizontal: SPACING.m,
    color: COLORS.black,
    backgroundColor: COLORS.white,
  },
  saveButtonContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: SPACING.m,
    alignItems: 'flex-end',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.m,
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: FONT_SIZES.body,
  },
  savedMessage: {
    color: COLORS.primary,
    marginTop: SPACING.s,
  },
});

export default ProfileSettings;