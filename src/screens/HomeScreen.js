import React from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { View, Text, ScrollView } from 'react-native';
import { Button, Card, Dialog, FAB, Paragraph, Portal, Snackbar, TextInput, Title} from 'react-native-paper';

import { getEventsByDate, getMarkedDates, addEventData } from '../utils/events';
import { Picker } from '@react-native-picker/picker';


const primaryColor = '#00BBF2';
const grayColor = '#393E46';
const date = new Date();
// NOTE:ゼロパディングしないとreact-native-calendarのselectedがうまく動作しない
const today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

const HomeScreen = () => {
  // カレンダーを日本語に設定
  LocaleConfig.locales.jp = {
    monthNames: [
      '1月', '2月', '3月',
      '4月', '5月', '6月',
      '7月', '8月', '9月',
      '10月', '11月', '12月',
    ],
    monthNamesShort: [
      '1月', '2月', '3月',
      '4月', '5月', '6月',
      '7月', '8月', '9月',
      '10月', '11月', '12月',
    ],
    dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
  };
  LocaleConfig.defaultLocale = 'jp';

  // Dialogのstate
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  // カレンダーの選択されている日付
  const [selected_date, setSelectedDate] = React.useState(today);
  // Eventが存在するカレンダーの日付

  const [markedDates, setMarkedDates] = React.useState(getMarkedDates(today));
  // Eventのstate
  const [eventData, setEventData] = React.useState({
    date: today,
    title: '',
    color: 'red',
    memo: '',
  });
  // エラーメッセージのstate
  const [visibleMessage, setVisibleMessage] = React.useState(false);
  const [validateEvent, setValidateEvent] = React.useState('');
  // 表示するEvent
  const [events, setEvents] = React.useState(getEventsByDate(today));

  // イベントを保存
  const addEvent = () => {
    const result = addEventData(eventData);
    if (result !== true) {
      // エラーメッセージを表示
      setVisibleMessage(true);
      setValidateEvent(result);
      return;
    }
    // markedDatesを更新
    setMarkedDates(getMarkedDates(selected_date));
    // ダイアログを閉じて終了
    hideDialog();
  };

  return (
    <View style={{flex: 1}}>
      <Calendar
        markingType={'multi-dot'}
        markedDates={{
          ...markedDates,
          [selected_date]: {selected: true},
        }}
        onDayPress={day => {
          // 選択日を変更
          setSelectedDate(day.dateString);
          // 選択日のイベントを取得
          let targetDayEvents = getEventsByDate(day.dateString);
          setEvents(targetDayEvents);
          // ダイアログの「日付」をセット
          setEventData({...eventData, date: day.dateString});
        }}
        // 前月のアクション
        onPressArrowLeft={(subtractMonth, value) => {
          const targetDate = `${value.getFullYear()}-${value.getMonth()}-01`;
          // 一ヶ月のイベントをセットする
          setMarkedDates(getMarkedDates(targetDate));
          subtractMonth();
        }}
        // 次月のアクション
        onPressArrowRight={(addMonth, value) => {
          const targetDate = `${value.getFullYear()}-${value.getMonth() + 2}-01`;
          // 一ヶ月のイベントをセットする
          setMarkedDates(getMarkedDates(targetDate));
          addMonth();
        }}
        theme={{
          'stylesheet.calendar.header': {
            dayTextAtIndex0: {
              color: 'red',
            },
            dayTextAtIndex6: {
              color: 'blue',
            },
          },
        }}
      />
      <View style={{marginVertical: 10, marginLeft: 5}}>
        <Text>{new Date(selected_date).getMonth() + 1} / {new Date(selected_date).getDate()}</Text>
      </View>
      <ScrollView>
        <View>
          {events.map((eventValue) => {
            return (
              <Card style={{backgroundColor: 'white', margin: 5 }} key={eventValue._id}>
                <Card.Content>
                  <View style={{borderBottomColor: eventValue.color ?? 'red', borderBottomWidth: 3, marginBottom: 10}}>
                    <Title>{eventValue.title}</Title>
                  </View>
                  <Paragraph>{eventValue.memo}</Paragraph>
                </Card.Content>
              </Card>
            );
          })}
        </View>
      </ScrollView>
      <FAB
        icon="plus"
        style={{position:'absolute', margin:16, right:0, bottom:0, backgroundColor: primaryColor, borderRadius: 50,}}
        color="white"
        onPress={showDialog}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{backgroundColor: 'white'}}>
          <Dialog.Title>イベントを追加</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="タイトル"
              style={{backgroundColor: 'white'}}
              onChangeText={(value) => setEventData({...eventData, title: value})}
            />
            <TextInput
              label="日付"
              defaultValue={eventData.date}
              style={{backgroundColor: 'white'}}
              onChangeText={(value) => setEventData({...eventData, date: value})}
            />
            <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'space-between'}}>
              <TextInput
                label="水温"
                style={{backgroundColor: 'white', width: '45%'}}
                right={<TextInput.Affix text='°C' />}
              />
              <TextInput
                label="水量"
                style={{backgroundColor: 'white', width: '45%'}}
                right={<TextInput.Affix text='ℓ' />}
              />
            </View>
            <TextInput
              label="メモ"
              multiline={true}
              style={{backgroundColor: 'white', height:110}}
              onChangeText={(value) => setEventData({...eventData, memo: value})}
            />
            <Picker
              selectedValue={eventData.color}
              onValueChange={(itemValue, itemIndex) =>
                setEventData({...eventData, color: itemValue})
              }
              itemStyle={{height: 130, fontSize:16}}
            >
              <Picker.Item label="赤" value="red" />
              <Picker.Item label="青" value="blue" />
              <Picker.Item label="黒" value="black" />
              <Picker.Item label="緑" value="green" />
              <Picker.Item label="黄色" value="yellow" />
              <Picker.Item label="オレンジ" value="orange" />
            </Picker>
          </Dialog.Content>
          <Dialog.Actions style={{justifyContent: 'space-between'}}>
            <Button onPress={hideDialog} textColor={grayColor}>キャンセル</Button>
            <Button onPress={addEvent}>追加する</Button>
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
          {validateEvent}
        </Snackbar>
      </Portal>
    </View>
  );
};


export default HomeScreen;
