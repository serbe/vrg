import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EducationEndDateInput, EducationNameSelect, EducationStartDateInput } from '../../models/education';
import { ItemFormButtons, NoteInput } from '../../models/impersonal';
import { PostGoIDSelect } from '../../models/post';
import type { Education } from '../../models/types';
import { useToken } from '../../services/auth';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';
import { useStringU } from '../../services/hooks';

export const EducationItem = function (): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contactID, setContactID] = useState<number>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [postID, setPostID] = useState<number>();
  const [note, setNote, noteInput] = useStringU();
  const [item] = GetItem('Education', id);
  const [status, setStatus] = useState(false);
  const { token } = useToken();

  const send = (): void => {
    const NumberID = Number(id);
    const education: Education = {
      id: NumberID,
      contact_id: contactID,
      start_date: startDate,
      end_date: endDate,
      post_id: postID,
      note,
    };

    SetItem(NumberID, 'Education', education, setStatus, token);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Education', setStatus, token);
  };

  useEffect(() => {
    if (item) {
      const data = item as Education;
      setContactID(data.contact_id);
      setStartDate(data.start_date);
      setEndDate(data.end_date);
      setPostID(data.post_id);
      setNote(data.note);
    }
  }, [item, setNote]);

  useEffect(() => {
    if (status) {
      navigate(-1);
    }
  }, [navigate, status]);

  return (
    <div>
      {item && (
        <>
          <EducationNameSelect id={contactID} setter={setContactID} />
          <PostGoIDSelect id={postID} setter={setPostID} />

          <div className="columns">
            <div className="column">
              <EducationStartDateInput setter={setStartDate} value={startDate} />
            </div>
            <div className="column">
              <EducationEndDateInput setter={setEndDate} value={endDate} />
            </div>
          </div>

          <NoteInput setter={noteInput} value={note} />

          <ItemFormButtons del={del} send={send} />
        </>
      )}
    </div>
  );
};

export default EducationItem;
