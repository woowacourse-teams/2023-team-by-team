import * as S from './FileDriveDecoration.styled';
import { FolderOpenIcon } from '~/assets/svg';

const FileDriveDecoration = () => {
  return (
    <S.Container>
      <S.SampleBadge />
      <FolderOpenIcon />
      <S.WritingLinesContainer>
        <S.WritingLine width="46%" delay="0s" />
        <S.WritingLine width="60%" delay="0.3s" />
        <S.WritingLine width="52%" delay="0.6s" />
        <S.WritingLine width="0" delay="0" />
        <S.WritingLine width="60%" delay="0.9s" />
        <S.WritingLine width="72%" delay="1.2s" />
        <S.WritingLine width="66%" delay="1.5s" />
        <S.WritingLine width="38%" delay="1.8s" />
      </S.WritingLinesContainer>
    </S.Container>
  );
};

export default FileDriveDecoration;
