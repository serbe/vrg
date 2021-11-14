import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DepartmentNameInput } from '../../models/department';
import { ItemFormButtons, NoteInput } from '../../models/impersonal';
import { Department } from '../../models/types';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';

export const DepartmentItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState<string>();
  const [note, setNote] = useState<string>();
  const [item] = GetItem('Department', id);
  const [status, setStatus] = useState(false);

  const send = (): void => {
    const NumberID = Number(id);
    const department: Department = {
      id: NumberID,
      name,
      note,
    };

    SetItem(NumberID, 'Department', department, setStatus);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Department', setStatus);
  };

  useEffect(() => {
    if (item) {
      const data = item as Department;
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
          <DepartmentNameInput value={name} setter={setName} />
          <NoteInput value={note} setter={setNote} />

          <ItemFormButtons send={send} del={del} />
        </>
      )}
    </div>
  );
};

export default DepartmentItem;
