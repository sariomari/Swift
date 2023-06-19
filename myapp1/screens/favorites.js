import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabActions';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
const Favorites = ({ navigation, setSelectedTab }) => {
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
  const data = [
    { id: '1', title: 'ZARA', image: require("./../assets/zara.png"), isFavorite: true },
    { id: '2', title: 'NIKE', image: require("./../assets/nike.png"), isFavorite: true },
    { id: '3', title: 'ADIDAS', image: require("./../assets/adidas.png"), isFavorite: true },
    { id: '4', title: 'BERSHKA', image: require("./../assets/bershka.png"), isFavorite: true },
    { id: '5', title: 'PUMA', image: require("./../assets/puma.png"), isFavorite: true },
    { id: '6', title: 'MANGO', image: require("./../assets/Mango.png"), isFavorite: true },
  ];
  const [favoritesList, setFavorites] = React.useState(data.filter(item => item.isFavorite));

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
      backgroundColor: '#B7E1A1',
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
    const handlePress = (item) => {
      // Navigate to a different page or screen
      navigation.navigate('Details', { itemId: item.id });
    };

    const handleFavorite = (item) => {
        const updatedData = data.map((dataItem) => {
          if (dataItem.id === item.id) {
            return { ...dataItem, isFavorite: !dataItem.isFavorite };
          }
          return dataItem;
        });
      
        const updatedFavorites = updatedData.filter((item) => item.isFavorite);
        setFavorites(updatedFavorites);
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
    data={favoritesList}
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
                backgroundColor:'#ebebeb'
            }}
        >
            <Image source={require("./../assets/search.png")}
               style={{ width:20,height:20,tintColor:"#000000"
               }}/>
            <TextInput
            style={{
                flex:1,
                fontFamily: fontLoaded ? 'CoolFont' : 'Arial', fontSize:18, lineHeight: 22,color:'#000000'



            }} placeholder='    Find a store'/>

</View>
        </View>
        </View>

    )
}
   
  

  React.useEffect(() => {
    setSelectedTab("Favorites");
  }, []);
  
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{
          flex:1,
          paddingTop:30

      }}>
         
          {renderSearch()}
          <View style={{ flex: 1 }}>
      <MyFlatList data={favoritesList}
  renderItem={({ item }) => renderItem(item)}
  numColumns={numColumns}/>
    </View>
    </View>
    </View>
  );

    };
function mapDispatchToProps(dispatch) {
  return {
    setSelectedTab: (selectedTab) => {
      return dispatch(setSelectedTab(selectedTab));
    }
  };
}

export default connect(null, mapDispatchToProps)(Favorites);