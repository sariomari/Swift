import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    FlatList,
    Dimensions,
    StyleSheet,
    Button 
} from 'react-native';
import Animated,{useSharedValue ,useAnimatedStyle,withTiming}from 'react-native-reanimated';
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabActions';
import  {Horizontalcards}from "../components"
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';
const screenWidth = Dimensions.get('window').width;
const MainLayout = ({drawerAnimationStyle,navigation,selectedTab,setSelectedTab}) => {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  React.useEffect(() => {
      const loadFont = async () => {
        await Font.loadAsync({
          CoolFont: require('../assets/fonts/SweetRomance.ttf'),
          CoolFontone: require('../assets/fonts/PoppinsRegular.ttf'),
          Formalf: require('../assets/fonts/SFCartoonistHand.ttf'),
          FormalfB: require('../assets/fonts/SFCartoonistHandB.ttf'),
        });
        setFontLoaded(true);
      };
  
      loadFont();
    }, []);
  
    function renderLogo() {
        return (
          <View style={styles.logoContainer }>
            <Image source={require('../assets/Swiftlogo.jpg')} style={styles.logoImage }resizeMode="contain" />
          </View>
        );
      }

      const storeItems = [
        { id: '1', name: 'Slim Fit Trousers', image: require('./../assets/nike.png'), price: '$29.99' },
        { id: '2', name: 'Straight Leg Pants', image: require('./../assets/nike.png'), price: '$39.99' },
        { id: '3', name: 'Wide-Leg Trousers', image: require('./../assets/nike.png'), price: '$34.99' },
        { id: '4', name: 'High-Waisted Pants', image: require('./../assets/nike.png'), price: '$44.99' },
        // Add more items as needed
      ];
    const data = [
        { id: '1', title: 'ZARA',image: require("./../assets/zara.png") , isFavorite: false  },
        { id: '2', title: 'NIKE',image: require("./../assets/nike.png") , isFavorite: false  },
        { id: '3', title: 'ADIDAS',image: require("./../assets/adidas.png"), isFavorite: false   },
        { id: '4', title: 'BERSHKA' ,image: require("./../assets/bershka.png"), isFavorite: false  },
        { id: '5', title: 'PUMA',image: require("./../assets/puma.png") , isFavorite: false  },
        { id: '6', title: 'MANGO' ,image: require("./../assets/Mango.png"), isFavorite: false  },
        { id: '7', title: 'PULL & BEAR' ,image: require("./../assets/pull.png"), isFavorite: false  },
        { id: '8', title: 'LV',image: require("./../assets/lv.png"), isFavorite: false   },
        // Add more items as needed
      ];
const [menuList, setMenuList] = React.useState(data);

const [isFavorite, setIsFavorite] = React.useState(false);

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / numColumns;
const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      marginVertical: 10,
      marginHorizontal: 8,
      backgroundColor: '#DFE9F5',
      borderRadius: 8,
      height:188,width:150,
      marginBottom:10
    },
    itemImage: {
        width: 125,
        height: 125,
        marginBottom: 15,
        borderRadius: 40,
        marginTop:5
      },
      textContainer: {
        flexDirection: 'row',
        alignItems: 'left',
        flex: 1,
      },
      itemText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 4,
        flex: 1,
        color: '#000000',
        fontFamily: fontLoaded ? 'FormalfB' : 'Arial',
      },
      itemContent: {
        flexDirection: 'row',
        alignItems: 'left',
        paddingHorizontal: 10,
      },
      favoriteButton: {
        marginLeft: 16,
       
      },
      logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      logoImage: {
        width: 150,
        height:60,
       alignItems:'center',
      },

  });

  const MyFlatList = () => {
    const navigation = useNavigation();

  const handlePress = (item) => {
    // Navigate to a different page or screen
    navigation.navigate('StorePage', {  items: storeItems });
  };
  const handleFavorite = (item) => {
    
    const updatedData = menuList.map((dataItem) => {
        
      if (dataItem.id === item.id) {
        return { ...dataItem, isFavorite: !dataItem.isFavorite };
      }
      return dataItem;
    });
   
    setMenuList(updatedData);
  };
    // Render each item in the list
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={[styles.itemContainer, { width: (screenWidth/2 )-16}]}>
            <Image source={item.image} style={styles.itemImage} resizeMode="contain"/>
            <View style={styles.itemContent}>
            <Text style={styles.itemText}>{item.title}</Text>
            <TouchableOpacity onPress={() => handleFavorite(item)} style={styles.favoriteButton}>
  {item.isFavorite ? (
    <AntDesign name="heart" size={23} color="black" />
  ) : (
    <AntDesign name="hearto" size={23} color="black" />
  )}
</TouchableOpacity>
        </View>
        </View>
      </TouchableOpacity>
      
    );
    
    return (
        <FlatList
        data={menuList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        
      />
    )
    
    
  }
  
    function renderSearch(){
    return (
        <View style={styles.container}>
      {renderLogo()}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginRight: 2 }}>
          <Image source={require('../assets/menu.png')} style={{ width: 24, height: 24,tintColor:"#000000" }} />
        </TouchableOpacity>
        <View 
            style={{
                flexDirection:'row',
                height:50,
                alignItems:'center',
                marginHorizontal:24,
                marginVertical:8,
                paddingHorizontal:12,
                borderRadius:12,
                flex:1,
                backgroundColor: '#F8F8F8',
                          }}
        >
            <Image source={require("./../assets/search.png")}
               style={{ width:20,height:20,tintColor: '#000000'
               }}/>
            <TextInput
            style={{
                flex:1,
                marginLeft:12,
                fontFamily: fontLoaded ? 'CoolFont' : 'Arial', fontSize:18, lineHeight: 22,color:'#000000'



            }} placeholder='    Find a store'/>

</View>
        </View>
        </View>

    )
}
    const FlatListRef =React.useRef()
    React.useEffect(()=>{
    setSelectedTab("MainLayout")},[])
    
    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Header
        style={{ backgroundColor: '#FF4F4F' }}
        statusBarProps={{ barStyle: 'dark-content' }}
        centerComponent={{ text: 'Home', style: { color: '#000000', fontSize: 20 } }}
      />
        <View style={{
            flex:1,
            paddingTop:30

        }}>
           
            {renderSearch()}
            <View style={{ flex: 1 }}>
      <MyFlatList data={menuList}
  renderItem={({ item }) => renderItem(item)}
  numColumns={numColumns}/>
    </View>
</View>
        </View>
        
       
    )
}


function mapStateToProps(state){
    return{
        selectedTab:state.tabReducer.selectedTab
    }
}
function mapDispatchToProps(dispatch){
    return{
        setSelectedTab:(selectedTab)=>{return dispatch(setSelectedTab(selectedTab)) }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)
(MainLayout)