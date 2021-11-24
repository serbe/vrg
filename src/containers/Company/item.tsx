import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CompanyNameInput } from '../../models/company';
import { ContactShortForm } from '../../models/contact';
import { AddressInput, EmailInputs, FaxInputs, ItemFormButtons, NoteInput, PhoneInputs } from '../../models/impersonal';
import { PracticeListForm } from '../../models/practice';
import { ScopeIDSelect } from '../../models/scope';
import type { Company, ContactShort, PracticeList } from '../../models/types';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';
import { useStringU } from '../../services/hooks';
import { addEmptyString, filterArrayNumber, filterArrayString, numberToString } from '../../services/utils';

export const CompanyItem = function (): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName, nameInput] = useStringU();
  const [address, setAddress, addressInput] = useStringU();
  const [scopeID, setScopeID] = useState<number>();
  const [note, setNote, noteInput] = useStringU();
  const [emails, setEmails] = useState(['']);
  const [phones, setPhones] = useState(['']);
  const [faxes, setFaxes] = useState(['']);
  const [practices, setPractices] = useState<PracticeList[]>([]);
  const [contacts, setContacts] = useState<ContactShort[]>([]);
  const [item] = GetItem('Company', id);
  const [status, setStatus] = useState(false);

  const send = (): void => {
    const NumberID = Number(id);
    const company: Company = {
      id: NumberID,
      name,
      address,
      scope_id: scopeID,
      note,
      emails: filterArrayString(emails),
      phones: filterArrayNumber(phones),
      faxes: filterArrayNumber(faxes),
    };

    SetItem(NumberID, 'Company', company, setStatus);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Company', setStatus);
  };

  useEffect(() => {
    if (item) {
      const data = item as Company;
      setName(data.name);
      setAddress(data.address);
      setScopeID(data.scope_id);
      setNote(data.note);
      setEmails(addEmptyString(data.emails));
      setPhones(addEmptyString(numberToString(data.phones)));
      setFaxes(addEmptyString(numberToString(data.faxes)));
      setPractices(data.practices ?? []);
      setContacts(data.contacts ?? []);
    }
  }, [item, setAddress, setName, setNote]);

  useEffect(() => {
    if (status) {
      navigate(-1);
    }
  }, [navigate, status]);

  return (
    <div>
      {item && (
        <>
          <CompanyNameInput setter={nameInput} value={name} />
          <ScopeIDSelect id={scopeID} setter={setScopeID} />
          <AddressInput setter={addressInput} value={address} />

          <div className="columns">
            <div className="column">
              <EmailInputs emails={emails} setter={setEmails} />
            </div>
            <div className="column">
              <PhoneInputs phones={phones} setter={setPhones} />
            </div>
            <div className="column">
              <FaxInputs phones={faxes} setter={setFaxes} />
            </div>
          </div>

          <PracticeListForm practices={practices} />
          <ContactShortForm contacts={contacts} />
          <NoteInput setter={noteInput} value={note} />

          <ItemFormButtons del={del} send={send} />
        </>
      )}
    </div>
  );
};

export default CompanyItem;
