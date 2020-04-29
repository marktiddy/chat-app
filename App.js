import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Start from './components/Start';
import Chat from './components/Chat';

/**
 * The navigator controls our flow through the app
 * We have two screens, a login screen and chat screen
 * The main screen which is the login screen is displayed first
 */
const navigator = createStackNavigator(
  {
    Main: { screen: Start, title: 'Chat App' },
    Chat: { screen: Chat, title: 'Chat' },
  },
  {
    initialRoute: 'Main',
  },
);

const navigatorContainer = createAppContainer(navigator);

export default navigatorContainer;
