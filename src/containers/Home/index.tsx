import './index.css';

import { useToken } from '~/services/auth';

import { EducationNearList, EducationShort } from '../../models/education';
import { PracticeNearList, PracticeShort } from '../../models/practice';
import { GetList } from '../../services/fetcher';

export const Home = () => {
  const { token } = useToken()
  const educations = GetList('EducationNear', token)
  const practices = GetList('PracticeNear', token)

  return (
    <div className="columns">
      <div className="column is-4">
        <EducationNearList list={educations as EducationShort[]} />
      </div>
      <div className="column is-4 is-offset-4">
        <PracticeNearList list={practices as PracticeShort[]} />
      </div>
    </div>
  )
}
