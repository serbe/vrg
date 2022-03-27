import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DepartmentNameInput } from '../../models/department';
import { ItemFormButtons, NoteInput } from '../../models/impersonal';
import type { Department } from '../../models/types';
import { useToken } from '../../services/auth';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';
import { useStringU } from '../../services/hooks';

export function DepartmentItem(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName, nameInput] = useStringU();
  const [note, setNote, noteInput] = useStringU();
  const [item] = GetItem('Department', id);
  const [status, setStatus] = useState(false);
  const { token } = useToken();

  const send = (): void => {
    const NumberID = Number(id);
    const department: Department = {
      id: NumberID,
      name,
      note,
    };

    SetItem('Department', department, setStatus, token);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Department', setStatus, token);
  };

  useEffect(() => {
    if (item) {
      const data = item as Department;
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
          <DepartmentNameInput setter={nameInput} value={name} />
          <NoteInput setter={noteInput} value={note} />

          <ItemFormButtons del={del} send={send} />
        </>
      )}
    </div>
  );
}

export default DepartmentItem;
