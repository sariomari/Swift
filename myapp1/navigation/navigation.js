import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import MainLayout from '../screens/MainLayout';
import CustomDrawer from "./navigation/CustomDrawer";

import Favorites from '../screens/favorites';
import StorePage from '../screens/StorePage';
import Cart from '../screens/cart';
import HelpCenter from '../screens/HelpCenter';
import Invite from '../screens/Invite';
import Orders from '../screens/orders';
import Profile from '../screens/Profile';
import loginpage from '../screens/loginpage';
import OrderDetails from '../screens/OrderDetails';
import Signuppage from '../screens/signuppage';
import Payment from '../screens/payment';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
      <Stack.Screen name="MainLayout" component={MainLayout} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Signuppage" component={Signuppage} />

      <Stack.Screen name="StorePage"  >{(props) => <StorePage {...props} items={itemsData} />}</Stack.Screen>
      <Stack.Screen name="Cart"  >{(props) => <Cart {...props} items={itemsData} />}</Stack.Screen>
      <Stack.Screen name="HelpCenter" component={HelpCenter} />
      <Stack.Screen name="Invite" component={Invite} />
      <Stack.Screen name="Orders"  >{(props) => <Orders {...props} items={itemsData} />}</Stack.Screen>
      <Stack.Screen name="OrderDetails"  >{(props) => <OrderDetails {...props} items={itemsData} />}</Stack.Screen>
      <Stack.Screen name="loginpage" component={loginpage} />
      <Stack.Screen name="Payment" component={Payment} />

      {/* ... other screens */}
    </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;