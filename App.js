import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/screens/HomeScreen';
import SettingScreen from './src/screens/SettingScreen';
import AquariumScreen from './src/screens/AquariumScreen';
import AquariumDetailScreen from './src/screens/AquariumDetailScreen';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { openRealm } from './src/realm';


Ionicons.loadFont(); // Ioniconsを読み込む時にエラーが出ないように
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const realm = openRealm();

const HomeTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: 'home',
        }}
      />
    </Stack.Navigator>
  );
};

const AquariumTab = () => {
  // aquarium Dialog
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  // Aquariumを保存
  const addAquarium = () => {
    const aquariums = realm.objects('Aquarium');
    const last_aquariums = aquariums.sorted('_id', true)[0];
    realm.write(() => {
      realm.create('Aquarium', {
        '_id': last_aquariums._id + 1,
        name: 'テストアクアリウム',
        memo: 'これはメモ',
        created_at: new Date(),
      });
    });
    console.log('ok');
  };

  // detail Dialog
  const [visibleDetail, setVisibleDetail] = React.useState(false);
  const showDetailDialog = () => setVisibleDetail(true);
  const hideDetailDialog = () => setVisibleDetail(false);

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="AquariumScreen"
          component={AquariumScreen}
          options={{
            headerTitle: 'aquarium',
            headerRight: () => (
              <Ionicons
                name="add"
                size={25}
                color={'#00BBF2'}
                onPress={showDialog}
              />
            ),
          }}
        />
        <Stack.Screen
          name="AquariumDetail"
          component={AquariumDetailScreen}
          options={{
            headerBackTitle: '戻る',
            headerTintColor: '#00BBF2', // backボタンとtitleの両方のcolorをセット
            headerTitleStyle: {color: 'black'}, // titleのcolorをblackに戻す
            headerRight: () => (
              <Ionicons
                name="add"
                size={25}
                color={'#00BBF2'}
                onPress={showDetailDialog}
              />
            ),
          }}
        />
      </Stack.Navigator>
      {/* Add Aquarium */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{backgroundColor: 'white'}}>
          <Dialog.Title>Aquariumを追加</Dialog.Title>
          <Dialog.Content>
            <TextInput label="水槽名" style={{backgroundColor: 'white'}} />
            <TextInput label="立ち上げ日" defaultValue={() => {
              let date = new Date();
              return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            }} style={{backgroundColor: 'white'}} />
            <TextInput label="海水or淡水" style={{backgroundColor: 'white'}} />
            <TextInput label="水量" style={{backgroundColor: 'white'}} />
            <TextInput label="サイズ" style={{backgroundColor: 'white'}} />
            <TextInput label="メモ" multiline style={{backgroundColor: 'white', height:100}} />
          </Dialog.Content>
          <Dialog.Actions style={{justifyContent: 'space-between'}}>
            <Button onPress={hideDialog} textColor="#393E46">キャンセル</Button>
            <Button onPress={addAquarium}>追加する</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {/* Add Pets Dialog */}
      <Portal>
        <Dialog visible={visibleDetail} onDismiss={hideDetailDialog} style={{backgroundColor: 'white'}}>
          <Dialog.Title>生体を追加</Dialog.Title>
          <Dialog.Content>
            <TextInput label="名前" style={{backgroundColor: 'white'}} />
            <TextInput label="開始日" defaultValue={() => {
              let date = new Date();
              return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            }} style={{backgroundColor: 'white'}} />
            <TextInput label="メモ" multiline style={{backgroundColor: 'white', height:100}} />
          </Dialog.Content>
          <Dialog.Actions style={{justifyContent: 'space-between'}}>
            <Button onPress={hideDetailDialog} textColor="#393E46">キャンセル</Button>
            <Button onPress={hideDetailDialog}>追加する</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const Top = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = '';
            if (route.name === 'home') {
              iconName = focused ? 'ios-calendar' : 'ios-calendar-sharp';
            } else if (route.name === 'aquarium') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === 'setting') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="home" component={HomeTab} options={{headerShown: false}} />
        <Tab.Screen name="aquarium" component={AquariumTab} options={{headerShown: false}} />
        <Tab.Screen name="setting" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Top;
