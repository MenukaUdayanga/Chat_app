import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './style';

export default function FirstPage({navigation}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login Page');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={{flex: 1}}>
        <Image
          style={styles.Loimage}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/chatapp-98176.appspot.com/o/Logo.png?alt=media&token=a10bd186-1fb8-4074-9e01-177d445d4b4c',
          }}
        />
      </View>
    </View>
  );
}
