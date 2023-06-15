import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabActions';
import { AntDesign } from '@expo/vector-icons';
const Favorites = ({ navigation, setSelectedTab }) => {
    
  const data = [
    { id: '1', title: 'ZARA', image: require("./../assets/zara.png"), isFavorite: true },
    { id: '2', title: 'NIKE', image: require("./../assets/nike.png"), isFavorite: true },
    { id: '3', title: 'ADIDAS', image: require("./../assets/adidas.png"), isFavorite: true },
    { id: '4', title: 'BERSHKA', image: require("./../assets/bershka.png"), isFavorite: true },
    { id: '5', title: 'PUMA', image: require("./../assets/puma.png"), isFavorite: true },
    { id: '6', title: 'MANGO', image: require("./../assets/Mango.png"), isFavorite: true },
  ];
  const [favorites, setFavorites] = React.useState(data.filter(item => item.isFavorite));

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
      backgroundColor: '#ebebeb',
      borderRadius: 8,
      height: 188,
      width: 150,
      marginBottom: 10
    },
    itemImage: {
      width: 125,
      height: 125,
      marginBottom: 15,
      borderRadius: 40,
      marginTop: 5
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
    },
    itemContent: {
      flexDirection: 'row',
      alignItems: 'left',
      paddingHorizontal: 10,
    },
    favoriteButton: {
      marginLeft: 16,
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
        <View style={[styles.itemContainer, { width: 178 }]}>
          <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
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
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
      />
    );
  };

  React.useEffect(() => {
    setSelectedTab("Favorites");
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MyFlatList />
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