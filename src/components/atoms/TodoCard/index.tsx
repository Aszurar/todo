import React, { memo, useState } from 'react';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { TodoProps } from 'src/dto/todoDTO';
import THEME from '@theme/index';

import TrashSVG from '@icons/trash.svg';
import TrashRedSVG from '@icons/trash-red.svg';

type TodoCardProps = {
  item: TodoProps;
  onChecked: () => void;
  onDelete: () => void;
};
export function TodoCard({ item, onChecked, onDelete }: TodoCardProps) {
  const [deleteButtonPressed, setDeleteButtonPressed] = useState(false);
  const [cardFocused, setCardFocused] = useState(false);

  function handleDeleteButtonPressedActivated() {
    setDeleteButtonPressed(true);
  }
  function handleDeleteButtonPressedDeactivated() {
    setDeleteButtonPressed(false);
  }

  function handleToggleCardFocused() {
    setCardFocused(prevState => !prevState);
  }

  const cardFocusedStyle = cardFocused
    ? { height: 'auto', numberOfLines: undefined, paddingVertical: 16 }
    : { height: 64, numberOfLines: 2, paddingVertical: 12 };

  const borderColorCheck = { borderColor: THEME.COLORS.BLUE_DARK };
  const borderColorUncheck = { borderColor: THEME.COLORS.BLUE };

  const textCheckStyle = {
    textDecorationLine: 'line-through',
    color: THEME.COLORS.GRAY_300,
  };
  const textUncheckStyle = { color: THEME.COLORS.GRAY_100 };

  const cardStyle = item.isChecked
    ? { borderColorCheckBox: borderColorCheck, textStyle: textCheckStyle }
    : { borderColorCheckBox: borderColorUncheck, textStyle: textUncheckStyle };

  const TrashIcon = deleteButtonPressed ? TrashRedSVG : TrashSVG;

  return (
    <Pressable
      style={[
        styles.container,
        {
          height: cardFocusedStyle.height,
          paddingVertical: cardFocusedStyle.paddingVertical,
        },
      ]}
      onPress={handleToggleCardFocused}>
      <BouncyCheckbox
        size={24}
        disableText
        fillColor={THEME.COLORS.BLUE_DARK}
        unfillColor={THEME.COLORS.GRAY_400}
        disableBuiltInState
        onPress={onChecked}
        isChecked={item.isChecked}
        innerIconStyle={[
          styles.checkboxBorderWidth,
          cardStyle.borderColorCheckBox,
        ]}
        style={styles.checkBoxStyle}
      />
      <View style={styles.textContainer}>
        <Text
          style={[styles.text, cardStyle.textStyle]}
          numberOfLines={cardFocusedStyle.numberOfLines}
          ellipsizeMode="tail">
          {item.title}
        </Text>
      </View>
      <Pressable
        onPressIn={handleDeleteButtonPressedActivated}
        onPressOut={handleDeleteButtonPressedDeactivated}
        onPress={onDelete}>
        <TrashIcon />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: THEME.COLORS.GRAY_400,
  },
  checkBoxStyle: {
    padding: 8,
  },
  checkBoxborderColor: {
    borderColor: THEME.COLORS.BLUE,
  },
  checkboxBorderWidth: {
    borderWidth: 2,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    fontFamily: THEME.FONTS.REGULAR,
    textAlign: 'justify',
  },
});

export const MemoizedTodoCard = memo(TodoCard, (prevProps, nextProps) => {
  return prevProps.item.isChecked === nextProps.item.isChecked;
});
