export const timeToSeconds = ({ hour, minute, second }) =>
  parseInt(hour, 10) * 3600 + parseInt(minute, 10) * 60 + parseInt(second, 10);
