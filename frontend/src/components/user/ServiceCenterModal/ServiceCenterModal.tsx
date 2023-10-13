import Modal from '~/components/common/Modal/Modal';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import * as S from './ServiceCenterModal.styled';
import { useModal } from '~/hooks/useModal';
import { CloseIcon } from '~/assets/svg';
import Accordion from '~/components/common/Accordion/Accordion';
import { ICALENDAR_USER_GUIDE_URL } from '~/constants/calendar';

const ServiceCenterModal = () => {
  const { closeModal } = useModal();

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
            원하시는 내용 없다면 아래 메일로 문의주세요
            <ul>
              <li> teambyteam.official@gmail.com</li>
            </ul>
          </S.ExplainBox>
          <Accordion>
            <Accordion.Item>
              <Accordion.Header id={0} padding={'20px 18px'} disabled={true}>
                <a
                  href={'https://forms.gle/Tk8DZ5Xzsc5615Ar7'}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Text weight="semiBold">피드백 남기기</Text>
                </a>
              </Accordion.Header>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Item>
                <Accordion.Header id={1} padding={'20px 18px'} disabled={true}>
                  <a
                    href={
                      'https://teambyteam.notion.site/f84827ca26334913a1c724dfb9436887'
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Text weight="semiBold">팀바팀 사용방법</Text>
                  </a>
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
                    href={
                      'https://github.com/woowacourse-teams/2023-team-by-team'
                    }
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
                <Text weight="semiBold">자주 묻는 질문</Text>
              </Accordion.Header>
              <Accordion.Body id={3}>
                <S.AccountBodyContainer>
                  <div>
                    <Text size="sm" weight="semiBold">
                      Q. 외부 캘린더에서도 팀 일정을 보고 싶어요
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
