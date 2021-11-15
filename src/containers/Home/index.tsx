import { Box, Flex, Spacer } from '@chakra-ui/react';
import { EducationNearList } from '../../models/education';
import { PracticeNearList } from '../../models/practice';
import { EducationShort, PracticeShort } from '../../models/types';
import { GetList } from '../../services/fetcher';
import './index.css';

export const Home = () => {
  const [educations] = GetList('EducationNear') as [EducationShort[], string];
  const [practices] = GetList('PracticeNear') as [PracticeShort[], string];

  return (
    <Flex>
      <Box flex="1">
        <EducationNearList list={educations} />
      </Box>
      <Spacer />
      <Box flex="1">
        <PracticeNearList list={practices} />
      </Box>
    </Flex>
  );
};

export default Home;
