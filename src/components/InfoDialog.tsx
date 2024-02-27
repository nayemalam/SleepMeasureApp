import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Dialog, Paragraph, Portal } from 'react-native-paper';
import { theme } from '../styles/theme';

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string | React.ReactNode;
  description: string;
  closeButtonText?: string;
};

function InfoDialog({
  isOpen,
  setIsOpen,
  title,
  description,
  closeButtonText = 'Close',
}: Props) {
  return (
    <Portal>
      <Dialog
        visible={isOpen}
        onDismiss={() => {
          setIsOpen(false);
        }}
        style={styles.dialog}>
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={styles.description}>{description}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setIsOpen(false);
            }}>
            <Text style={styles.closeButtonText}>{closeButtonText}</Text>
          </TouchableOpacity>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: theme.colors.slateGray,
  },
  title: {
    color: theme.colors.defaultWhite,
    fontWeight: 'bold',
  },
  description: {
    color: theme.colors.defaultWhite,
  },
  closeButton: {
    width: 100,
    backgroundColor: theme.colors.defaultWhite,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 12,
    justifyContent: 'center',
  },
  closeButtonText: {
    color: theme.colors.defaultBlack,
    fontSize: 15,
  },
});

export default InfoDialog;
