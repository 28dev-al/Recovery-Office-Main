import 'styled-components';
import { RecoveryOfficeTheme } from './theme.types';

declare module 'styled-components' {
  export interface DefaultTheme extends RecoveryOfficeTheme {}
} 