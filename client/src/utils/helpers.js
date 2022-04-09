import { RED, YELLOW, GREEN, WHITE } from '../styles/colors';

export const formatDate = (date) => {
  let dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US");
}

export const calculateBorderColor = (item) => {
  let borderColor = '';
  switch (item.expiration_health) {
    case "bad":
      borderColor = RED;
      break;
    case "close":
      borderColor = YELLOW;
      break;
    case "fine":
      borderColor = GREEN;
      break;
    case "fresh":
      borderColor = WHITE;
      break;
    default:
      borderColor = WHITE;
      break
  }
  return borderColor;
}