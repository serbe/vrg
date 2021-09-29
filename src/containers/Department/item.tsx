import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Department, DepartmentNameInput } from '../../models/department';
import { ItemFormButtons, NoteInput, ParameterTypes } from '../../models/impersonal';
import { useAuthState } from '../../services/auth';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';

export const DepartmentItem = (): JSX.Element => {
  const { auth } = useAuthState();
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [name, setName] = useState<string>();
  const [note, setNote] = useState<string>();
  const item = GetItem('Department', id);
  const [status, setStatus] = useState(false);

  const send = (): void => {
    const NumberID = Number(id);
    const department: Department = {
      id: NumberID,
      name,
      note,
    };

    SetItem(NumberID, 'Department', department, setStatus, auth.user.token);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Department', setStatus, auth.user.token);
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
      history.go(-1);
    }
  }, [history, status]);

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
