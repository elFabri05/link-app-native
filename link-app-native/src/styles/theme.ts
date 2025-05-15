import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Device dimensions
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

// Colors
export const COLORS = {
  primary: '#633CFF',
  primaryLight: '#EFEBFF',
  primaryDark: '#4019e0',
  white: '#FFFFFF',
  black: '#333333',
  gray: '#737373',
  lightGray: '#D9D9D9',
  background: '#FAFAFA',
  error: '#FF3939',
  success: '#2CAE66',
  warning: '#FFB800',
};

// Typography - Use system fonts instead of custom fonts for simplicity
export const FONTS = {
  regular: Platform.OS === 'ios' ? 'System' : 'Roboto',
  medium: Platform.OS === 'ios' ? 'System' : 'Roboto',
  bold: Platform.OS === 'ios' ? 'System' : 'Roboto',
};

// Font sizes
export const FONT_SIZES = {
  xs: 10,
  small: 12,
  label: 12,
  body: 16,
  subheading: 18,
  heading: 24,
  large: 28,
};

// Font weights
export const FONT_WEIGHTS = {
  regular: '400',
  medium: '500',
  bold: '700',
};

// Spacing
export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

// Border radius
export const BORDER_RADIUS = {
  s: 5,
  m: 8,
  l: 12,
  round: 999, // For circular elements
};

// Heights
export const INPUT_HEIGHT = 48;
export const BUTTON_HEIGHT = 46;

// Form widths
export const FORM_WIDTH = SCREEN_WIDTH - 2 * SPACING.xl;

// Responsive design
export const isSmallDevice = SCREEN_WIDTH < 375;
export const isTablet = SCREEN_WIDTH >= 768;
export const isDesktop = SCREEN_WIDTH >= 1024;

// Shadow styles for ios and android
export const SHADOWS = {
  small: Platform.select({
    ios: {
      shadowColor: COLORS.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }),
  medium: Platform.select({
    ios: {
      shadowColor: COLORS.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 5,
    },
    default: {},
  }),
  large: Platform.select({
    ios: {
      shadowColor: COLORS.black,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
    },
    android: {
      elevation: 8,
    },
    default: {},
  }),
};

// Common text styles
export const TEXT_STYLES = {
  heading: {
    fontSize: FONT_SIZES.heading,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.black,
  },
  subheading: {
    fontSize: FONT_SIZES.subheading,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.black,
  },
  body: {
    fontSize: FONT_SIZES.body,
    fontWeight: FONT_WEIGHTS.regular,
    color: COLORS.black,
  },
  label: {
    fontSize: FONT_SIZES.label,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.black,
  },
  error: {
    fontSize: FONT_SIZES.label,
    fontWeight: FONT_WEIGHTS.regular,
    color: COLORS.error,
  },
};

// Common button styles
export const BUTTON_STYLES = {
  primary: {
    backgroundColor: COLORS.primary,
    height: BUTTON_HEIGHT,
    borderRadius: BORDER_RADIUS.m,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: COLORS.white,
    height: BUTTON_HEIGHT,
    borderRadius: BORDER_RADIUS.m,
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.bold,
  },
};

// Input styles
export const INPUT_STYLES = {
  container: {
    height: INPUT_HEIGHT,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: BORDER_RADIUS.s,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
  },
  text: {
    flex: 1,
    color: COLORS.black,
    fontSize: FONT_SIZES.body,
  },
};