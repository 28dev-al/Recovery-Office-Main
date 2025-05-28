import 'styled-components';
import { RecoveryTheme } from '../theme';

declare module 'styled-components' {
  export interface DefaultTheme extends RecoveryTheme {}
} 