import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ItemFormButtons, NoteInput } from '../../models/impersonal';
import { ScopeNameInput } from '../../models/scope';
import type { Scope } from '../../models/types';
import { useToken } from '../../services/auth';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';
import { useStringU } from '../../services/hooks';

export const ScopeItem = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName, nameInput] = useStringU();
  const [note, setNote, noteInput] = useStringU();
  const [item] = GetItem('Scope', id);
  const [status, setStatus] = useState(false);
  const { token } = useToken();

  const send = (): void => {
    const NumberID = Number(id);
    const scope: Scope = {
      id: NumberID,
      name,
      note,
    };

    SetItem('Scope', scope, setStatus, token);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Scope', setStatus, token);
  };

  useEffect(() => {
    if (item) {
      const data = item as Scope;
      setName(data.name);
      setNote(data.note);
    }
  }, [item, setName, setNote]);

  useEffect(() => {
    if (status) {
      navigate(-1);
    }
  }, [navigate, status]);

  return (
    <div>
      {item && (
        <>
          <ScopeNameInput setter={nameInput} value={name} />
          <NoteInput setter={noteInput} value={note} />

          <ItemFormButtons del={del} send={send} />
        </>
      )}
    </div>
  );
};

export default ScopeItem;
