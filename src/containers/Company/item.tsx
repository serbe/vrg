import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CompanyNameInput } from '../../models/company';
import { ContactShortForm } from '../../models/contact';
import { AddressInput, EmailInputs, FaxInputs, ItemFormButtons, NoteInput, PhoneInputs } from '../../models/impersonal';
import { PracticeListForm } from '../../models/practice';
import { ScopeIDSelect } from '../../models/scope';
import type { Company, ContactShort, PracticeList, SelectItem } from '../../models/types';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';
import { useStringU } from '../../services/hooks';
import { numbersToSelectItems, prettyPhone, stringsToSelectItems } from '../../services/utils';

export const CompanyItem = function (): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName, nameInput] = useStringU();
  const [address, setAddress, addressInput] = useStringU();
  const [scopeID, setScopeID] = useState<number>();
  const [note, setNote, noteInput] = useStringU();
  const [emails, setEmails] = useState<SelectItem[]>([{ id: 0, name: '' }]);
  const [phones, setPhones] = useState<SelectItem[]>([{ id: 0, name: '' }]);
  const [faxes, setFaxes] = useState<SelectItem[]>([{ id: 0, name: '' }]);
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
      // emails: filterArrayString(emails),
      // phones: filterArrayNumber(phones),
      // faxes: filterArrayNumber(faxes),
      emails: [],
      phones: [],
      faxes: [],
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
      setEmails(stringsToSelectItems(data.emails));
      setPhones(numbersToSelectItems(data.phones));
      setFaxes(numbersToSelectItems(data.faxes));
      setPractices(data.practices ?? []);
      setContacts(data.contacts ?? []);
    }
  }, [item, setAddress, setName, setNote]);

  useEffect(() => {
    if (status) {
      navigate(-1);
    }
  }, [navigate, status]);

  const updateEmails =
    (index: number) =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      const newArr = [...emails];
      newArr[index].name = e.target.value;
      setPhones(newArr);
    };

  const updatePhones =
    (index: number) =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      const newArr = [...phones];
      newArr[index].name = prettyPhone(e.target.value);
      setPhones(newArr);
    };

  const updateFaxes =
    (index: number) =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      const newArr = [...faxes];
      newArr[index].name = prettyPhone(e.target.value);
      setFaxes(newArr);
    };

  return (
    <div>
      {item && (
        <>
          <CompanyNameInput setter={nameInput} value={name} />
          <ScopeIDSelect id={scopeID} setter={setScopeID} />
          <AddressInput setter={addressInput} value={address} />

          <div className="columns">
            <div className="column">
              <EmailInputs values={emails} onChange={updateEmails} />
            </div>
            <div className="column">
              <PhoneInputs values={phones} onChange={updatePhones} />
            </div>
            <div className="column">
              <FaxInputs values={faxes} onChange={updateFaxes} />
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
