import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CompanyNameInput } from '../../models/company';
import { ContactShortForm } from '../../models/contact';
import { AddressInput, EmailInputs, FaxInputs, ItemFormButtons, NoteInput, PhoneInputs } from '../../models/impersonal';
import { PracticeListForm } from '../../models/practice';
import { ScopeIDSelect } from '../../models/scope';
import type { Company, ContactShort, PracticeList } from '../../models/types';
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

export const CompanyItem = function (): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName, nameInput] = useStringU();
  const [address, setAddress, addressInput] = useStringU();
  const [scopeID, setScopeID] = useState<number>();
  const [note, setNote, noteInput] = useStringU();
  const [emails, setEmails, updateEmails] = useItems();
  const [phones, setPhones, updatePhones] = useItems(prettyPhone);
  const [faxes, setFaxes, updateFaxes] = useItems(prettyPhone);
  const [practices, setPractices] = useState<PracticeList[]>([]);
  const [contacts, setContacts] = useState<ContactShort[]>([]);
  const [item] = GetItem('Company', id);
  const [status, setStatus] = useState(false);
  const { token } = useToken();

  const send = (): void => {
    const NumberID = Number(id);
    const company: Company = {
      id: NumberID,
      name,
      address,
      scope_id: scopeID,
      note,
      emails: itemsToStrings(emails),
      phones: itemsToNumbers(phones),
      faxes: itemsToNumbers(faxes),
    };

    SetItem(NumberID, 'Company', company, setStatus, token);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Company', setStatus, token);
  };

  useEffect(() => {
    if (item) {
      const data = item as Company;
      setName(data.name);
      setAddress(data.address);
      setScopeID(data.scope_id);
      setNote(data.note);
      setEmails(addEmptyItem(stringsToSelectItems(data.emails)));
      setPhones(addEmptyItem(numbersToSelectItems(data.phones)));
      setFaxes(addEmptyItem(numbersToSelectItems(data.faxes)));
      setPractices(data.practices ?? []);
      setContacts(data.contacts ?? []);
    }
  }, [item, setAddress, setEmails, setFaxes, setName, setNote, setPhones]);

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
              <EmailInputs
                values={emails}
                onBlur={(): void => setEmails(addEmptyItem(emails))}
                onChange={updateEmails}
              />
            </div>
            <div className="column">
              <PhoneInputs
                values={phones}
                onBlur={(): void => setPhones(addEmptyItem(phones))}
                onChange={updatePhones}
              />
            </div>
            <div className="column">
              <FaxInputs values={faxes} onBlur={(): void => setFaxes(addEmptyItem(faxes))} onChange={updateFaxes} />
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
