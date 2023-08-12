import * as S from './LinkTable.styled';
import Text from '~/components/common/Text/Text';
import Button from '~/components/common/Button/Button';
import { PlusIcon, DeleteIcon } from '~/assets/svg';
import { useFetchTeamLinks } from '~/hooks/queries/useFetchTeamLinks';
import { useTeamPlace } from '~/hooks/useTeamPlace';

const headerValues = ['링크명', '이름', '날짜', '삭제'];

const TeamLinkTable = () => {
  const { teamPlaceId } = useTeamPlace();
  const teamLinks = useFetchTeamLinks(teamPlaceId);

  return (
    <S.Container>
      <S.MenuHeader>
        <Text as="h2" css={S.linkTableTitle}>
          팀 링크
        </Text>
        <Button css={S.linkAddButton} aria-label="새로운 링크 등록하기">
          <PlusIcon />
        </Button>
      </S.MenuHeader>
      <S.TableContainer>
        <S.TableHeader>
          {headerValues.map((value) => (
            <th key={value}>{value}</th>
          ))}
        </S.TableHeader>
        <S.TableBody>
          <S.Table>
            {teamLinks.map(({ id, title, url, memberName, updatedAt }) => (
              <tr key={id}>
                <td>
                  <a href={url} target="_blank" rel="noreferrer" title={title}>
                    {title}
                  </a>
                </td>
                <td title={memberName}>{memberName}</td>
                <td>{updatedAt}</td>
                <td>
                  <Button variant="plain" css={S.deleteButton}>
                    <DeleteIcon />
                  </Button>
                </td>
              </tr>
            ))}
          </S.Table>
        </S.TableBody>
      </S.TableContainer>
    </S.Container>
  );
};

export default TeamLinkTable;
