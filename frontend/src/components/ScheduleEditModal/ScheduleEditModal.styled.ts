import { styled, css } from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;

  width: 496px;
  height: 386px;
  padding: 20px 30px;

  border-radius: 10px;
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
  background-color: ${({ theme }) => theme.color.WHITE};
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 38px;
  margin-bottom: 22px;

  border-bottom: ${({ theme }) => `1px solid ${theme.color.GRAY300}`};
`;

export const TitleWrapper = styled.div`
  width: 100%;
  height: 51px;
  margin-bottom: 28px;
`;

export const TimeSelectContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 40px;
  margin-bottom: 28px;

  column-gap: 10px;
`;

export const TeamNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  width: 100%;
  height: 23px;
`;

export const ControlButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 40px;
`;

/* TODO: 체크박스 공통 컴포넌트 구현 후 이 컴포넌트를 교체 */
export const CheckBox = styled.input`
  width: 25px;
  height: 25px;
`;

export const title = css`
  padding: 10px 20px;

  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.GRAY200};

  font-size: 24px;
`;

export const closeButton = css`
  width: 22px;
  height: 38px;
  padding: 8px 0;
`;

export const dateTimeLocalInput = css`
  margin-right: 30px;

  text-align: center;
`;

export const teamPlaceName = css`
  overflow: hidden;

  max-width: 250px;

  text-overflow: ellipsis;
  white-space: nowrap;
`;
