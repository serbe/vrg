import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ItemFormButtons, NoteInput } from '../../models/impersonal';
import { KindNameInput, KindShortNameInput } from '../../models/kind';
import type { Kind } from '../../models/types';
import { useToken } from '../../services/auth';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';
import { useStringU } from '../../services/hooks';

export const KindItem = function (): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName, nameInput] = useStringU();
  const [shortName, setShortName, shortNameInput] = useStringU();
  const [note, setNote, noteInput] = useStringU();
  const [item] = GetItem('Kind', id);
  const [status, setStatus] = useState(false);
  const { token } = useToken();

  const send = (): void => {
    const NumberID = Number(id);
    const kind: Kind = {
      id: NumberID,
      name,
      short_name: shortName,
      note,
    };

    SetItem(NumberID, 'Kind', kind, setStatus, token);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Kind', setStatus, token);
  };

  useEffect(() => {
    if (item) {
      const data = item as Kind;
      setName(data.name);
      setShortName(data.short_name);
      setNote(data.note);
    }
  }, [item, setName, setNote, setShortName]);

  useEffect(() => {
    if (status) {
      navigate(-1);
    }
  }, [navigate, status]);

  return (
    <div>
      {item && (
        <>
          <KindNameInput setter={nameInput} value={name} />
          <KindShortNameInput setter={shortNameInput} value={shortName} />
          <NoteInput setter={noteInput} value={note} />

          <ItemFormButtons del={del} send={send} />
        </>
      )}
    </div>
  );
};

export default KindItem;
