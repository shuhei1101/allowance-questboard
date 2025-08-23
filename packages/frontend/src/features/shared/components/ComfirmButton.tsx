import React from 'react';
import { ActionButton } from '@/core/components/ActionButton';

interface Props {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'header';
}
