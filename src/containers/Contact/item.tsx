import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CompanyIDSelect } from '../../models/company';
import { ContactBirthdayInput, ContactEducations, ContactNameInput } from '../../models/contact';
import { DepartmentIDSelect } from '../../models/department';
import { EmailInputs, FaxInputs, ItemFormButtons, NoteInput, PhoneInputs } from '../../models/impersonal';
import { PostGoIDSelect, PostIDSelect } from '../../models/post';
import { RankIDSelect } from '../../models/rank';
import type { Contact } from '../../models/types';
import { useToken } from '../../services/auth';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';
import { useItems, useStringU } from '../../services/hooks';
import {
  addEmptyItem,
  itemsToNumbers,
  itemsToStrings,
  numbersToSelectItems,
  prettyPhone,
  stringsToSelectItems,
} from '../../services/utils';

export const ContactItem = (): JSX.Element => {
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
  const [emails, setEmails, updateEmails] = useItems();
  const [phones, setPhones, updatePhones] = useItems(prettyPhone);
  const [faxes, setFaxes, updateFaxes] = useItems(prettyPhone);
  const [educations, setEducations] = useState<string[]>([]);
  const [item] = GetItem('Contact', id);
  const [status, setStatus] = useState(false);
  const { token } = useToken();

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
      emails: itemsToStrings(emails),
      phones: itemsToNumbers(phones),
      faxes: itemsToNumbers(faxes),
    };

    SetItem('Contact', contact, setStatus, token);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Contact', setStatus, token);
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
      setEmails(addEmptyItem(stringsToSelectItems(data.emails)));
      setPhones(addEmptyItem(numbersToSelectItems(data.phones)));
      setFaxes(addEmptyItem(numbersToSelectItems(data.faxes)));
      setEducations(data.educations ?? []);
    }
  }, [item, setBirthday, setEmails, setFaxes, setName, setNote, setPhones]);

  useEffect(() => {
    if (status) {
      navigate(-1);
    }
  }, [navigate, status]);

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
              <EmailInputs
                values={emails}
                onBlur={(): void => {
                  setEmails(addEmptyItem(emails));
                }}
                onChange={updateEmails}
              />
            </div>
            <div className="column">
              <PhoneInputs
                values={phones}
                onBlur={(): void => {
                  setPhones(addEmptyItem(phones));
                }}
                onChange={updatePhones}
              />
            </div>
            <div className="column">
              <FaxInputs
                values={faxes}
                onBlur={(): void => {
                  setFaxes(addEmptyItem(faxes));
                }}
                onChange={updateFaxes}
              />
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
