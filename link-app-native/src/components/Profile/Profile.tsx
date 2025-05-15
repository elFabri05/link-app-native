import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Linking,
  Platform,
  Alert,
  Share
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../styles/theme';
import { platformColor } from '../../utils/platformColor';

// Define the navigation prop type
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

interface PlatformLink {
  id: string;
  platform: string;
  link: string;
}

interface User {
  links?: PlatformLink[];
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
  profileEmail?: string;
}

const Profile: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you'd fetch this data from an API
    // For now, let's mock some user data
    const mockUser: User = {
      firstName: 'John',
      lastName: 'Doe',
      profileEmail: 'john.doe@example.com',
      profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
      links: [
        { id: '1', platform: 'Github', link: 'https://github.com/johndoe' },
        { id: '2', platform: 'Twitter', link: 'https://twitter.com/johndoe' },
        { id: '3', platform: 'LinkedIn', link: 'https://linkedin.com/in/johndoe' },
        { id: '4', platform: 'YouTube', link: 'https://youtube.com/johndoe' }
      ]
    };
    
    setUser(mockUser);
  }, []);

  const renderName = () => {
    if (user) {
      const { firstName, lastName } = user;
      if (firstName && lastName) {
        return `${firstName} ${lastName}`;
      } else if (firstName) {
        return firstName;
      } else if (lastName) {
        return lastName;
      }
    }
    return "User";
  };

  const handleShareProfile = async () => {
    try {
      await Share.share({
        message: 'Check out my DevLinks profile!',
        // In a real app, you'd share a URL to your profile here
        url: 'https://devlinks.app/profile/johndoe'
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share profile');
    }
  };

  const handleLinkPress = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open this URL');
      }
    });
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="alert-circle" size={50} color={COLORS.error} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('LinksSettings')}
        >
          <Text style={styles.backButtonText}>Back to editor</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShareProfile}
        >
          <Text style={styles.shareButtonText}>Share Link</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        {user ? (
          <View style={styles.profileContainer}>
            <View style={styles.avatarContainer}>
              {user.profilePicture ? (
                <Image 
                  source={{ uri: user.profilePicture }} 
                  style={styles.profilePicture} 
                />
              ) : (
                <View style={styles.placeholderAvatar}>
                  <Icon name="user" size={50} color={COLORS.primary} />
                </View>
              )}
            </View>
            
            <Text style={styles.name}>{renderName()}</Text>
            <Text style={styles.email}>{user.profileEmail || 'No email provided'}</Text>
            
            <View style={styles.linksContainer}>
              {user.links?.map((link, index) => {
                const { color, iconName } = platformColor(link.platform);
                return (
                  <TouchableOpacity
                    key={link.id}
                    style={[
                      styles.platformLink,
                      { backgroundColor: color }
                    ]}
                    onPress={() => handleLinkPress(link.link)}
                  >
                    <Icon
                      name={iconName}
                      size={20}
                      color={link.platform === 'FrontendMentor' ? COLORS.black : COLORS.white}
                    />
                    <Text
                      style={[
                        styles.platformLinkText,
                        { color: link.platform === 'FrontendMentor' ? COLORS.black : COLORS.white }
                      ]}
                    >
                      {link.platform}
                    </Text>
                    <Icon
                      name="arrow-right"
                      size={20}
                      color={link.platform === 'FrontendMentor' ? COLORS.black : COLORS.white}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
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
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.l,
    backgroundColor: COLORS.white,
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
  backButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.m,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    backgroundColor: COLORS.white,
  },
  backButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: FONT_SIZES.body,
  },
  shareButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.m,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
  },
  shareButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: FONT_SIZES.body,
  },
  scrollContainer: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    margin: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.xl,
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
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: COLORS.primary,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  placeholderAvatar: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.lightPurple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: FONT_SIZES.heading,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  email: {
    fontSize: FONT_SIZES.body,
    color: COLORS.gray,
    marginBottom: SPACING.l,
  },
  linksContainer: {
    width: '100%',
  },
  platformLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: BORDER_RADIUS.s,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m,
    marginBottom: SPACING.m,
  },
  platformLinkText: {
    flex: 1,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
    marginLeft: SPACING.m,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  loadingText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.subheading,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.body,
    textAlign: 'center',
    marginVertical: SPACING.l,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.m,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.m,
    marginTop: SPACING.l,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: FONT_SIZES.body,
  },
});

export default Profile;