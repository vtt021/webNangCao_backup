export const formatDate = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

export const formatDateTime = date => {
    return date.toLocaleTimeString() + ', ' + formatDate(date);
  }