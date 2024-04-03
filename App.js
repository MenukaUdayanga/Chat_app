import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function ChatScreen() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged(newUser => {
      setUser(newUser);
    });

    const unsubscribeMessages = database()
      .ref('/messages')
      .on('value', snapshot => {
        const messageList = [];
        snapshot.forEach(child => {
          messageList.push(child.val());
        });
        setMessages(messageList);
      });

    // Cleanup function
    return () => {
      unsubscribeAuth();
      unsubscribeMessages();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        text: message,
        senderId: user.uid,
        senderName: user.displayName || 'Anonymous', // Use displayName or 'Anonymous' if not available
        timestamp: database.ServerValue.TIMESTAMP,
      };

      database()
        .ref('/messages')
        .push(newMessage)
        .then(() => setMessage(''))
        .catch(error => console.error('Error sending message:', error));
    }
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <FlatList
        style={{marginTop: 50}}
        data={messages}
        renderItem={({item}) => (
          <Text>{`${item.senderName}: ${item.text}`}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          placeholder="Type your message..."
          style={{flex: 1, marginRight: 10}}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}
