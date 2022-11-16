import React from 'react';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { View } from 'react-native';
import { Button, Dialog, FAB, Paragraph, Portal, TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

const primaryColor = '#00BBF2';
const grayColor = '#393E46';
const selectGrayColor = '#ADADAD';

const HomeScreen = () => {
  // 日本語に設定
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

  const items = {
    '2022-11-22': [{name: 'item 1 - any js object'}],
    '2022-11-23': [{name: 'item 2 - any js object', height: 80}],
    '2022-11-24': [],
    '2022-11-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}],
    '2022-11-26': [{name: 'item 3 - any js object'}, {name: 'any js object'}],
  };

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    // selectboxのフォーカスを外す
    setColor(selectGrayColor);
    setOpen(false);
    // Dialogを閉じる
    setVisible(false);
  };
  const [date, setDate] = React.useState('2022-11-7');

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [option, setOption] = React.useState([
    {label: 'apple', value: 'appale'},
    {label: 'banana', value: 'banana'},
  ]);
  const [color, setColor] = React.useState(selectGrayColor);

  return (
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        refreshControl={null}
        showClosingKnob={true}
        refreshing={false}
        onDayPress={day => {
          console.log(day);
          setDate(day.dateString);
        }}
        renderEmptyData={() => { return <View />;}}
        // 日付ごとのitemをここで表示
        renderItem={(item, firstItemInDay) => {
          console.log(item);
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
            <TextInput label="日付" defaultValue={date} style={{backgroundColor: 'white'}} />
            <DropDownPicker
              placeholder='aquarium'
              open={open}
              value={value}
              items={option}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setOption}
              onOpen={() => setColor(primaryColor)}
              onClose={() => setColor(selectGrayColor)}
              style={{borderColor: color, borderTopColor: 'white', borderLeftColor: 'white', borderRightColor: 'white', borderRadius:0, borderWidth: 1}}
              dropDownContainerStyle={{borderColor: color, borderWidth: 2}}
              containerStyle={{marginVertical: 20, borderColor: color}}
              textStyle={{color: grayColor}}
            />
            <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'space-between'}}>
              <TextInput label="水温" style={{backgroundColor: 'white', width: '45%'}} right={<TextInput.Affix text='°C' />} />
              <TextInput label="水量" style={{backgroundColor: 'white', width: '45%'}} right={<TextInput.Affix text='ℓ' />} />
            </View>
            <TextInput label="メモ" multiline={true} style={{backgroundColor: 'white', height:110}} />
          </Dialog.Content>
          <Dialog.Actions style={{justifyContent: 'space-between'}}>
            <Button onPress={hideDialog} textColor={grayColor}>キャンセル</Button>
            <Button onPress={hideDialog}>追加する</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};


export default HomeScreen;
