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
  box-shadow: 0px 0px 30px 30px rgba(0, 0, 0, 0.03);
`;

export const ThreadHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

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

export const Divider = styled.div`
  color: ${({ theme }) => theme.color.GRAY500};
  padding: 0 5px;

  &::before {
    content: '|';
  }
`;

export const contentField = css`
  width: 100%;
  white-space: pre-wrap;
`;
