import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {PropsWithChildren, useState} from 'react';
import DiceOne from '../src/images/One.png';
import DiceTwo from '../src/images/Two.png';
import DiceThree from '../src/images/Three.png';
import DiceFour from '../src/images/Four.png';
import DiceFive from '../src/images/Five.png';
import DiceSix from '../src/images/Six.png';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

type DiceProps = PropsWithChildren<{
  imageUrl: ImageSourcePropType;
}>;

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const Dice = ({imageUrl}: DiceProps): JSX.Element => {
  return <Image style={styles.image} source={imageUrl} />;
};
export default function App(): JSX.Element {
  const [diceOne, setDiceOne] = useState<number>(0);
  const [diceTwo, setDiceTwo] = useState<number>(0);

  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    return randomNumber;
  };

  const image = (randomNumber: number): ImageSourcePropType => {
    let diceImage;
    switch (randomNumber) {
      case 1:
        diceImage = DiceOne;
        break;
      case 2:
        diceImage = DiceTwo;
        break;
      case 3:
        diceImage = DiceThree;
        break;
      case 4:
        diceImage = DiceFour;
        break;
      case 5:
        diceImage = DiceFive;
        break;
      case 6:
        diceImage = DiceSix;
        break;
      default:
        diceImage = DiceOne;
        break;
    }

    return diceImage;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.winStatus}>
        {diceOne === diceTwo ? 'You Win 🎊' : 'You Lose 🫤'}
      </Text>
      <View style={styles.diceContainer}>
        <Dice imageUrl={image(diceOne!)} />
        <Dice imageUrl={image(diceTwo!)} />
      </View>
      <Pressable
        onPress={() => {
          setDiceOne(rollDice());
          setDiceTwo(rollDice());
          ReactNativeHapticFeedback.trigger('impactLight', options);
        }}
        style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Roll dice</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
  },
  image: {
    width: 130,
    height: 130,
  },
  buttonContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#7f94fb',
    backgroundColor: '#C1CEFE',
  },
  buttonText: {
    fontSize: 20,
    color: '#5571ff',
  },
  diceContainer: {
    flexDirection: 'row',
    padding: 10,
    gap: 20,
  },
  winStatus: {
    fontSize: 30,
    color: 'black',
  },
});
