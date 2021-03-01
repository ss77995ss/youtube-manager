export const timeToSeconds = ({ hour, minute, second }) =>
  parseInt(hour, 10) * 3600 + parseInt(minute, 10) * 60 + parseInt(second, 10);

export const sortTimestampsByStartTime = (timestamps) =>
  timestamps.sort((a, b) => {
    if (timeToSeconds(a.startTime) === timeToSeconds(b.startTime)) {
      return timeToSeconds(a.endTime) - timeToSeconds(b.endTime);
    }
    return timeToSeconds(a.startTime) - timeToSeconds(b.startTime);
  });
