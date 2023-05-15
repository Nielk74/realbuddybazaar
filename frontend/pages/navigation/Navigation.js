import React, { Fragment, useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../store/slices/authSlice';
import { getUser } from '../../store/thunks/authThunk';
import theme from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LandingStackScreen from './LandingStackScreen';
import DiscoverStackScreen from './DiscoverStackScreen';
import SearchStackScreen from './SearchStackScreen';
import MyActivitiesStackScreen from './MyActivitiesStackScreen';
import MessagesStackScreen from './MessagesStackScreen';
import { Button } from 'react-native-paper';
import RNRestart from 'react-native-restart';

// TODO move this to a separate file
const ProfileRoute = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const disconnect = () => {
    dispatch(setToken(null));
    AsyncStorage.removeItem('token');
    navigation.navigate('Landing');
  };
  return (
    token && (
      <Button onPress={disconnect} mode="outlined" style={{ marginTop: 50 }}>
        Se déconnecter
      </Button>
    )
  );
};

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    async function retrieveToken() {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        dispatch(setToken(token));
      }
    }
    retrieveToken();
  }, []);

  useEffect(() => {
    if (token) {
      const ckeckToken = dispatch(getUser());
      ckeckToken.then((res) => {
        if (res.payload.error) {
          AsyncStorage.removeItem('token');
          dispatch(setToken(null));
          if(Platform.OS === 'ios' || Platform.OS === 'android')
            RNRestart.restart(); // in order to redirect to landing page
          else
            window.location.reload();
        }
      });
    }
  }, [token]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Landing"
        screenOptions={{
          tabBarActiveBackgroundColor: theme.colors.secondary,
          tabBarActiveTintColor: theme.colors.secondaryContainer,
          tabBarInactiveTintColor: theme.colors.secondaryContainer,
          tabBarStyle: styles.navigationBar,
          headerShown: false,
          tabBarLabel: () => null,
        }}
        nativeId="tabBar"
      >
        <Tab.Screen
          name="Landing"
          component={LandingStackScreen}
          options={{
            tabBarItemStyle: {
              display: 'none',
            },
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Tab.Screen
          name="Discover"
          component={DiscoverStackScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons
                name={focused ? 'compass' : 'compass-outline'}
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStackScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons
                name={focused ? 'map-search' : 'map-search-outline'}
                color={color}
                size={26}
              />
            ),
          }}
        />
        {token ? (
          <Fragment>
            <Tab.Screen
              name="MyActivities"
              component={MyActivitiesStackScreen}
              options={{
                tabBarIcon: ({ focused, color }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'clipboard' : 'clipboard-outline'}
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Messages"
              component={MessagesStackScreen}
              options={{
                tabBarIcon: ({ focused, color }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'chat' : 'chat-outline'}
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileRoute}
              options={{
                tabBarIcon: ({ focused, color }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'account' : 'account-outline'}
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
          </Fragment>
        ) : null}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: theme.colors.primary,
    height: 60,
  },
});
