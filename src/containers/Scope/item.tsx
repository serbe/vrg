import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { ItemFormButtons, NoteInput } from '../../models/impersonal'
import { ScopeNameInput } from '../../models/scope'
import { ParameterTypes, Scope } from '../../models/types'
import { DelItem, GetItem, SetItem } from '../../services/fetcher'

export const ScopeItem = () => {
  const history = useHistory()
  const { id } = useParams<ParameterTypes>()
  const [name, setName] = useState<string>()
  const [note, setNote] = useState<string>()
  const [item] = GetItem('Scope', id)
  const [status, setStatus] = useState(false)

  const send = (): void => {
    const NumberID = Number(id)
    const scope: Scope = {
      id: NumberID,
      name,
      note,
    }

    SetItem(NumberID, 'Scope', scope, setStatus)
  }

  const del = (): void => {
    const NumberID = Number(id)
    DelItem(NumberID, 'Scope', setStatus)
  }

  useEffect(() => {
    if (item) {
      const data = item as Scope
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
          <ScopeNameInput value={name} setter={setName} />
          <NoteInput value={note} setter={setNote} />

          <ItemFormButtons send={send} del={del} />
        </>
      )}
    </div>
  )
}

export default ScopeItem
