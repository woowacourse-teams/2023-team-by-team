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

const TeamPlaceInfoModal = () => {
  const { closeModal } = useModal();
  const { teamPlaceId } = useTeamPlace();
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
          <S.TitleContainer>
            <Text as="span" weight="semiBold">
              팀원 목록
            </Text>
            <Text as="span">총 {members?.length}명</Text>
          </S.TitleContainer>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="M166 152a6 6 0 0 1-6 6H96a6 6 0 0 1 0-12h64a6 6 0 0 1 6 6Zm-6-38H96a6 6 0 0 0 0 12h64a6 6 0 0 0 0-12Zm54-66v168a14 14 0 0 1-14 14H56a14 14 0 0 1-14-14V48a14 14 0 0 1 14-14h37.17a45.91 45.91 0 0 1 69.66 0H200a14 14 0 0 1 14 14ZM94 64v2h68v-2a34 34 0 0 0-68 0Zm108-16a2 2 0 0 0-2-2h-29.67A45.77 45.77 0 0 1 174 64v8a6 6 0 0 1-6 6H88a6 6 0 0 1-6-6v-8a45.77 45.77 0 0 1 3.67-18H56a2 2 0 0 0-2 2v168a2 2 0 0 0 2 2h144a2 2 0 0 0 2-2Z"
                />
              </svg>
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
