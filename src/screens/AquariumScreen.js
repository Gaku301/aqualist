import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Card, Paragraph, Text, Title } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

Icon.loadFont(); // Iconを読み込む時にエラーが出ないように

const AquariumScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width; // デバイスwindowの横幅
  const contentWidth = windowWidth - (windowWidth / 10); // 一列分の横幅
  const oneQuarterWidth = (windowWidth / 10) / 4; // カードマージンの値
  return (
    <ScrollView>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Card
          elevation={3}
          style={{backgroundColor: 'white', margin: oneQuarterWidth, width: contentWidth / 2}}
          onPress={() => navigation.navigate('AquariumDetail', {})}
        >
          <Card.Content style={{alignItems: 'center'}}>
            <Title>60セafdsafasfsadasfaaaaaチ</Title>
            <Paragraph>4年目</Paragraph>
            <Icon name="fishbowl-outline" size={80}/>
          </Card.Content>
        </Card>
        <Card
          elevation={3}
          style={{backgroundColor: 'white', margin: oneQuarterWidth, width: contentWidth / 2}}
          >
          <Card.Content style={{alignItems: 'center'}}>
            <Title>水槽</Title>
            <Paragraph>4年目</Paragraph>
            <Icon name="fishbowl-outline" size={80}/>
          </Card.Content>
        </Card>
        <Card
          elevation={3}
          style={{backgroundColor: 'white', margin: oneQuarterWidth, width: contentWidth / 2}}
        >
          <Card.Content style={{alignItems: 'center'}}>
            <Title>Card title</Title>
            <Paragraph>4年目</Paragraph>
            <Icon name="fishbowl-outline" size={80}/>
          </Card.Content>
        </Card>
        <Card
          elevation={3}
          style={{backgroundColor: 'white', margin: oneQuarterWidth, width: contentWidth / 2}}
        >
          <Card.Content style={{alignItems: 'center'}}>
            <Title>Card title</Title>
            <Paragraph>4年目</Paragraph>
            <Icon name="fishbowl-outline" size={80}/>
          </Card.Content>
        </Card>
        <Card
          elevation={3}
          style={{backgroundColor: 'white', margin: oneQuarterWidth, width: contentWidth / 2}}
        >
          <Card.Content style={{alignItems: 'center'}}>
            <Title>Card title</Title>
            <Paragraph>4年目</Paragraph>
            <Icon name="fishbowl-outline" size={80}/>
          </Card.Content>
        </Card>
        <Card
          elevation={3}
          style={{backgroundColor: 'white', margin: oneQuarterWidth, width: contentWidth / 2}}
        >
          <Card.Content style={{alignItems: 'center'}}>
            <Title>Card title</Title>
            <Paragraph>4年目</Paragraph>
            <Icon name="fishbowl-outline" size={80}/>
          </Card.Content>
        </Card>
        <Card
          elevation={3}
          style={{backgroundColor: 'white', margin: oneQuarterWidth, width: contentWidth / 2}}
        >
          <Card.Content style={{alignItems: 'center'}}>
            <Title>Card title</Title>
            <Paragraph>4年目</Paragraph>
            <Icon name="fishbowl-outline" size={80}/>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default AquariumScreen;
