import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import MainLayout from '../screens/MainLayout';
import Favorites from '../screens/favorites';
import StorePage from '../screens/StorePage';
import Cart from '../screens/cart';
import HelpCenter from '../screens/HelpCenter';
import Invite from '../screens/Invite';
import Orders from '../screens/orders';
import Profile from '../screens/Profile';
import OrderDetails from '../screens/OrderDetails';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainLayout" component={MainLayout} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="Profile" component={Profile} />

      <Stack.Screen name="StorePage"  >{(props) => <StorePage {...props} items={itemsData} />}</Stack.Screen>
      <Stack.Screen name="Cart"  >{(props) => <Cart {...props} items={itemsData} />}</Stack.Screen>
      <Stack.Screen name="HelpCenter" component={HelpCenter} />
      <Stack.Screen name="Invite" component={Invite} />
      <Stack.Screen name="Orders"  >{(props) => <Orders {...props} items={itemsData} />}</Stack.Screen>
      <Stack.Screen name="OrderDetails"  >{(props) => <OrderDetails {...props} items={itemsData} />}</Stack.Screen>


      {/* ... other screens */}
    </Stack.Navigator>
  );
};

export default AppNavigator;