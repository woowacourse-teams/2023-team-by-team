import { css, styled } from 'styled-components';

export const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;

  width: 280px;
  height: 320px;
  gap: 10px;
`;

export const noticeText = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 200px;
`;