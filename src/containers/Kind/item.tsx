import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ItemFormButtons, NoteInput } from '../../models/impersonal';
import { KindNameInput, KindShortNameInput } from '../../models/kind';
import type { Kind } from '../../models/types';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';

export const KindItem = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState<string>();
  const [shortName, setShortName] = useState<string>();
  const [note, setNote] = useState<string>();
  const [item] = GetItem('Kind', id);
  const [status, setStatus] = useState(false);

  const send = (): void => {
    const NumberID = Number(id);
    const kind: Kind = {
      id: NumberID,
      name,
      short_name: shortName,
      note,
    };

    SetItem(NumberID, 'Kind', kind, setStatus);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Kind', setStatus);
  };

  useEffect(() => {
    if (item) {
      const data = item as Kind;
      setName(data.name);
      setShortName(data.short_name);
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
          <KindNameInput setter={setName} value={name} />
          <KindShortNameInput setter={setShortName} value={shortName} />
          <NoteInput setter={setNote} value={note} />

          <ItemFormButtons del={del} send={send} />
        </>
      )}
    </div>
  );
};
