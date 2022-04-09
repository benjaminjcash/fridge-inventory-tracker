import { RED, YELLOW, GREEN, WHITE } from '../styles/colors';

export const formatDate = (date) => {
  let dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US");
}

export const calculateBorderColor = (item, theme) => {
  let borderColor = '';
  switch (item.expiration_health) {
    case "bad":
      borderColor = theme[RED];
      break;
    case "close":
      borderColor = theme[YELLOW];
      break;
    case "fine":
      borderColor = theme[GREEN];
      break;
    case "fresh":
      borderColor = theme[WHITE];
      break;
    default:
      borderColor = theme[WHITE];
      break
  }
  return borderColor;
}