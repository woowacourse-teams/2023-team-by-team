import Modal from '~/components/common/Modal/Modal';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import * as S from './ServiceCenterModal.styled';
import { useModal } from '~/hooks/useModal';
import { CloseIcon } from '~/assets/svg';
import Accordion from '~/components/common/Accordion/Accordion';
import {
  ICALENDAR_USER_GUIDE_URL,
  TEAM_BY_TEAM_HOW_TO_USE_URL,
  TEAM_BY_TEAM_REPOSITORY,
  USER_FEEDBACK_URL,
} from '~/constants/url';

interface ServiceCenterModalProps {
  onAccountDeleteButtonClick: () => void;
}
const ServiceCenterModal = (props: ServiceCenterModalProps) => {
  const { closeModal } = useModal();
  const { onAccountDeleteButtonClick } = props;

  return (
    <Modal>
      <S.Backdrop onClick={closeModal} />
      <S.Container>
        <S.ModalHeader>
          <Text size="xl" weight="bold">
            고객문의
          </Text>
          <Button
            variant="plain"
            type="button"
            css={S.closeButton}
            onClick={closeModal}
            aria-label="고객문의 닫기"
          >
            <CloseIcon />
          </Button>
        </S.ModalHeader>
        <S.ModalBody>
          <Text size="lg" weight="semiBold">
            무엇을 도와드릴까요?
          </Text>
          <S.ExplainBox>
            원하시는 내용이 없다면 아래 메일로 문의주세요
            <a href="mailto:teambyteam.official@gmail.com?subject=팀바팀 문의합니다.&body=이메일(팀바팀 계정):%0D%0A문의분류(계정, 서비스, 버그, 기능추가, 기타):%0D%0A문의내용:%0D%0A">
              <Text weight="semiBold" size="sm" css={S.mailText}>
                teambyteam.official@gmail.com
              </Text>
            </a>
          </S.ExplainBox>
          <Accordion>
            <Accordion.Item>
              <Accordion.Header id={0} padding={'20px 18px'} disabled={true}>
                <S.UrlWrapper
                  href={USER_FEEDBACK_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Text weight="semiBold">피드백 남기기</Text>
                </S.UrlWrapper>
              </Accordion.Header>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Item>
                <Accordion.Header id={1} padding={'20px 18px'} disabled={true}>
                  <S.UrlWrapper
                    href={TEAM_BY_TEAM_HOW_TO_USE_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Text weight="semiBold">팀바팀 사용방법</Text>
                  </S.UrlWrapper>
                </Accordion.Header>
              </Accordion.Item>
              <Accordion.Item></Accordion.Item>
              <Accordion.Header id={2} padding={'10px 18px'}>
                <Text weight="semiBold">팀바팀 소개</Text>
              </Accordion.Header>
              <Accordion.Body id={2}>
                <S.AccountBodyContainer>
                  <Text size="sm">
                    &apos;팀바팀&apos;은 ✨쉽고 간단한 협업을 위한 서비스✨로
                    여러 협업을 진행할 때 복잡한 도구를 사용할 필요없이 여러가지
                    기능을 사용할 수 있습니다.
                  </Text>

                  <a
                    href={TEAM_BY_TEAM_REPOSITORY}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Text size="sm" weight="semiBold">
                      팀바팀 Repository 이동하기
                    </Text>
                  </a>
                </S.AccountBodyContainer>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Header id={3} padding={'10px 18px'}>
                <Text weight="semiBold">Q&A</Text>
              </Accordion.Header>
              <Accordion.Body id={3}>
                <S.AccountBodyContainer>
                  <div>
                    <Text size="sm" weight="semiBold">
                      Q. 외부 캘린더(구글 캘린더, iOS 캘린더 앱)에서도 팀 일정을
                      보고 싶어요.
                    </Text>
                    <Text size="sm">아래 설명서를 참고해주세요.</Text>
                    <a
                      href={ICALENDAR_USER_GUIDE_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Text as="span" size="sm">
                        📘 일정 파일(.ics) 사용법
                      </Text>
                    </a>
                  </div>
                  <div>
                    <Text size="sm" weight="semiBold">
                      Q. 탈퇴는 어떻게 하나요?
                    </Text>
                    <S.ContentContainer>
                      <Text size="sm" as="span">
                        회원 탈퇴를 진행하시려면 옆 버튼을 눌러주세요.
                      </Text>
                      <Button
                        type="button"
                        variant="plain"
                        css={S.dangerousButton}
                        onClick={onAccountDeleteButtonClick}
                        aria-label="회원탈퇴하기"
                      >
                        <Text size="sm" css={S.dangerousText}>
                          회원 탈퇴
                        </Text>
                      </Button>
                    </S.ContentContainer>
                  </div>
                </S.AccountBodyContainer>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </S.ModalBody>
      </S.Container>
    </Modal>
  );
};

export default ServiceCenterModal;
