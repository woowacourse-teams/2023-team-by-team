import { css, styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  width: 100%;
  height: auto;
  padding: 30px 50px;

  border-radius: 40px;
  background: ${({ theme }) => theme.color.WHITE};

  box-shadow: 0 0 8px ${({ theme }) => theme.color.GRAY300};
`;

export const ThreadHeader = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;

  height: 36px;
`;

export const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;

  border-radius: 12px;

  object-fit: cover;
`;

export const Divider = styled.span`
  display: inline-block;

  width: 1.5px;
  height: 20px;
  margin: 0 4px;

  background-color: ${({ theme }) => theme.color.GRAY400};
`;

export const contentField = css`
  width: 100%;
  white-space: pre-wrap;
`;
