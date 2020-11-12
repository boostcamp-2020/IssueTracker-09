const timePerSeconds = {
  month: 2592000,
  day: 86400,
  hour: 3600,
  minute: 60,
};

function calculateTime(targetTime) {
  const seconds = Math.floor((new Date() - new Date(targetTime)) / 1000);

  let interval = seconds / timePerSeconds.month;

  if (interval > 1) {
    return `${Math.floor(interval)} months`;
  }

  interval = seconds / timePerSeconds.day;
  if (interval > 1) {
    return `${Math.floor(interval)} days`;
  }

  interval = seconds / timePerSeconds.hour;
  if (interval > 1) {
    return `${Math.floor(interval)} hours`;
  }

  interval = seconds / timePerSeconds.minute;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes`;
  }

  return `${Math.floor(seconds)} seconds`;
}

export default calculateTime;
