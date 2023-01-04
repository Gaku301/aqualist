import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Card, Paragraph, Text, Title } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { openRealm } from "../realm";

Icon.loadFont(); // Iconを読み込む時にエラーが出ないように

/**
 * 全てのアクアリウムをDBから取得
 * @returns {Array}
 */
const getAllAquarium = () => {
  let aquariums = [];
  try {
    const realm = openRealm();
    aquariums = realm.objects('Aquarium');
  } catch (error) {}

  return aquariums;
};

const AquariumScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width; // デバイスwindowの横幅
  const contentWidth = windowWidth - (windowWidth / 10); // 一列分の横幅
  const oneQuarterWidth = (windowWidth / 10) / 4; // カードマージンの値
  const aquariums = getAllAquarium();

  return (
    <ScrollView>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {aquariums.map((aquarium) => {
          const date = new Date();
          const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
          let set_up_date = aquarium.set_up_date ?? today;
          set_up_date = new Date(set_up_date);
          let y = date.getFullYear() - set_up_date.getFullYear();

          return (
            <Card
              elevation={3}
              style={{backgroundColor: 'white', margin: oneQuarterWidth, width: contentWidth / 2}}
              onPress={() => navigation.navigate('AquariumDetail', {})}
            >
              <Card.Content style={{alignItems: 'center'}}>
                <Title>{aquarium.name ?? '名称不明'}</Title>
                <Paragraph>{y}</Paragraph>
                <Icon name="fishbowl-outline" size={80}/>
              </Card.Content>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default AquariumScreen;
