import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CertificateDateInput, CertificateNumberInput } from '../../models/certificate';
import { CompanyIDSelect } from '../../models/company';
import { ContactIDSelect } from '../../models/contact';
import { ItemFormButtons, NoteInput } from '../../models/impersonal';
import type { Certificate } from '../../models/types';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';
import { useStringU } from '../../services/hooks';

export const CertificateItem = function (): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sNumber, setSNumber, sNumberInput] = useStringU();
  const [contactID, setContactID] = useState<number>();
  const [companyID, setCompanyID] = useState<number>();
  const [certDate, setCertDate] = useState<string>();
  const [note, setNote, noteInput] = useStringU();
  const [item] = GetItem('Certificate', id);
  const [status, setStatus] = useState(false);

  const send = (): void => {
    const NumberID = Number(id);
    const certificate: Certificate = {
      id: NumberID,
      num: sNumber,
      contact_id: contactID,
      company_id: companyID,
      cert_date: certDate,
      note,
    };

    SetItem(NumberID, 'Certificate', certificate, setStatus);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Certificate', setStatus);
  };

  useEffect(() => {
    if (item) {
      const data = item as Certificate;
      setSNumber(data.num);
      setContactID(data.contact_id);
      setCompanyID(data.company_id);
      setCertDate(data.cert_date);
      setNote(data.note);
    }
  }, [item, setNote, setSNumber]);

  useEffect(() => {
    if (status) {
      navigate(-1);
    }
  }, [navigate, status]);

  return (
    <div>
      {item && (
        <>
          <CertificateNumberInput setter={sNumberInput} value={sNumber} />
          <ContactIDSelect id={contactID} setter={setContactID} />
          <CompanyIDSelect id={companyID} setter={setCompanyID} />
          <CertificateDateInput setter={setCertDate} value={certDate} />
          <NoteInput setter={noteInput} value={note} />

          <ItemFormButtons del={del} send={send} />
        </>
      )}
    </div>
  );
};

export default CertificateItem;
