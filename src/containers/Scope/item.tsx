import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ItemFormButtons, NoteInput } from '../../models/impersonal';
import { ScopeNameInput } from '../../models/scope';
import type { Scope } from '../../models/types';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';

export const ScopeItem = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState<string>();
  const [note, setNote] = useState<string>();
  const [item] = GetItem('Scope', id);
  const [status, setStatus] = useState(false);

  const send = (): void => {
    const NumberID = Number(id);
    const scope: Scope = {
      id: NumberID,
      name,
      note,
    };

    SetItem(NumberID, 'Scope', scope, setStatus);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Scope', setStatus);
  };

  useEffect(() => {
    if (item) {
      const data = item as Scope;
      setName(data.name);
      setNote(data.note);
    }
  }, [item]);

  useEffect(() => {
    if (status) {
      navigate(-1);
    }
  }, [navigate, status]);

  return (
    <div>
      {item && (
        <>
          <ScopeNameInput setter={setName} value={name} />
          <NoteInput setter={setNote} value={note} />

          <ItemFormButtons del={del} send={send} />
        </>
      )}
    </div>
  );
};
