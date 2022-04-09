const PURE_WHITE = '#FFFFFF';
const PURE_BLACK = '#000000';

const BASIC_RED = '#FF0000';
const BASIC_ORANGE = '#FFA500';
const BASIC_YELLOW = '#FFFF00';
const BASIC_GREEN = '#00FF00';
const BASIC_BLUE = '#0000FF';
const BASIC_BLUE_GREEN = '#0D98BA';
const BASIC_PURPLE = '#6A0DAD';
const BASIC_PINK = '#FFC0CB';

const NEON_RED = '#F72119';
const NEON_ORANGE = '#FF9E3D';
const NEON_YELLOW = '#FFFF00';
const NEON_GREEN = '#39FF14';
const NEON_BLUE = '#4D4DFF';
const NEON_BLUE_GREEN = '#00F2DE';
const NEON_PURPLE = '#B026FF';
const NEON_PINK = '#FF44CC';

const basic = {
  name: 'Basic',
  colors: {
    red: BASIC_RED,
    orange: BASIC_ORANGE,
    yellow: BASIC_YELLOW,
    green: BASIC_GREEN,
    blueGreen: BASIC_BLUE_GREEN,
    blue: BASIC_BLUE,
    purple: BASIC_PURPLE,
    pink: BASIC_PINK,
    white: PURE_WHITE,
    black: PURE_BLACK
  }
}

const neon = {
  name: 'Neon',
  colors: {
    red: NEON_RED,
    orange: NEON_ORANGE,
    yellow: NEON_YELLOW,
    green: NEON_GREEN,
    blueGreen: NEON_BLUE_GREEN,
    blue: NEON_BLUE,
    purple: NEON_PURPLE,
    pink: NEON_PINK,
    white: PURE_WHITE,
    black: PURE_BLACK
  }
}

export const NEON = neon;
export const BASIC = basic;
export const COLOR_THEMES = [basic, neon];

let currentTheme = neon;
export const RED = currentTheme.colors.red;
export const ORANGE = currentTheme.colors.orange;
export const YELLOW = currentTheme.colors.yellow;
export const GREEN = currentTheme.colors.green;
export const BLUE = currentTheme.colors.blue;
export const BLUE_GREEN = currentTheme.colors.blueGreen;
export const PURPLE = currentTheme.colors.purple;
export const PINK = currentTheme.colors.pink;
export const WHITE = '#FFFFFF';
export const BLACK = '#000000';