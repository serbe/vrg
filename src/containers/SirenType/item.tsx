import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ItemFormButtons, NoteInput } from '../../models/impersonal';
import { SirenTypeNameInput, SirenTypeRadiusInput } from '../../models/sirentype';
import type { SirenType } from '../../models/types';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';

export const SirenTypeItem = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState<string>();
  const [radius, setRadius] = useState<number>();
  const [note, setNote] = useState<string>();
  const [item] = GetItem('SirenType', id);
  const [status, setStatus] = useState(false);

  const send = (): void => {
    const NumberID = Number(id);
    const sirenType: SirenType = {
      id: NumberID,
      name,
      radius,
      note,
    };

    SetItem(NumberID, 'SirenType', sirenType, setStatus);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'SirenType', setStatus);
  };

  useEffect(() => {
    if (item) {
      const data = item as SirenType;
      setName(data.name);
      setRadius(data.radius);
      setNote(data.note);
    }
  }, [item, history, status]);

  useEffect(() => {
    if (status) {
      navigate(-1);
    }
  }, [navigate, status]);

  return (
    <div>
      {item && (
        <>
          <SirenTypeNameInput setter={setName} value={name} />
          <SirenTypeRadiusInput setter={setRadius} value={radius} />
          <NoteInput setter={setNote} value={note} />

          <ItemFormButtons del={del} send={send} />
        </>
      )}
    </div>
  );
};
