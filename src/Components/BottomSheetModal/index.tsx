import React, {forwardRef, useMemo} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';

import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

const BottomSheetFilterModal: React.ForwardRefExoticComponent<
  React.PropsWithChildren<{}> & React.RefAttributes<BottomSheet>
> = forwardRef((props, ref) => {
  // variables
  const snapPoints = useMemo(() => ['70%'], []);

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      pressBehavior={'close'}
    />
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      handleComponent={() => {
        return (
          <View style={styles.closeLineContainer}>
            <View style={styles.closeLine}></View>
          </View>
        );
      }}>
      {props?.children}
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  closeLineContainer: {
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  closeLine: {
    width: 60,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'black',
    marginTop: 9,
  },
});

export default BottomSheetFilterModal;
