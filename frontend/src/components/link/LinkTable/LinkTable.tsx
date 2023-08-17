import * as S from './LinkTable.styled';
import Text from '~/components/common/Text/Text';
import Button from '~/components/common/Button/Button';
import LinkAddModal from '../LinkAddModal/LinkAddModal';
import EmptyLinkPlaceholder from '../EmptyLinkPlaceholder/EmptyLinkPlaceholder';
import { PlusIcon, DeleteIcon } from '~/assets/svg';
import { useFetchTeamLinks } from '~/hooks/queries/useFetchTeamLinks';
import { useDeleteTeamLink } from '~/hooks/queries/useDeleteTeamLink';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useModal } from '~/hooks/useModal';
import { useToast } from '~/hooks/useToast';
import { linkTableHeaderValues } from '~/constants/link';
import type { LinkSize } from '~/types/size';

interface LinkTableProps {
  linkSize?: LinkSize;
}

const LinkTable = (props: LinkTableProps) => {
  const { linkSize = 'md' } = props;

  const { openModal, isModalOpen } = useModal();
  const { teamPlaceId } = useTeamPlace();
  const teamLinks = useFetchTeamLinks(teamPlaceId);
  const { mutateDeleteTeamLink } = useDeleteTeamLink(teamPlaceId);
  const { showToast } = useToast();

  const handleDeleteTeamLink = (id: number, title: string) => {
    const slicedTitle = title.length > 30 ? `${title.slice(0, 30)}...` : title;
    const shouldDelete = confirm(`"${slicedTitle}" 링크를 제거하시겠습니까?`);

    if (!shouldDelete) {
      return;
    }

    mutateDeleteTeamLink(id, {
      onSuccess: () => {
        showToast('success', '링크를 삭제했습니다.');
      },
      onError: () => {
        showToast(
          'error',
          '링크를 삭제하는 데 실패했습니다. 잠시 후 다시 시도해 주세요.',
        );
      },
    });
  };

  return (
    <>
      <S.Container>
        <S.MenuHeader linkSize={linkSize}>
          <Text as="h2" css={S.linkTableTitle(linkSize)}>
            팀 링크
          </Text>
          <Button
            css={S.linkAddButton(linkSize)}
            aria-label="새로운 링크 등록하기"
            onClick={openModal}
          >
            <PlusIcon />
          </Button>
        </S.MenuHeader>
        <S.TableContainer linkSize={linkSize}>
          <S.TableHeader>
            {linkTableHeaderValues.map((value) => (
              <th key={value}>{value}</th>
            ))}
          </S.TableHeader>
          {teamLinks.length > 0 ? (
            <S.TableBody>
              <S.Table>
                {teamLinks.map(({ id, title, url, memberName, updatedAt }) => (
                  <tr key={id}>
                    <td>
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        title={title}
                      >
                        {title}
                      </a>
                    </td>
                    <td title={memberName}>{memberName}</td>
                    <td>
                      <time>{updatedAt}</time>
                    </td>
                    <td>
                      <Button
                        variant="plain"
                        css={S.deleteButton}
                        onClick={() => handleDeleteTeamLink(id, title)}
                        aria-label="링크 삭제하기"
                      >
                        <DeleteIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
              </S.Table>
            </S.TableBody>
          ) : (
            <EmptyLinkPlaceholder onClick={openModal} />
          )}
        </S.TableContainer>
      </S.Container>
      {isModalOpen && <LinkAddModal linkSize={linkSize} />}
    </>
  );
};

export default LinkTable;
