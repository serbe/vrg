import { EducationNearList } from '../../models/education';
import { PracticeNearList } from '../../models/practice';
import type { EducationShort, PracticeShort } from '../../models/types';
import { GetList } from '../../services/fetcher';
import './index.css';

export function Home(): JSX.Element {
  const [educations] = GetList('EducationNear') as [EducationShort[], string];
  const [practices] = GetList('PracticeNear') as [PracticeShort[], string];

  return (
    <div className="columns">
      <div className="column is-4">
        <EducationNearList list={educations} />
      </div>
      <div className="column is-4 is-offset-4">
        <PracticeNearList list={practices} />
      </div>
    </div>
  );
}

export default Home;
