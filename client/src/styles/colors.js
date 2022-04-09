const BASIC_RED = '';
const BASIC_ORANGE = '';
const BASIC_YELLOW = '';
const BASIC_GREEN = '';
const BASIC_BLUE = '';
const BASIC_BLUE_GREEN = '';
const BASIC_PURPLE = '';
const BASIC_PINK = '';

const basic = {
  red: BASIC_RED,
  orange: BASIC_ORANGE,
  yellow: BASIC_YELLOW,
  green: BASIC_GREEN,
  blueGreen: BASIC_BLUE_GREEN,
  blue: BASIC_BLUE,
  purple: BASIC_PURPLE,
  pink: BASIC_PINK
}

const NEON_RED = '#F72119';
const NEON_ORANGE = '#FF9E3D';
const NEON_YELLOW = '#FFFF00';
const NEON_GREEN = '#39FF14';
const NEON_BLUE = '#4D4DFF';
const NEON_BLUE_GREEN = '#00F2DE';
const NEON_PURPLE = '#B026FF';
const NEON_PINK = '#FF44CC';

const neon = {
  red: NEON_RED,
  orange: NEON_ORANGE,
  yellow: NEON_YELLOW,
  green: NEON_GREEN,
  blueGreen: NEON_BLUE_GREEN,
  blue: NEON_BLUE,
  purple: NEON_PURPLE,
  pink: NEON_PINK
}

let currentTheme = neon;

export const RED = currentTheme.red;
export const ORANGE = currentTheme.orange;
export const YELLOW = currentTheme.yellow;
export const GREEN = currentTheme.green;
export const BLUE = currentTheme.blue;
export const BLUE_GREEN = currentTheme.blueGreen;
export const PURPLE = currentTheme.purple;
export const PINK = currentTheme.pink;

export const WHITE = '#FFFFFF';
export const BLACK = '#000000';