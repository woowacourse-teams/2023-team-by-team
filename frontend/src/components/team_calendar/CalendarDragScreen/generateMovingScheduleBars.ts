const getCalendarGridDifference = (
  relativeX: number,
  relativeY: number,
  calendarWidth: number,
  calendarHeight: number,
) => {
  const rowDifference =
    relativeY > 0
      ? Math.floor((relativeY * 6) / calendarHeight)
      : Math.ceil((relativeY * 6) / calendarHeight);
  const columnDifference =
    relativeX > 0
      ? Math.floor((relativeX * 7) / calendarWidth)
      : Math.ceil((relativeX * 7) / calendarWidth);

  return { rowDifference, columnDifference };
};
