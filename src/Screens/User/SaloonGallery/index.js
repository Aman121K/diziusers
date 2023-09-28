// import React from "react";
// import { Text, View } from 'react-native';
// import UserCartHeader from "../../../Components/UserCartHeader";
// const SaloonGallery = ({ navigation }) => {
//     return (
//         <View>
//             <UserCartHeader navigation={navigation} title="Saloon Gallary" />
//             <Text>Saloon Gallery</Text>
//         </View>
//     )
// }
// export default SaloonGallery;

import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Images } from '../../../Constant/Images';
import UserCartHeader from '../../../Components/UserCartHeader';
import { scaleHeight } from '../../../Constant/DynamicSize';

const SaloonGallery = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const data = [
    { id: 1, source: Images.SaloonUser },
    { id: 2, source: Images.SaloonUser },
    { id: 3, source: Images.SaloonUser },
    { id: 4, source: Images.SaloonUser },
    { id: 5, source: Images.SaloonUser },
    { id: 6, source: Images.SaloonUser },
  ];

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
         <UserCartHeader navigation={navigation} title="Saloon Gallary" />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item.source)}>
            <Image source={item.source} style={styles.image} />
          </TouchableOpacity>
        )}
      />
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
          <Image source={selectedImage} style={styles.modalImage} resizeMode="contain" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:scaleHeight(5),
  },
  image: {
    width: 100,
    height: 100,
     marginTop: scaleHeight(10),
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    color: 'red',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default SaloonGallery;
