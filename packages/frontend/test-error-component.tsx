import React from 'react';
import { View, Text, Button, Alert } from 'react-native';

const ErrorComponent = () => {
  const triggerError = () => {
    throw new Error('これはテストエラーです');
  };

  return (
    <View>
      <Text>ErrorBoundaryテスト用コンポーネント</Text>
      <Button title="エラーを発生させる" onPress={triggerError} />
    </View>
  );
};

// わざとエラーを発生させるテストファイル
const TestErrorComponent = () => {
  const triggerTypeError = () => {
    // @ts-ignore
    const obj = null;
    obj.property; // TypeError発生
  };

  const triggerReferenceError = () => {
    // @ts-ignore
    nonExistentFunction(); // ReferenceError発生
  };

  return (
    <View>
      <Button title="TypeError発生" onPress={triggerTypeError} />
      <Button title="ReferenceError発生" onPress={triggerReferenceError} />
    </View>
  );
};

export { ErrorComponent, TestErrorComponent };
