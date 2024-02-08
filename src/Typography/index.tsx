import React from 'react';
import {Text, StyleSheet, StyleProp, TextStyle} from 'react-native';

const createCustomTextComponent = (style: StyleProp<TextStyle>) => {
  return ({
    style: styleProp,
    ...otherProps
  }: {
    style?: StyleProp<TextStyle>;
    children: React.ReactNode;
  }) => (
    <Text style={[style, styleProp]} {...otherProps}>
      {otherProps.children}
    </Text>
  );
};

// Define the styles
const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontFamily: 'Satoshi',
    fontWeight: '500',
    textAlign: 'center',
    color: 'black',
  },
  subTitleText: {
    color: 'black',
    fontFamily: 'Satoshi',
    fontSize: 18,
    fontWeight: '500',
  },
  labelText: {
    color: 'black',
    fontFamily: 'Satoshi',
    fontSize: 16,
    fontWeight: '400',
  },
  paragraphText: {
    color: 'black',
    fontFamily: 'Satoshi',
    fontSize: 16,
    fontWeight: '500',
  },
});

/**
 * TitleText, used to render the Titles in a screen
 */
export const TitleText = createCustomTextComponent(styles.titleText);

/**
 * SubTitle Text, used to render SubTitles
 */
export const SubTitleText = createCustomTextComponent(styles.subTitleText);

/**
 * LabelText, used to render the Labels and descriptions in a screen
 */
export const LabelText = createCustomTextComponent(styles.labelText);

/**
 * ParagraphText, used to render the paragraph text in a screen
 */
export const ParagraphText = createCustomTextComponent(styles.paragraphText);
