import Modal from '~/components/common/Modal/Modal';
import Text from '~/components/common/Text/Text';
import TeamExitModal from '~/components/team/TeamExitModal/TeamExitModal';
import { useModal } from '~/hooks/useModal';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useFetchTeamPlaceMembers } from '~/hooks/queries/useFetchTeamPlaceMembers';
import { useFetchTeamPlaceInviteCode } from '~/hooks/queries/useFetchTeamPlaceInviteCode';
import * as S from './TeamPlaceInfoModal.styled';
import { ModalProvider } from '~/components/common/Modal/ModalContext';
import Button from '~/components/common/Button/Button';
import { useToast } from '~/hooks/useToast';
import TeamBadge from '~/components/team/TeamBadge/TeamBadge';
import { ClipboardIcon } from '~/assets/svg';

const TeamPlaceInfoModal = () => {
  const { closeModal } = useModal();
  const { teamPlaceId, teamPlaceColor, displayName } = useTeamPlace();
  const { members } = useFetchTeamPlaceMembers(teamPlaceId);
  const { inviteCode } = useFetchTeamPlaceInviteCode(teamPlaceId);
  const { showToast } = useToast();

  const handleCopyButtonClick = () => {
    if (!inviteCode) {
      return;
    }

    try {
      navigator.clipboard.writeText(inviteCode);
      showToast('success', '초대 코드가 복사되었습니다.');
    } catch (error) {
      showToast('error', '초대 코드 복사에 실패했습니다.');
    }
  };

  return (
    <>
      <Modal>
        <S.Backdrop onClick={closeModal} />
        <S.Container>
          <S.TeamPlaceName>
            <TeamBadge teamPlaceColor={teamPlaceColor} size="md" />
            <Text as="span" size="lg" weight="semiBold" css={S.teamName}>
              {displayName}
            </Text>
          </S.TeamPlaceName>

          <S.Divider />

          <S.MemberDescription>
            <Text as="span" weight="semiBold">
              팀원 목록
            </Text>
            <Text as="span">총 {members?.length}명</Text>
          </S.MemberDescription>
          <S.MemberList>
            {members?.map((member) => {
              const { id, name, profileImageUrl } = member;

              return (
                <S.MemberListItem key={id}>
                  <S.ProfileImage src={profileImageUrl} alt={name} />
                  <Text as="span">{name}</Text>
                </S.MemberListItem>
              );
            })}
          </S.MemberList>

          <S.Divider />

          <Text as="span" weight="semiBold">
            초대 코드
          </Text>
          <S.InviteCodeContainer>
            <S.InviteCodeWrapper>
              <Text as="span" size="lg">
                {inviteCode}
              </Text>
            </S.InviteCodeWrapper>
            <Button
              type="button"
              variant="plain"
              css={S.copyButton}
              onClick={handleCopyButtonClick}
            >
              <ClipboardIcon />
            </Button>
          </S.InviteCodeContainer>

          <S.Divider />

          <ModalProvider>
            <TeamExitModal onClose={closeModal} />
          </ModalProvider>
        </S.Container>
      </Modal>
    </>
  );
};

export default TeamPlaceInfoModal;
