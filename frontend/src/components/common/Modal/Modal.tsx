import { createPortal } from 'react-dom';
import { useModal } from '~/components/common/Modal/useModal';
import { useKeydownEffect } from '~/hooks/useKeydownEffect';
import type { PropsWithChildren } from 'react';

const Modal = (props: PropsWithChildren) => {
  const { children } = props;
  const { isModalOpen, closeModal } = useModal();
  useKeydownEffect('Escape', closeModal);

  return (
    <>
      {isModalOpen &&
        createPortal(
          <div role="dialog" aria-modal>
            {children}
          </div>,
          document.body,
        )}
    </>
  );
};

export default Modal;
