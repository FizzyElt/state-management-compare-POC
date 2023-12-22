import { Box, AbsoluteCenter, Spinner, Heading } from '@chakra-ui/react';
import { useFormDataContext } from './context';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSetAtom, useAtomValue } from 'jotai';
import FormOne, { FormOneData } from '../../components/form-one';
import FormTwo from '../../components/form-two';

import { getUserLevel } from '../../api';
import { pipe } from 'fp-ts/function';

export const StepOne = () => {
  const { formOneAtom } = useFormDataContext();
  const setFormData = useSetAtom(formOneAtom);
  const [isValidating, setValidating] = useState(false);
  const navigate = useNavigate();

  const handleClick = (data: FormOneData) => {
    setValidating(true);
    getUserLevel(data.name)
      .then((level) => {
        if (level < 3) {
          setFormData(data);
          navigate('../step2');
          return;
        }
        navigate('../fail');
      })
      .then(() => setValidating(false));
  };

  return (
    <Box h="500px">
      <AbsoluteCenter>
        {isValidating ? <Spinner /> : <FormOne onSubmit={handleClick} />}
      </AbsoluteCenter>
    </Box>
  );
};

export const StepTwo = () => {
  const { formOneAtom, formTwoAtom } = useFormDataContext();
  const formOneData = useAtomValue(formOneAtom);
  const setFormData = useSetAtom(formTwoAtom);
  const navigate = useNavigate();

  if (!formOneData) {
    return <Navigate to="../step1" replace />;
  }

  return (
    <Box h="500px">
      <AbsoluteCenter>
        <FormTwo onSubmit={(data) => pipe(data, setFormData, () => navigate('../step3'))} />
      </AbsoluteCenter>
    </Box>
  );
};

export const StepThree = () => {
  const { formOneAtom, formTwoAtom } = useFormDataContext();
  const formOneData = useAtomValue(formOneAtom);
  const formTwoData = useAtomValue(formTwoAtom);

  if (!formOneData || !formTwoData) {
    return <Navigate to="../step1" replace />;
  }

  return (
    <Box h="500px">
      <AbsoluteCenter>
        <Heading>finished</Heading>
      </AbsoluteCenter>
    </Box>
  );
};

export const Fail = () => {
  return (
    <Box h="500px">
      <AbsoluteCenter>
        <Heading>fail</Heading>
      </AbsoluteCenter>
    </Box>
  );
};
