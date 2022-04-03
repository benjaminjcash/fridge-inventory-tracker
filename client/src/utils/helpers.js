export const formatDate = (date) => {
  let dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US");
}

export const calculateBorderColor = (item) => {
  let borderColor = '';
  switch (item.expiration_health) {
    case "bad":
      borderColor = 'red';
      break;
    case "close":
      borderColor = 'yellow';
      break;
    case "fine":
      borderColor = 'green';
      break;
    case "fresh":
      borderColor = 'white';
      break;
    default:
      borderColor = 'white';
      break
  }
  return borderColor;
}