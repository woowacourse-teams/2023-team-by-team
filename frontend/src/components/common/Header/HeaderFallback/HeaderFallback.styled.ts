import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 64px;
  padding: 0 14px;

  border-bottom: 2px solid ${({ theme }) => theme.color.GRAY200};
`;

export const InnerContainer = styled.div`
  display: flex;
  column-gap: 20px;

  & > div {
    display: flex;
    align-items: center;
    column-gap: 12px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0;
  }

  & > button:not(last-child) {
    width: 44px;
    height: 44px;
  }

  & > button:last-child {
    width: 50px;
    height: 50px;
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 24px;

  background-color: ${({ theme }) => theme.color.GRAY500};
`;

export const TeamBadgePlaceholder = styled.div`
  width: 24px;
  height: 24px;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.GRAY200};
`;

export const TeamPlaceMenuPlaceholder = styled.div`
  width: 300px;
  height: 40px;

  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.GRAY200};
`;

export const ProfileImagePlaceholder = styled.div`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.GRAY200};
`;
