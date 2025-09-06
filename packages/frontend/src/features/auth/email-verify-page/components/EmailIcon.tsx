import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/theme';

interface Props {
  /** アニメーション効果を有効にするか */
  animated?: boolean;
}

/**
 * メールアイコン表示コンポーネント
 * 
 * メール認証待ち画面の上部に表示される大きなメールアイコン
 * オプションでアニメーション効果付き
 */
export const EmailIcon: React.FC<Props> = ({ animated = true }) => {
  const { colors } = useTheme();
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const opacityAnimation = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    if (!animated) return;

    // ふわふわとしたアニメーション効果
    const createAnimation = () => {
      return Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleAnimation, {
            toValue: 1.1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacityAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnimation, {
            toValue: 0.7,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ]);
    };

    const startAnimation = () => {
      createAnimation().start(() => {
        // アニメーション完了後、再度開始
        startAnimation();
      });
    };

    startAnimation();
  }, [animated, scaleAnimation, opacityAnimation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconContainer,
          { backgroundColor: colors.surface.elevated },
          animated && {
            transform: [{ scale: scaleAnimation }],
            opacity: opacityAnimation,
          },
        ]}
      >
        <Ionicons
          name="mail"
          size={80}
          color={colors.primary}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});
