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
const StorePage = ({ navigation, route }) => {
  const { items } = route.params;
  const [itemsList, setitemsList] = React.useState(items);
  
  React.useEffect(() => {
    setitemsList(items);
  }, [items]);
 
  const screenWidth = Dimensions.get('window').width;

   navigation = useNavigation();
  console.log('Items:', items);
  
  const numColumns = 1;
  const styles = StyleSheet.create({
    
    itemContainer: {
      flex: 1,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      marginVertical: 10,
      marginHorizontal: 8,
      backgroundColor: '#ebebeb',
      borderRadius: 8,
      height:178,width:255,
      marginBottom:10,
    },
    itemImage: {
      width: 150,
      height: 90,
      marginBottom: 15,
      borderRadius: 40,
      marginTop:5
    },
      textContainer: {
        marginTop:15,
        flexDirection: 'row',
        alignItems: 'left',
        flex: 1,
      },
      itemPrice:{
        fontSize: 19,
        fontWeight: 'bold',
        marginRight:24,
        alignContent:'right',
        
      },
      itemText: {
        fontSize: 19,
        fontWeight: 'bold',
        flex:1,
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
        tintColor: '#000000',alignItems:'center',
      },

  });



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
                backgroundColor:'#ebebeb'
            }}
        >
            <Image source={require("./../assets/search.png")}
               style={{ width:20,height:20,tintColor:"#000000"
               }}/>
            <TextInput
            style={{
                flex:1,
                marginLeft:12, fontFamily: "Poppins-Regular", fontSize:18, lineHeight: 22



            }} placeholder='Find a product'/>

</View>
        </View>
        </View>

    )
}
const MyFlatList = () => {
  
  const handlePress = (item) => {
    // Handle press action for a specific item
    console.log('Pressed item:', item);
  };

  

const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, { width:screenWidth -40 }]}>
      <Image source={item.image} style={styles.itemImage} resizeMode="contain"/>
      <View style={[styles.textContainer, { flexWrap: 'wrap' }]}>
        <Text style={styles.itemText } >{item.name}</Text>
        
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
    
    </View>
);
return (
  <FlatList
  data={itemsList}
  renderItem={renderItem}
  numColumns={numColumns}
  
/>
)

}

const FlatListRef =React.useRef()

  function renderLogo() {
    return (
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logotran.png')} style={styles.logoImage} resizeMode="contain" />
      </View>
    );
  }


  return (
    <View style={{
      flex:1,
      paddingTop:30

  }}>
     
      {renderSearch()}
      
      <View style={{ flex: 1 }}>
      <MyFlatList data={itemsList}
  renderItem={({ item }) => renderItem(item)}
  numColumns={numColumns}/>
    </View>
    </View>

   
    )
    };



  export default StorePage;

