import { styled, css } from 'styled-components';
import type { LinkSize } from '~/types/size';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  width: 100%;
  height: 100%;
`;

export const MenuHeader = styled.header<{ $linkSize: LinkSize }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: ${({ $linkSize }) => ($linkSize === 'md' ? 70 : 30)}px;
  padding: 8px;
`;

export const TableContainer = styled.div<{
  $linkSize: LinkSize;
  $isMobile: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: calc(100% - ${({ $linkSize }) => ($linkSize === 'md' ? 70 : 30)}px);
  padding: ${({ $linkSize, $isMobile }) =>
    $linkSize === 'md' && !$isMobile ? 30 : 10}px;

  background-color: ${({ theme }) => theme.color.WHITE};

  box-shadow: 0 10px 20px ${({ theme }) => theme.color.GRAY300};
`;

export const TableWrapper = styled.div`
  overflow-y: auto;

  width: 100%;
  height: 100%;

  scrollbar-gutter: stable both-edges;
`;

export const Table = styled.table`
  width: 100%;

  font-size: 18px;

  table-layout: fixed;

  & td {
    display: table-cell;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: middle;

    height: 48px;
    padding: 8px;
  }

  & td:first-child(),
  thead > tr > th:first-child() {
    width: 40%;
  }

  & td:nth-child(2),
  thead > tr > th:nth-child(2) {
    width: 20%;
  }

  & td:nth-child(3),
  thead > tr > th:nth-child(3) {
    width: 30%;
  }

  & td:nth-child(4),
  thead > tr > th:nth-child(4) {
    width: 10%;
  }

  tbody > tr {
    border-bottom: 2px solid ${({ theme }) => theme.color.GRAY200};
  }

  & td > a {
    font-weight: 700;
    text-decoration: underline;
  }

  & td:nth-child(4) svg {
    width: 32px;
    height: 32px;
  }

  & > tr :not(:first-child),
  & th {
    text-align: center;
  }
`;

export const TableHeader = styled.thead`
  width: calc(100% - 32px);
  height: 48px;

  tr > th {
    vertical-align: middle;
    font-weight: 600;
  }
`;

export const linkTableTitle = (linkSize: LinkSize) => css`
  font-size: ${linkSize === 'md' ? 24 : 18}px;
`;

export const linkAddButton = (linkSize: LinkSize) => css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${linkSize === 'md' ? 30 : 24}px;
  height: ${linkSize === 'md' ? 30 : 24}px;
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
