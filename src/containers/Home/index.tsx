import './index.css'

import { EducationNearList } from '../../models/education'
import { PracticeNearList } from '../../models/practice'
import { EducationShort, PracticeShort } from '../../models/types'
import { GetList } from '../../services/fetcher'

export const Home = () => {
  const [educations] = GetList('EducationNear') as [EducationShort[], string]
  const [practices] = GetList('PracticeNear') as [PracticeShort[], string]

  return (
    <div className="columns">
      <div className="column is-4">
        <EducationNearList list={educations} />
      </div>
      <div className="column is-4 is-offset-4">
        <PracticeNearList list={practices} />
      </div>
    </div>
  )
}

export default Home
