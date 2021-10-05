import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ItemFormButtons, NoteInput, ParameterTypes } from '../../models/impersonal';
import { Rank, RankNameInput } from '../../models/rank';
import { useToken } from '../../services/auth';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';

export const RankItem = () => {
  const { token } = useToken()
  const history = useHistory()
  const { id } = useParams<ParameterTypes>()
  const [name, setName] = useState<string>()
  const [note, setNote] = useState<string>()
  const item = GetItem('Rank', id, token)
  const [status, setStatus] = useState(false)

  const send = (): void => {
    const NumberID = Number(id)
    const rank: Rank = {
      id: NumberID,
      name,
      note,
    }

    SetItem(NumberID, 'Rank', rank, setStatus, token)
  }

  const del = (): void => {
    const NumberID = Number(id)
    DelItem(NumberID, 'Rank', setStatus, token)
  }

  useEffect(() => {
    if (item) {
      const data = item as Rank
      setName(data.name)
      setNote(data.note)
    }
  }, [item])

  useEffect(() => {
    if (status) {
      history.go(-1)
    }
  }, [history, status])

  return (
    <div>
      {item && (
        <>
          <RankNameInput value={name} setter={setName} />
          <NoteInput value={note} setter={setNote} />

          <ItemFormButtons send={send} del={del} />
        </>
      )}
    </div>
  )
}
