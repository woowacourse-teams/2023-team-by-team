export const parseAmPmTime = (time: string) => {
  const [amPm, timeWithoutAmPm] = time.split(' ');
  const [hour, minute] = timeWithoutAmPm.split(':');

  if (amPm === '오전') {
    const parsedHour = String(Number(hour) % 12).padStart(2, '0');
    return `${parsedHour}:${minute}`;
  }

  const parsedHour = String((Number(hour) % 12) + 12).padStart(2, '0');

  return `${parsedHour}:${minute}`;
};
