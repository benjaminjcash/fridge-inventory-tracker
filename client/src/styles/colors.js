// Constants
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

// Standard Colors
const PURE_WHITE = '#FFFFFF';
const PURE_BLACK = '#000000';

// Neon
const NEON_RED = '#F72119';
const NEON_ORANGE = '#FF9E3D';
const NEON_YELLOW = '#FFF01F';
const NEON_GREEN = '#1FFF0F';
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

// Pastel
const PASTEL_RED = '#D26466';
const PASTEL_ORANGE = '#FBBB62';
const PASTEL_YELLOW = '#F8F1AE';
const PASTEL_GREEN = '#BEE5B0';
const PASTEL_BLUE = '#C9D6E8';
const PASTEL_BLUE_GREEN = '#A5E3E0';
const PASTEL_PURPLE = '#9A7FAE';
const PASTEL_PINK = '#F0B6D5';
const pastel = {
  name: 'Pastel',
  colors: {
    [RED]: PASTEL_RED,
    [ORANGE]: PASTEL_ORANGE,
    [YELLOW]: PASTEL_YELLOW,
    [GREEN]: PASTEL_GREEN,
    [BLUE_GREEN]: PASTEL_BLUE_GREEN,
    [BLUE]: PASTEL_BLUE,
    [PURPLE]: PASTEL_PURPLE,
    [PINK]: PASTEL_PINK,
    [WHITE]: PURE_WHITE,
    [BLACK]: PURE_BLACK
  }
}

// Grey
const GREY_RED = '#7B797B';
const GREY_ORANGE = '#918E85';
const GREY_YELLOW = '#989692';
const GREY_GREEN = '#B2BEB5';
const GREY_BLUE = '#708090';
const GREY_BLUE_GREEN = '#BCC8C6';
const GREY_PURPLE = '#B1B6B7';
const GREY_PINK = '#CCCCC4';
const grey = {
  name: 'Grey',
  colors: {
    [RED]: GREY_RED,
    [ORANGE]: GREY_ORANGE,
    [YELLOW]: GREY_YELLOW,
    [GREEN]: GREY_GREEN,
    [BLUE_GREEN]: GREY_BLUE_GREEN,
    [BLUE]: GREY_BLUE,
    [PURPLE]: GREY_PURPLE,
    [PINK]: GREY_PINK,
    [WHITE]: PURE_WHITE,
    [BLACK]: PURE_BLACK
  }
}

export const COLOR_THEMES = [neon, pastel, grey];