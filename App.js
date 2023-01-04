import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/screens/HomeScreen';
import SettingScreen from './src/screens/SettingScreen';
import AquariumScreen from './src/screens/AquariumScreen';
import AquariumDetailScreen from './src/screens/AquariumDetailScreen';
import { Button, Dialog, Portal, Snackbar, TextInput} from 'react-native-paper';
import { openRealm } from './src/realm';
import DropDownPicker from 'react-native-dropdown-picker';


Ionicons.loadFont(); // Ioniconsを読み込む時にエラーが出ないように
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const realm = openRealm();
const primaryColor = '#00BBF2';
const grayColor = '#393E46';
const selectGrayColor = '#ADADAD';

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
  // aquarium追加ダイアログ
  const [visible, setVisible] = React.useState(false);
  const date = new Date();
  const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const [aquariumData, setAquariumData] = React.useState({
    name: '',
    set_up_date: today,
    kind: 0,
    amount: '',
    size: '',
    memo: '',
    created_at: '',
  });
  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    // selectboxのフォーカスを外す
    setColor(selectGrayColor);
    setOpen(false);
    // Dialogを閉じる
    setVisible(false);
  };
  const [visibleMessage, setVisibleMessage] = React.useState(false);
  const [validateAquarium, setValidateAquarium] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [option, setOption] = React.useState([
    {label: '淡水', value: 1},
    {label: '海水', value: 2},
  ]);
  const [color, setColor] = React.useState(selectGrayColor);

  // aqualist追加ダイアログ
  const [visibleDetail, setVisibleDetail] = React.useState(false);
  const showDetailDialog = () => setVisibleDetail(true);
  const hideDetailDialog = () => setVisibleDetail(false);

  // Aquariumを保存
  const addAquarium = () => {
    const aquariums = realm.objects('Aquarium');
    const last_aquarium = aquariums.sorted('_id', true)[0];
    // idを取得
    const last_aquarium_id = last_aquarium?._id ?? 0;
    if (validation() !== true){
      setVisibleMessage(true);
      return;
    }

    // データベースにデータを追加
    realm.write(() => {
      realm.create('Aquarium', {
        _id: last_aquarium_id + 1,
        name: aquariumData.name,
        set_up_date: aquariumData.set_up_date,
        kind: aquariumData.kind,
        amount: aquariumData.amount,
        size: aquariumData.size,
        memo: aquariumData.memo,
        created_at: new Date(),
      });
    });
    // ダイアログを閉じる
    hideDialog();
    console.log('ok');
  };

  /**
   * Aquarium保存時のバリデーション
   * @returns {Boolean}
   */
  const validation = () => {
    let target = '';

    if (!aquariumData.name) {
      // 水槽名
      target = '【水槽名】';
    } else if (!aquariumData.set_up_date) {
      // 立ち上げ日
      target = '【立ち上げ日】';
    } else if (!aquariumData.kind) {
      // 海水 or 淡水
      target = '【種類】';
    } else if (!aquariumData.amount){
      // 水量
      target = '【水量】';
    } else if (!aquariumData.size) {
      // サイズ
      target = '【サイズ】';
    }

    if (target !== '') {
      setValidateAquarium(`${target}を入力してください`);
      return false;
    } else {
      return true;
    }
  };

  // 生体を保存
  const addAqualist = () => {
    const aqualists = realm.objects('Aqualist');
    const last_aqualist = aqualists.sorted('_id', true)[0];
    // idを取得
    const last_aqualist_id = last_aqualist?.id ?? 0;
  };

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
            <TextInput
              label="水槽名"
              style={{backgroundColor: 'white'}}
              onChangeText={(value) => setAquariumData({...aquariumData, name: value})}
            />
            <TextInput
              label="立ち上げ日"
              defaultValue={aquariumData.set_up_date}
              style={{backgroundColor: 'white'}}
              onChangeText={(value) => setAquariumData({...aquariumData, set_up_date: value})}
            />
            <DropDownPicker
              placeholder="種類"
              open={open}
              value={aquariumData.kind}
              items={option}
              setOpen={setOpen}
              onSelectItem={(item) => {
                setAquariumData({...aquariumData, kind: item.value});
              }}
              setItems={setOption}
              onOpen={() => setColor(primaryColor)}
              onClose={() => setColor(selectGrayColor)}
              style={{borderColor: color, borderTopColor: 'white', borderLeftColor: 'white', borderRightColor: 'white', borderRadius:0, borderWidth: 1}}
              dropDownContainerStyle={{borderColor: color, borderWidth: 2}}
              containerStyle={{marginVertical: 20, borderColor: color}}
              textStyle={{color: grayColor}}
            />
            <TextInput
              label="水量"
              style={{backgroundColor: 'white'}}
              onChangeText={(value) => setAquariumData({...aquariumData, amount: value})}
            />
            <TextInput
              label="サイズ"
              style={{backgroundColor: 'white'}}
              onChangeText={(value) => setAquariumData({...aquariumData, size: value})}
            />
            <TextInput
              label="メモ"
              multiline
              style={{backgroundColor: 'white', height:100}}
              onChangeText={(value) => setAquariumData({...aquariumData, memo: value})}
            />
          </Dialog.Content>
          <Dialog.Actions style={{justifyContent: 'space-between'}}>
            <Button onPress={hideDialog} textColor="#393E46">キャンセル</Button>
            <Button onPress={addAquarium}>追加する</Button>
          </Dialog.Actions>
        </Dialog>
        {/* エラーメッセージ */}
        <Snackbar
          visible={visibleMessage}
          onDismiss={() => setVisibleMessage(false)}
          action={{
            label: 'close',
            color: 'gray',
          }}
        >
          {validateAquarium}
        </Snackbar>
      </Portal>
      {/* Add Pets Dialog */}
      <Portal>
        <Dialog visible={visibleDetail} onDismiss={hideDetailDialog} style={{backgroundColor: 'white'}}>
          <Dialog.Title>生体を追加</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="名前"
              style={{backgroundColor: 'white'}}
            />
            <TextInput
              label="開始日"
              defaultValue={today}
              style={{backgroundColor: 'white'}}
            />
            <TextInput
              label="サイズ"
              style={{backgroundColor: 'white'}}
            />
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
            } 
            // else if (route.name === 'aquarium') {
            //   iconName = focused ? 'ios-list' : 'ios-list-outline';
            // } 
            else if (route.name === 'setting') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="home" component={HomeTab} options={{headerShown: false}} />
        {/* <Tab.Screen name="aquarium" component={AquariumTab} options={{headerShown: false}} /> */}
        <Tab.Screen name="setting" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Top;
