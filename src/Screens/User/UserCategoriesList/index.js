// import React from 'react';
// import {View,Text} from 'react-native';
// const UserCategorriesList=()=>{
//     return(
//         <View>
//             <Text> </Text>
//         </View>
//     )
// }
// export default UserCategorriesList;

import React from 'react';
import { View, Text, SectionList } from 'react-native';

const DATA = [
  {
    title: 'A',
    data: ['Alice', 'Alex', 'Andrew'],
  },
  {
    title: 'B',
    data: ['Bob', 'Bill', 'Brad'],
  },
  // Add more sections and data as needed
];

const Item = ({ item }) => (
  <View style={{ padding: 10 }}>
    <Text>{item}</Text>
  </View>
);

const UserCategorriesList = () => {
  return (
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item item={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <View style={{ backgroundColor: '#f0f0f0', padding: 10 }}>
          <Text>{title}</Text>
        </View>
      )}
    />
  );
};

export default UserCategorriesList;
