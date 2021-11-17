import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ItemFormButtons, NoteInput } from '../../models/impersonal';
import { RankNameInput } from '../../models/rank';
import type { Rank } from '../../models/types';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';

export const RankItem = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState<string>();
  const [note, setNote] = useState<string>();
  const [item] = GetItem('Rank', id);
  const [status, setStatus] = useState(false);

  const send = (): void => {
    const NumberID = Number(id);
    const rank: Rank = {
      id: NumberID,
      name,
      note,
    };

    SetItem(NumberID, 'Rank', rank, setStatus);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Rank', setStatus);
  };

  useEffect(() => {
    if (item) {
      const data = item as Rank;
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
          <RankNameInput setter={setName} value={name} />
          <NoteInput setter={setNote} value={note} />

          <ItemFormButtons del={del} send={send} />
        </>
      )}
    </div>
  );
};
