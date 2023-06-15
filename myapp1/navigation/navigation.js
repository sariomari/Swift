import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import MainLayout from '../screens/MainLayout';
import Favorites from '../screens/favorites';
import StorePage from '../screens/StorePage';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainLayout" component={MainLayout} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="StorePage"  >{(props) => <StorePage {...props} items={itemsData} />}</Stack.Screen>
      {/* ... other screens */}
    </Stack.Navigator>
  );
};

export default AppNavigator;