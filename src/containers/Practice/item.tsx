import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CompanyIDSelect } from '../../models/company';
import { ItemFormButtons, NoteInput } from '../../models/impersonal';
import { KindIDSelect } from '../../models/kind';
import { PracticeDateInput, PracticeTopicInput } from '../../models/practice';
import type { Practice } from '../../models/types';
import { useToken } from '../../services/auth';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';
import { useStringU } from '../../services/hooks';

export const PracticeItem = function (): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [companyID, setCompanyID] = useState<number>();
  const [kindID, setKindID] = useState<number>();
  const [topic, setTopic, topicInput] = useStringU();
  const [date, setDate] = useState<string>();
  const [note, setNote, noteInput] = useStringU();
  const [item] = GetItem('Practice', id);
  const [status, setStatus] = useState(false);
  const { token } = useToken();

  const send = (): void => {
    const NumberID = Number(id);
    const practice: Practice = {
      id: NumberID,
      company_id: companyID,
      kind_id: kindID,
      topic,
      date_of_practice: date,
      note,
    };

    SetItem(NumberID, 'Practice', practice, setStatus, token);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Practice', setStatus, token);
  };

  useEffect(() => {
    if (item) {
      const data = item as Practice;
      setCompanyID(data.company_id);
      setKindID(data.kind_id);
      setTopic(data.topic);
      setDate(data.date_of_practice);
      setNote(data.note);
    }
  }, [item, setDate, setNote, setTopic]);

  useEffect(() => {
    if (status) {
      navigate(-1);
    }
  }, [navigate, status]);

  return (
    <div>
      {item && (
        <>
          <CompanyIDSelect id={companyID} setter={setCompanyID} />
          <KindIDSelect id={kindID} setter={setKindID} />
          <PracticeTopicInput setter={topicInput} value={topic} />
          <PracticeDateInput setter={setDate} value={date} />
          <NoteInput setter={noteInput} value={note} />

          <ItemFormButtons del={del} send={send} />
        </>
      )}
    </div>
  );
};

export default PracticeItem;
