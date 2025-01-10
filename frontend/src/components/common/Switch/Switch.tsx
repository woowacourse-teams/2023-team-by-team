import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type CSSProperties,
  type ReactNode,
} from 'react';

import * as S from './Switch.styled';
import type { SwitchSize } from '~/types/size';

export interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  size?: SwitchSize;
  variant?: 'solid' | 'raised';
  style?: CSSProperties;
  description?: ReactNode;
  descriptionPosition?: 'top' | 'bottom' | 'left' | 'right';
  onLabel?: string | ReactNode;
  offLabel?: string | ReactNode;
  onThumb?: string | ReactNode;
  offThumb?: string | ReactNode;
  readonly?: boolean;
  disabled?: boolean;
  onColor?: string;
  offColor?: string;
  onLabelColor?: string;
  offLabelColor?: string;
  thumbOnColor?: string;
  thumbOffColor?: string;
}

/**
 * Switch 컴포넌트
 *
 * @param {boolean} checked - 스위치의 현재 상태를 나타냅니다. true이면 켜짐, false이면 꺼짐.
 * @param {function} onChange - 스위치 상태가 변경될 때 호출되는 콜백 함수.
 * @param {"xs" | "sm" | "md" | "lg"} [size="md"] - 스위치의 크기를 설정합니다.
 * @param {"solid" | "raised"} [variant="solid"] - 스위치의 스타일 유형을 설정합니다. `solid`: 트랙 안에 thumb이 들어 있는 유형. `raised`: 트랙보다 thumb이 큰 유형.
 * @param {CSSProperties} [style] - 추가 스타일을 적용할 수 있는 인라인 스타일 객체입니다.
 * @param {ReactNode} [description] - 스위치에 대한 설명이 되는 컴포넌트입니다.
 * @param {"top" | "bottom" | "left" | "right"} [descriptionPosition="right"] - 설명의 위치를 설정합니다. `top`: 위쪽, `bottom`: 아래쪽, `left`: 왼쪽, `right`: 오른쪽.
 * @param {string | ReactNode} [onLabel] - 스위치가 켜져 있을 때 트랙 라벨에 들어갈 텍스트 또는 아이콘.
 * @param {string | ReactNode} [offLabel] - 스위치가 꺼져 있을 때 트랙 라벨에 들어갈 텍스트 또는 아이콘.
 * @param {string | ReactNode} [onThumb] - 스위치가 켜져 있을 때 thumb 안에 들어갈 텍스트 또는 아이콘.
 * @param {string | ReactNode} [offThumb] - 스위치가 꺼져 있을 때 thumb 안에 들어갈 텍스트 또는 아이콘.
 * @param {boolean} [readonly=false] - 스위치를 읽기 전용으로 설정합니다.
 * @param {boolean} [disabled=false] - 스위치를 비활성화 상태로 설정합니다.
 * @param {string} [onColor] - 스위치가 켜져 있을 때의 트랙 색상을 설정합니다.
 * @param {string} [offColor] - 스위치가 꺼져 있을 때의 트랙 색상을 설정합니다.
 * @param {string} [onLabelColor] - 스위치가 켜져 있을 때의 라벨 색상을 설정합니다.
 * @param {string} [offLabelColor] - 스위치가 꺼져 있을 때의 라벨 색상을 설정합니다.
 * @param {string} [thumbOnColor] - 스위치가 켜져 있을 때 thumb의 색상을 설정합니다.
 * @param {string} [thumbOffColor] - 스위치가 꺼져 있을 때 thumb의 색상을 설정합니다.
 */
const Switch = ({
  checked,
  onChange,
  size = 'md',
  variant = 'solid',
  style,
  description,
  descriptionPosition = 'right',
  onLabel,
  offLabel,
  onThumb,
  offThumb,
  readonly = false,
  disabled = false,
  onColor,
  offColor,
  onLabelColor,
  offLabelColor,
  thumbOnColor,
  thumbOffColor,
}: SwitchProps) => {
  const [isOn, setIsOn] = useState(checked);
  const throttleTimeout = useRef<number | null>(null);

  const throttledOnChange = useCallback(() => {
    if (throttleTimeout.current === null) {
      onChange();
      throttleTimeout.current = window.setTimeout(() => {
        throttleTimeout.current = null;
      }, 500);
    }
  }, [onChange]);

  const handleClickToggle = () => {
    if (!readonly && !disabled) {
      setIsOn((prevState) => !prevState);
      onChange();
      // throttledOnChange();
    }
  };

  useEffect(() => {
    if (checked !== isOn) {
      setIsOn(checked);
    }
  }, [checked, isOn]);

  // useEffect(() => {
  //   return () => {
  //     if (throttleTimeout.current !== null) {
  //       clearTimeout(throttleTimeout.current);
  //     }
  //   };
  // }, []);

  return (
    <S.ContainerDiv $descriptionPosition={descriptionPosition} style={style}>
      {description &&
        ['top', 'left'].includes(descriptionPosition) &&
        description}

      <S.Label $size={size}>
        <S.ToggleInput
          type="checkbox"
          checked={isOn}
          onChange={handleClickToggle}
          readOnly={readonly}
          disabled={disabled}
        />
        <S.TrackDiv
          $variant={variant}
          $isOn={isOn}
          $offColor={offColor}
          $onColor={onColor}
        >
          <S.LabelSpan
            $size={size}
            $isOn={isOn}
            $onColor={onLabelColor}
            $offColor={offLabelColor}
          >
            {isOn ? onLabel : offLabel}
          </S.LabelSpan>
          <S.ThumbSpan
            $variant={variant}
            $size={size}
            $isOn={isOn}
            $offColor={thumbOffColor}
            $onColor={thumbOnColor}
          >
            {isOn ? onThumb : offThumb}
          </S.ThumbSpan>
        </S.TrackDiv>
      </S.Label>

      {description &&
        ['bottom', 'right'].includes(descriptionPosition) &&
        description}
    </S.ContainerDiv>
  );
};

export default Switch;
