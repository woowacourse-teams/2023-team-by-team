import { useRef } from 'react';
import Modal from '~/components/common/Modal/Modal';
import Text from '~/components/common/Text/Text';
import { useFetchNotifications } from '~/hooks/queries/useFetchNotifications';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useModal } from '~/hooks/useModal';
import * as S from './NotificationListModal.styled';

const NotificationListModal = () => {
  const { closeModal } = useModal();
  const { teamPlaceId } = useTeamPlace();
  const { notificationPages, hasNextPage, fetchNextPage } =
    useFetchNotifications(teamPlaceId);
  const observeRef = useRef<HTMLDivElement>(null);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

  useIntersectionObserver(observeRef, onIntersect);

  return (
    <Modal>
      <S.Backdrop onClick={closeModal} />
      <S.Container>
        <Text as="span" size="lg" weight="semiBold">
          알림
        </Text>
        <S.NotificationList>
          {notificationPages?.pages.map((page) => {
            return page.threads.map((notification) => {
              const { id, content, createdAt } = notification;

              return (
                <S.NotificationItem key={id}>
                  <Text as="span" size="sm" css={S.createdAtText}>
                    {createdAt}
                  </Text>
                  <Text as="span" css={S.content}>
                    {content}
                  </Text>
                </S.NotificationItem>
              );
            });
          })}
          {!hasNextPage && (
            <Text
              as="span"
              size="sm"
              weight="semiBold"
              css={S.lastNotificationText}
            >
              알림을 모두 확인했습니다.
            </Text>
          )}
        </S.NotificationList>
      </S.Container>
      <div ref={observeRef} />
    </Modal>
  );
};

export default NotificationListModal;
