import { ONE_DAY } from '~/constants/calendar';

const ROW_REGEX = /^[0-5]$/;
const COLUMN_REGEX = /^[0-6]$/;
const ERROR_MESSAGE =
  '잘못된 행 또는 열이 대입되었습니다. 입력 데이터가 아래의 조건을 지키는 지 확인해 주세요:\n- 행은 0 이상 5 이하의 정수여야 합니다.\n- 열은 0 이상 6 이하의 정수여야 합니다.';

export const getDateByPosition = (
  year: number,
  month: number,
  row: number,
  column: number,
) => {
  throwIfInvalidRowColumn(row, column);

  const firstDateOfMonth = new Date(year, month, 1);
  const desiredDate = new Date(
    firstDateOfMonth.getTime() +
      ONE_DAY * (row * 7 + column - firstDateOfMonth.getDay()),
  );

  return desiredDate;
};

const throwIfInvalidRowColumn = (row: number, column: number) => {
  if (
    !ROW_REGEX.test(row.toString()) ||
    !COLUMN_REGEX.test(column.toString())
  ) {
    throw Error(ERROR_MESSAGE);
  }
};
