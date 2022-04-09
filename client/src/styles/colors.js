// constants
export const RED = 'RED';
export const ORANGE = 'ORANGE';
export const YELLOW = 'YELLOW';
export const GREEN = 'GREEN';
export const BLUE = 'BLUE';
export const BLUE_GREEN = 'BLUE_GREEN';
export const PURPLE = 'PURPLE';
export const PINK = 'PINK';
export const WHITE = 'WHITE';
export const BLACK = 'BLACK';

// standard colors
const PURE_WHITE = '#FFFFFF';
const PURE_BLACK = '#000000';

// Neon
const NEON_RED = '#F72119';
const NEON_ORANGE = '#FF9E3D';
const NEON_YELLOW = '#FFFF00';
const NEON_GREEN = '#39FF14';
const NEON_BLUE = '#4D4DFF';
const NEON_BLUE_GREEN = '#00F2DE';
const NEON_PURPLE = '#B026FF';
const NEON_PINK = '#FF44CC';
const neon = {
  name: 'Neon',
  colors: {
    [RED]: NEON_RED,
    [ORANGE]: NEON_ORANGE,
    [YELLOW]: NEON_YELLOW,
    [GREEN]: NEON_GREEN,
    [BLUE_GREEN]: NEON_BLUE_GREEN,
    [BLUE]: NEON_BLUE,
    [PURPLE]: NEON_PURPLE,
    [PINK]: NEON_PINK,
    [WHITE]: PURE_WHITE,
    [BLACK]: PURE_BLACK
  }
}

// Basic
const BASIC_RED = '#FF0000';
const BASIC_ORANGE = '#FFA500';
const BASIC_YELLOW = '#FFFF00';
const BASIC_GREEN = '#00FF00';
const BASIC_BLUE = '#0000FF';
const BASIC_BLUE_GREEN = '#0D98BA';
const BASIC_PURPLE = '#6A0DAD';
const BASIC_PINK = '#FFC0CB';
const basic = {
  name: 'Basic',
  colors: {
    [RED]: BASIC_RED,
    [ORANGE]: BASIC_ORANGE,
    [YELLOW]: BASIC_YELLOW,
    [GREEN]: BASIC_GREEN,
    [BLUE_GREEN]: BASIC_BLUE_GREEN,
    [BLUE]: BASIC_BLUE,
    [PURPLE]: BASIC_PURPLE,
    [PINK]: BASIC_PINK,
    [WHITE]: PURE_WHITE,
    [BLACK]: PURE_BLACK
  }
}

export const COLOR_THEMES = [neon, basic];