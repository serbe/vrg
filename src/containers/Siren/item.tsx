import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CompanyIDSelect } from '../../models/company';
import { AddressInput, ContactIDSelect, ItemFormButtons, NoteInput } from '../../models/impersonal';
import {
  SirenDeskInput,
  SirenLatitudeInput,
  SirenLongtitudeInput,
  SirenNumberIDInput,
  SirenNumberPassportInput,
  SirenOwnInput,
  SirenRadioInput,
  SirenStageInput,
} from '../../models/siren';
import { SirenTypeIDSelect } from '../../models/sirentype';
import type { Siren } from '../../models/types';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';

export const SirenItem = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [numberID, setNumberID] = useState<number>();
  const [numberPassport, setNumberPassport] = useState<string>();
  const [sirenTypeID, setSirenTypeID] = useState<number>();
  const [address, setAddress] = useState<string>();
  const [radio, setRadio] = useState<string>();
  const [desk, setDesk] = useState<string>();
  const [contactID, setContactID] = useState<number>();
  const [companyID, setCompanyID] = useState<number>();
  const [latitude, setLatitude] = useState<string>();
  const [longitude, setLongitude] = useState<string>();
  const [stage, setStage] = useState<number>();
  const [own, setOwn] = useState<string>();
  const [note, setNote] = useState<string>();
  const [item] = GetItem('Siren', id);
  const [status, setStatus] = useState(false);

  const send = (): void => {
    const NumberID = Number(id);
    const siren: Siren = {
      id: NumberID,
      num_id: numberID,
      num_pass: numberPassport,
      siren_type_id: sirenTypeID,
      address,
      radio,
      desk,
      contact_id: contactID,
      company_id: companyID,
      latitude,
      longitude,
      stage,
      own,
      note,
    };

    SetItem(NumberID, 'Siren', siren, setStatus);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Siren', setStatus);
  };

  useEffect(() => {
    if (item) {
      const data = item as Siren;
      setNumberID(data.num_id);
      setNumberPassport(data.num_pass);
      setSirenTypeID(data.siren_type_id);
      setAddress(data.address);
      setRadio(data.radio);
      setDesk(data.desk);
      setContactID(data.contact_id);
      setCompanyID(data.company_id);
      setLatitude(data.latitude);
      setLongitude(data.longitude);
      setStage(data.stage);
      setOwn(data.own);
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
          <SirenNumberIDInput setter={setNumberID} value={numberID} />
          <SirenNumberPassportInput setter={setNumberPassport} value={numberPassport} />
          <SirenTypeIDSelect id={sirenTypeID} setter={setSirenTypeID} />
          <AddressInput setter={setAddress} value={address} />
          <SirenRadioInput setter={setRadio} value={radio} />
          <SirenDeskInput setter={setDesk} value={desk} />
          <ContactIDSelect id={contactID} setter={setContactID} />
          <CompanyIDSelect id={companyID} setter={setCompanyID} />
          <SirenLatitudeInput setter={setLatitude} value={latitude} />
          <SirenLongtitudeInput setter={setLongitude} value={longitude} />
          <SirenStageInput setter={setStage} value={stage} />
          <SirenOwnInput setter={setOwn} value={own} />
          <NoteInput setter={setNote} value={note} />

          <ItemFormButtons del={del} send={send} />
        </>
      )}
    </div>
  );
};
