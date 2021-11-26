import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CompanyIDSelect } from '../../models/company';
import { ContactBirthdayInput, ContactEducations, ContactNameInput } from '../../models/contact';
import { DepartmentIDSelect } from '../../models/department';
import { EmailInputs, FaxInputs, ItemFormButtons, NoteInput, PhoneInputs } from '../../models/impersonal';
import { PostGoIDSelect, PostIDSelect } from '../../models/post';
import { RankIDSelect } from '../../models/rank';
import type { Contact, SelectItem } from '../../models/types';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';
import { useStringU } from '../../services/hooks';
import {
  addEmptyString,
  filterArrayNumber,
  filterArrayString,
  numbersToSelectItems,
  numberToString,
  prettyPhone,
} from '../../services/utils';

export const ContactItem = function (): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName, nameInput] = useStringU();
  const [companyID, setCompanyID] = useState<number>();
  const [departmentID, setDepartmentID] = useState<number>();
  const [postID, setPostID] = useState<number>();
  const [postGoID, setPostGoID] = useState<number>();
  const [rankID, setRankID] = useState<number>();
  const [birthday, setBirthday] = useState<string>();
  const [note, setNote, noteInput] = useStringU();
  const [emails, setEmails] = useState(['']);
  const [phones, setPhones] = useState<SelectItem[]>([]);
  const [faxes, setFaxes] = useState(['']);
  const [educations, setEducations] = useState<string[]>([]);
  const [item] = GetItem('Contact', id);
  const [status, setStatus] = useState(false);

  const send = (): void => {
    const NumberID = Number(id);
    const contact: Contact = {
      id: NumberID,
      name,
      company_id: companyID,
      department_id: departmentID,
      post_id: postID,
      post_go_id: postGoID,
      rank_id: rankID,
      birthday,
      note,
      emails: filterArrayString(emails),
      // phones: filterArrayNumber(phones),
      phones: [],
      faxes: filterArrayNumber(faxes),
    };

    SetItem(NumberID, 'Contact', contact, setStatus);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Contact', setStatus);
  };

  useEffect(() => {
    if (item) {
      const data = item as Contact;
      setName(data.name);
      setCompanyID(data.company_id);
      setDepartmentID(data.department_id);
      setPostID(data.post_id);
      setPostGoID(data.post_go_id);
      setRankID(data.rank_id);
      setBirthday(data.birthday);
      setNote(data.note);
      setEmails(addEmptyString(data.emails));
      setPhones(numbersToSelectItems(data.phones));
      setFaxes(addEmptyString(numberToString(data.faxes)));
      setEducations(data.educations ?? []);
    }
  }, [item, setBirthday, setName, setNote]);

  useEffect(() => {
    if (status) {
      navigate(-1);
    }
  }, [navigate, status]);

  const onChangePhones = (pos: number, value: string): void => {
    const tmpPhones = phones;
    tmpPhones[pos].name = prettyPhone(value);
    console.log(prettyPhone(value));
    console.log(tmpPhones);
    setPhones(tmpPhones);
    console.log(phones);
  };

  return (
    <div>
      {item && (
        <>
          <ContactNameInput setter={nameInput} value={name} />
          <CompanyIDSelect id={companyID} setter={setCompanyID} />

          <div className="columns">
            <div className="column is-half">
              <PostIDSelect id={postID} setter={setPostID} />
            </div>
            <div className="column is-half">
              <DepartmentIDSelect id={departmentID} setter={setDepartmentID} />
            </div>
          </div>
          <div className="columns">
            <div className="column is-half">
              <PostGoIDSelect id={postGoID} setter={setPostGoID} />
            </div>
            <div className="column is-half">
              <RankIDSelect id={rankID} setter={setRankID} />
            </div>
          </div>

          <div className="columns">
            <div className="column is-one-third">
              <ContactBirthdayInput setter={setBirthday} value={birthday} />
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <EmailInputs emails={emails} setter={setEmails} />
            </div>
            <div className="column">
              <PhoneInputs phones={faxes} items={phones} setter={setFaxes} onChange={onChangePhones} />
            </div>
            <div className="column">
              <FaxInputs phones={faxes} setter={setFaxes} />
            </div>
          </div>

          <ContactEducations educations={educations} />
          <NoteInput setter={noteInput} value={note} />

          <ItemFormButtons del={del} send={send} />
        </>
      )}
    </div>
  );
};

export default ContactItem;
