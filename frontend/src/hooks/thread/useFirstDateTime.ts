import { useState } from 'react';
import { splitDateTime } from '~/utils/splitDateTime';
import type { YYYYMMDDHHMM } from '~/types/schedule';

export const useFirstDateTime = () => {
  const [firstDateTime, setFirstDateTime] = useState<YYYYMMDDHHMM | undefined>(
    undefined,
  );

  const splittedFirstDateTime = firstDateTime
    ? splitDateTime(firstDateTime)
    : undefined;

  return {
    firstDate: splittedFirstDateTime?.date,
    firstTime: splittedFirstDateTime?.time,
    setFirstDateTime,
  };
};
