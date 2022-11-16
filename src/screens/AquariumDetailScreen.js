import React from "react";
import { ScrollView } from "react-native";
import { Card, List, Paragraph, Text, Title } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

Icon.loadFont(); // Iconを読み込む時にエラーが出ないように

const AquariumDetailScreen = ({ navigation }) => {
  const color_gray = '#393E46';
  return (
    <ScrollView>
      <List.Item
        title="カクレクマノミ"
        titleStyle={{fontSize: 20, color: color_gray}}
        description="3ヶ月"
        descriptionStyle={{color: color_gray}}
        left={props => <Icon {...props} size={60} name="fish" color={color_gray} />}
        right={props => <Icon {...props} size={30} color={'#00BBF2'} name="chevron-right"/>}
      />
      <List.Item
        title="珊瑚"
        titleStyle={{fontSize: 20, color: color_gray}}
        description="4ヶ月"
        descriptionStyle={{color: color_gray}}
        left={props => <Icon {...props} size={60} name="leaf" color={color_gray} />}
        right={props => <Icon {...props} size={30} color={'#00BBF2'} name="chevron-right"/>}
      />
      <List.Item
        title="巻き貝"
        titleStyle={{fontSize: 20, color: color_gray}}
        description="1年5ヶ月"
        descriptionStyle={{color: color_gray}}
        left={props => <Icon {...props} size={60} name="powershell" color={color_gray} />}
        right={props => <Icon {...props} size={30} color={'#00BBF2'} name="chevron-right"/>}
      />
      <List.Item
        title="さめ"
        titleStyle={{fontSize: 20, color: color_gray}}
        description="1年5ヶ月"
        descriptionStyle={{color: color_gray}}
        left={props => <Icon {...props} size={60} name="shark" color={color_gray} />}
        right={props => <Icon {...props} size={30} color={'#00BBF2'} name="chevron-right"/>}
      />
      <List.Item
        title="巻き貝"
        titleStyle={{fontSize: 20, color: color_gray}}
        description="1年5ヶ月"
        descriptionStyle={{color: color_gray}}
        left={props => <Icon {...props} size={60} name="fishbowl-outline" color={color_gray} />}
        right={props => <Icon {...props} size={30} color={'#00BBF2'} name="chevron-right"/>}
      />
      <List.Item
        title="バクテリア"
        titleStyle={{fontSize: 20, color: color_gray}}
        description="1年5ヶ月"
        descriptionStyle={{color: color_gray}}
        left={props => <Icon {...props} size={60} name="bacteria-outline" color={color_gray} />}
        right={props => <Icon {...props} size={30} color={'#00BBF2'} name="chevron-right"/>}
      />
      <List.Item
        title="クラゲ"
        titleStyle={{fontSize: 20, color: color_gray}}
        description="1年5ヶ月"
        descriptionStyle={{color: color_gray}}
        left={props => <Icon {...props} size={60} name="jellyfish-outline" color={color_gray} />}
        right={props => <Icon {...props} size={30} color={'#00BBF2'} name="chevron-right"/>}
      />
      <List.Item
        title="水草"
        titleStyle={{fontSize: 20, color: color_gray}}
        description="1年5ヶ月"
        descriptionStyle={{color: color_gray}}
        left={props => <Icon {...props} size={60} name="barley" color={color_gray} />}
        right={props => <Icon {...props} size={30} color={'#00BBF2'} name="chevron-right"/>}
      />
    </ScrollView>
  );
};

export default AquariumDetailScreen;
