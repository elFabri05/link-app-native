import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert,
  Image,
  Platform
} from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { v4 as uuidv4 } from 'uuid';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, INPUT_HEIGHT, BUTTON_HEIGHT } from '../../styles/theme';
import { platformColor, platformOptions } from '../../utils/platformColor';

// Define the navigation prop type
type LinksSettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LinksSettings'>;

type Props = {
  navigation: LinksSettingsScreenNavigationProp;
};

interface PlatformLink {
  id: string;
  platform: string;
  link: string;
}

interface FormValues {
  links: PlatformLink[];
}

const Links: React.FC<Props> = ({ navigation }) => {
  const [addNewLink, setAddNewLink] = useState<boolean>(false);
  const [savedLinks, setSavedLinks] = useState<boolean>(false);
  const [showPlatformPicker, setShowPlatformPicker] = useState<number | null>(null);

  const { control, handleSubmit, register, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      links: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links"
  });

  useEffect(() => {
    // In a real app, you'd fetch links from API
    // For now, let's mock some data
    const mockLinks: PlatformLink[] = [
      { id: uuidv4(), platform: 'Github', link: 'https://github.com/yourusername' },
      { id: uuidv4(), platform: 'Twitter', link: 'https://twitter.com/yourusername' }
    ];
    
    if (mockLinks.length > 0) {
      reset({ links: mockLinks });
      setAddNewLink(true);
    }
  }, [reset]);

  const onSubmit = async (data: FormValues) => {
    console.log("Form submission data:", data);
    
    // In a real app, you'd send this to an API
    try {
      // Mock successful save
      setSavedLinks(true);
      Alert.alert('Success', 'Your links have been saved');
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSavedLinks(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to submit data:', error);
      Alert.alert('Error', 'Failed to save links. Please try again.');
    }
  };

  const addLink = (): void => { 
    append({ id: uuidv4(), platform: '', link: '' });
    setSavedLinks(false);
    setAddNewLink(true);
  };

  const removeLink = (index: number): void => {
    remove(index);
    if (fields.length - 1 === 0) {
      setAddNewLink(false);
    }
    setSavedLinks(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => navigation.navigate('LinksSettings')}
        >
          <Icon name="link" size={20} color={COLORS.primary} />
          <Text style={[styles.tabButtonText, { color: COLORS.primary }]}>Links</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => navigation.navigate('ProfileSettings')}
        >
          <Icon name="user" size={20} color={COLORS.gray} />
          <Text style={styles.tabButtonText}>Profile</Text>
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
        <View style={styles.linksContainer}>
          <Text style={styles.heading}>Customize your links</Text>
          <Text style={styles.subheading}>Add/Edit/Remove links below and then share all your profiles with the world!</Text>
          
          <TouchableOpacity
            style={styles.addLinkButton}
            onPress={addLink}
          >
            <Text style={styles.addLinkButtonText}>+ Add new link</Text>
          </TouchableOpacity>
          
          {!addNewLink ? (
            <View style={styles.emptyStateContainer}>
              <Image 
                source={require('../../assets/illustration-empty.png')} 
                style={styles.emptyStateImage}
                resizeMode="contain"
              />
              <Text style={styles.emptyStateHeading}>Let's get you started</Text>
              <Text style={styles.emptyStateText}>
                Use the "Add new link" button to get started. Once you have more than one link, 
                you can reorder and edit them. We're here to help you share your profiles with everyone!
              </Text>
            </View>
          ) : (
            <View>
              {fields.map((field, index) => (
                <View key={field.id} style={styles.linkCard}>
                  <View style={styles.linkHeader}>
                    <View style={styles.linkTitleContainer}>
                      <Icon name="menu" size={16} color={COLORS.gray} />
                      <Text style={styles.linkTitle}>Link #{index + 1}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeLink(index)}
                    >
                      <Text style={styles.removeButton}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.label}>Platform</Text>
                  <Controller
                    control={control}
                    name={`links.${index}.platform`}
                    rules={{ required: 'Platform selection is required' }}
                    render={({ field: { onChange, value } }) => (
                      <TouchableOpacity 
                        style={styles.platformSelector}
                        onPress={() => setShowPlatformPicker(index)}
                      >
                        <Text style={styles.platformSelectorText}>
                          {value ? value : 'Select platform'}
                        </Text>
                        <Icon name="chevron-down" size={16} color={COLORS.gray} />
                        
                        {showPlatformPicker === index && (
                          <View style={styles.pickerContainer}>
                            <View style={styles.pickerHeader}>
                              <Text style={styles.pickerTitle}>Select Platform</Text>
                              <TouchableOpacity onPress={() => setShowPlatformPicker(null)}>
                                <Icon name="x" size={20} color={COLORS.black} />
                              </TouchableOpacity>
                            </View>
                            <ScrollView style={styles.picker}>
                              {platformOptions.map((option) => (
                                <TouchableOpacity
                                  key={option.value}
                                  style={styles.pickerItem}
                                  onPress={() => {
                                    onChange(option.value);
                                    setShowPlatformPicker(null);
                                  }}
                                >
                                  <View style={styles.pickerItemContent}>
                                    <View 
                                      style={[
                                        styles.platformIconContainer, 
                                        { backgroundColor: platformColor(option.value).color }
                                      ]}
                                    >
                                      <Icon 
                                        name={platformColor(option.value).iconName} 
                                        size={16} 
                                        color={COLORS.white} 
                                      />
                                    </View>
                                    <Text style={styles.pickerItemText}>{option.label}</Text>
                                  </View>
                                </TouchableOpacity>
                              ))}
                            </ScrollView>
                          </View>
                        )}
                      </TouchableOpacity>
                    )}
                  />
                  {errors.links && errors.links[index]?.platform && (
                    <Text style={styles.errorText}>{errors.links[index]?.platform?.message}</Text>
                  )}
                  
                  <Text style={[styles.label, { marginTop: SPACING.m }]}>Link</Text>
                  <Controller
                    control={control}
                    name={`links.${index}.link`}
                    rules={{ 
                      required: 'This field is required',
                      pattern: {
                        value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 
                        message: 'Enter a valid URL'
                      }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <View style={styles.inputContainer}>
                        <Icon name="link" size={16} color={COLORS.gray} style={styles.inputIcon} />
                        <TextInput
                          style={styles.input}
                          placeholder="e.g. https://www.github.com/example"
                          keyboardType="url"
                          autoCapitalize="none"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      </View>
                    )}
                  />
                  {errors.links && errors.links[index]?.link && (
                    <Text style={styles.errorText}>{errors.links[index]?.link?.message}</Text>
                  )}
                </View>
              ))}
              
              <View style={styles.saveButtonContainer}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                {savedLinks && (
                  <Text style={styles.savedMessage}>Your links have been saved</Text>
                )}
              </View>
            </View>
          )}
        </View>
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
  linksContainer: {
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
  addLinkButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.m,
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  addLinkButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: FONT_SIZES.body,
  },
  emptyStateContainer: {
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.s,
    alignItems: 'center',
  },
  emptyStateImage: {
    width: 125,
    height: 80,
    marginBottom: SPACING.m,
  },
  emptyStateHeading: {
    fontSize: FONT_SIZES.subheading,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.s,
  },
  emptyStateText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.gray,
    textAlign: 'center',
  },
  linkCard: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.s,
    padding: SPACING.m,
    marginBottom: SPACING.m,
  },
  linkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  linkTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkTitle: {
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
    marginLeft: SPACING.s,
  },
  removeButton: {
    color: COLORS.gray,
    fontSize: FONT_SIZES.body,
  },
  label: {
    fontSize: FONT_SIZES.label,
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  platformSelector: {
    height: INPUT_HEIGHT,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: BORDER_RADIUS.s,
    paddingHorizontal: SPACING.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  platformSelectorText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.black,
  },
  pickerContainer: {
    position: 'absolute',
    top: INPUT_HEIGHT + 5,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: BORDER_RADIUS.s,
    zIndex: 1000,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  pickerTitle: {
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
  },
  picker: {
    maxHeight: 200,
  },
  pickerItem: {
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  pickerItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.s,
  },
  pickerItemText: {
    fontSize: FONT_SIZES.body,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: INPUT_HEIGHT,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: BORDER_RADIUS.s,
    paddingHorizontal: SPACING.m,
  },
  inputIcon: {
    marginRight: SPACING.s,
  },
  input: {
    flex: 1,
    height: '100%',
    color: COLORS.black,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.label,
    marginTop: SPACING.xs,
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

export default Links;