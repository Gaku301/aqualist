import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Card, TextInput, Title } from "react-native-paper";

const SettingScreen = () => {
  return (
    <ScrollView>
      <Card
        elevation={3}
        style={{backgroundColor:'white', margin: 10}}
      >
        <Card.Content>
          <Title>ユーザー情報</Title>
          <TextInput label="ユーザー名" style={{backgroundColor: 'white'}} />
          <TextInput label="ユーザー名" style={{backgroundColor: 'white'}} />
          <TextInput label="ユーザー名" style={{backgroundColor: 'white'}} />
        </Card.Content>
      </Card>
      <Card
        elevation={3}
        style={{backgroundColor:'white', margin: 10}}
      >
        <Card.Content>
          <Title>設定</Title>
          <TextInput label="ユーザー名" style={{backgroundColor: 'white'}} />
          <TextInput label="ユーザー名" style={{backgroundColor: 'white'}} />
          <TextInput label="ユーザー名" style={{backgroundColor: 'white'}} />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default SettingScreen;
