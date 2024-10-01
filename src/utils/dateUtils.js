
exports.DateTime = async () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const dateTime = `${formattedDate} ${formattedTime}`;
  return dateTime;
};


