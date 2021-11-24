import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ItemFormButtons, NoteInput } from '../../models/impersonal';
import { SirenTypeNameInput, SirenTypeRadiusInput } from '../../models/sirentype';
import type { SirenType } from '../../models/types';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';
import { useNumberU, useStringU } from '../../services/hooks';

export const SirenTypeItem = function (): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName, nameInput] = useStringU();
  const [radius, setRadius, radiusInput] = useNumberU();
  const [note, setNote, noteInput] = useStringU();
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
  }, [item, status, setRadius, setName, setNote]);

  useEffect(() => {
    if (status) {
      navigate(-1);
    }
  }, [navigate, status]);

  return (
    <div>
      {item && (
        <>
          <SirenTypeNameInput setter={nameInput} value={name} />
          <SirenTypeRadiusInput setter={radiusInput} value={radius} />
          <NoteInput setter={noteInput} value={note} />

          <ItemFormButtons del={del} send={send} />
        </>
      )}
    </div>
  );
};

export default SirenTypeItem;
