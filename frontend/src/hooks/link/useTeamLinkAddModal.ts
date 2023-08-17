import {
  type ChangeEventHandler,
  type FormEventHandler,
  type RefObject,
  useState,
} from 'react';
import { useSendTeamLink } from '~/hooks/queries/useSendTeamLink';
import { useModal } from '~/hooks/useModal';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useToast } from '~/hooks/useToast';
import { generateHttpsUrl } from '~/utils/generateHttpsUrl';

const URL_REGEX =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;

export const useTeamLinkAddModal = (linkRef: RefObject<HTMLInputElement>) => {
  const { teamPlaceId } = useTeamPlace();
  const { closeModal } = useModal();
  const [linkName, setLinkName] = useState('');
  const [link, setLink] = useState('');
  const { showToast } = useToast();
  const { mutateSendTeamLink } = useSendTeamLink(teamPlaceId);

  const handleLinkNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;

    setLinkName(() => value);
  };

  const handleLinkChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;

    setLink(() => value);
  };

  const handleClose = () => {
    setLinkName(() => '');
    setLink(() => '');
    closeModal();
  };

  const handleTeamLinkSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!URL_REGEX.test(link)) {
      showToast('error', '올바르지 않은 링크 형식입니다.');
      linkRef.current?.focus();
      return;
    }

    mutateSendTeamLink(
      {
        title: linkName,
        url: generateHttpsUrl(link),
      },
      {
        onSuccess: () => {
          showToast('success', '링크가 등록되었습니다.');
          handleClose();
        },
      },
    );
  };

  return {
    linkName,
    link,

    handlers: {
      handleClose,
      handleTeamLinkSubmit,
      handleLinkNameChange,
      handleLinkChange,
    },
  };
};
