import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import Login from './src/components/Auth/Login';
import CreateAccount from './src/components/Auth/CreateAccount';
import LinksSettings from './src/components/Settings/Links';
import ProfileSettings from './src/components/Settings/ProfileSettings';
import Profile from './src/components/Profile/Profile';

// Define the types for our navigation parameters
export type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  LinksSettings: undefined;import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

// Import screens
import Login from './src/components/Auth/Login';
import CreateAccount from './src/components/Auth/CreateAccount';
import LinksSettings from './src/components/Settings/Links';
import ProfileSettings from './src/components/Settings/ProfileSettings';
import Profile from './src/components/Profile/Profile';
import { COLORS } from './styles/theme';

// Define the types for our navigation parameters
export type RootStackParamList = {
  Auth: undefined;
  Tabs: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
};

export type TabsParamList = {
  LinksSettings: undefined;
  ProfileSettings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<TabsParamList>();

// Auth stack navigator for Login and Create Account screens
const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: COLORS.background }
    }}
  >
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="CreateAccount" component={CreateAccount} />
  </AuthStack.Navigator>
);

// Tab navigator for Links and Profile settings screens
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.gray,
      tabBarStyle: {
        elevation: 5,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: -2 },
        borderTopColor: COLORS.lightGray,
      },
      headerStyle: {
        backgroundColor: COLORS.white,
        elevation: 5,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      headerTintColor: COLORS.primary,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Tab.Screen
      name="LinksSettings"
      component={LinksSettings}
      options={{
        title: 'Links',
        tabBarLabel: 'Links',
        tabBarIcon: ({ color, size }) => (
          <Icon name="link" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileSettings"
      component={ProfileSettings}
      options={{
        title: 'Profile Details',
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Icon name="user" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Auth"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen 
            name="Profile" 
            component={Profile} 
            options={{ 
              headerShown: true,
              title: 'Your Profile',
              headerStyle: {
                backgroundColor: COLORS.white,
              },
              headerTintColor: COLORS.primary,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
  ProfileSettings: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTintColor: '#633CFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ 
            title: 'DevLinks',
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="CreateAccount" 
          component={CreateAccount} 
          options={{ 
            title: 'Create Account',
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="LinksSettings" 
          component={LinksSettings} 
          options={{ title: 'Links' }} 
        />
        <Stack.Screen 
          name="ProfileSettings" 
          component={ProfileSettings} 
          options={{ title: 'Profile Details' }} 
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile} 
          options={{ title: 'Your Profile' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;