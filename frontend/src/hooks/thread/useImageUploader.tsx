import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import type { FileWithUuid, PreviewImage } from '~/types/feed';
import { MAX_UPLOAD_IMAGE_COUNT, VALID_IMAGE_TYPES } from '~/constants/feed';
import { useToast } from '../useToast';

/**
 * `useImageUploader` 는 이미지를 로컬에 업로드하여 관리하기 위한 커스텀 훅입니다.
 *
 * @returns {PreviewImage[]} previewImages - 미리보기 이미지의 `src`와 식별을 위한 `uuid`를 제공합니다.
 * @returns {File[]} imageFiles - 실제 업로드에 사용될 이미지 정보들을 `File` 객체로 된 배열로 제공합니다.
 * @returns {(e: ChangeEvent<HTMLInputElement>) => void} - updateImages 이미지 업로드 시 호출하는 함수입니다.
 * @returns {deleteImageByUuid} deleteImageByUuid - `uuid`를 이용해 특정 이미지를 삭제할 시 호출하는 함수입니다.
 * @returns {deleteAllImages} deleteAllImages - 모든 이미지를 삭제할 때 호출하는 함수입니다.
 */
const useImageUploader = () => {
  const [filesWithUuid, setFilesWithUuid] = useState<FileWithUuid[]>([]);
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);
  const { showToast } = useToast();

  const updateImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    const newFiles = e.target.files;

    if (!newFiles) {
      e.target.value = '';

      return;
    }

    if (filesWithUuid.length + newFiles.length > MAX_UPLOAD_IMAGE_COUNT) {
      e.target.value = '';
      showToast(
        'error',
        `이미지는 최대 ${MAX_UPLOAD_IMAGE_COUNT}장까지 업로드 가능합니다.`,
      );

      return;
    }

    if ([...newFiles].some(({ type }) => !VALID_IMAGE_TYPES.includes(type))) {
      e.target.value = '';
      showToast('error', '이미지 파일만 업로드할 수 있습니다.');

      return;
    }

    const newFilesWithId = [...newFiles].map((file) => ({
      uuid: crypto.randomUUID(),
      file,
    }));

    setFilesWithUuid((prevFilesWithUuid) => [
      ...prevFilesWithUuid,
      ...newFilesWithId,
    ]);

    e.target.value = '';
  };

  const readImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const resultUrl = fileReader.result;

        if (typeof resultUrl === 'string') {
          resolve(resultUrl);
        }

        reject();
      };

      fileReader.readAsDataURL(file);
    });
  };

  const updatePreviewImages = async () => {
    const uuids = filesWithUuid.map(({ uuid }) => uuid);
    const readResults = await Promise.allSettled(
      filesWithUuid.map(({ file }) => readImage(file)),
    );

    const imageUrls = readResults.map((result, index) => {
      if (result.status === 'fulfilled') {
        return { uuid: uuids[index], url: result.value };
      } else {
        return { uuid: uuids[index], url: '' };
      }
    });

    setPreviewImages(() => imageUrls);
  };

  const deleteImageByUuid = (targetUuid: string) => {
    setFilesWithUuid((prevFilesWithUuid) =>
      prevFilesWithUuid.filter(({ uuid }) => uuid !== targetUuid),
    );
  };

  const deleteAllImages = () => {
    setFilesWithUuid(() => []);
  };

  useEffect(() => {
    updatePreviewImages();
    /* eslint-disable-next-line */
  }, [filesWithUuid]);

  return {
    previewImages,
    imageFiles: filesWithUuid.map(({ file }) => file),
    updateImages,
    deleteImageByUuid,
    deleteAllImages,
  };
};

export default useImageUploader;
