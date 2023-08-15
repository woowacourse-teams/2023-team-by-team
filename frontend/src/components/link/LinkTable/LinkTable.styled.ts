import { styled, css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  width: 100%;
  height: 100%;
`;

export const MenuHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 70px;
  padding: 8px;
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: calc(100% - 70px);
  padding: 30px;

  background-color: ${({ theme }) => theme.color.WHITE};

  box-shadow: 0 10px 20px ${({ theme }) => theme.color.GRAY300};
`;

export const tableProperties = css`
  & > th,
  & td {
    display: table-cell;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: middle;

    height: 48px;
    padding: 8px;
  }

  & > tr {
    border-bottom: 2px solid ${({ theme }) => theme.color.GRAY200};
  }

  & > th:first-child(),
  & td:first-child() {
    width: 40%;
  }

  & > th:nth-child(2),
  & td:nth-child(2) {
    width: 20%;
  }
  & > th:nth-child(3),
  & td:nth-child(3) {
    width: 30%;
  }

  & > th:nth-child(4),
  & td:nth-child(4) {
    width: 10%;
  }

  & > tr :not(:first-child),
  & th {
    text-align: center;
  }

  font-size: 18px;

  table-layout: fixed;
`;

export const TableHeader = styled.table`
  width: calc(100% - 32px);
  height: 60px;

  ${tableProperties}
`;

export const TableBody = styled.div`
  overflow-y: auto;

  width: 100%;
  height: 100%;

  scrollbar-gutter: stable both-edges;
`;

export const Table = styled.table`
  width: 100%;

  ${tableProperties}

  & td > a {
    font-weight: 800;
    text-decoration: underline;
  }

  & td:nth-child(4) svg {
    width: 32px;
    height: 32px;
  }
`;

export const linkTableTitle = css`
  font-size: 28px;
`;

export const linkAddButton = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;
  padding: 4px;

  font-size: 24px;
`;

export const deleteButton = css`
  width: 32px;
  height: 32px;
  padding: 0;

  & svg {
    color: ${({ theme }) => theme.color.RED};
  }
`;
