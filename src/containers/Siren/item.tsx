import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CompanyIDSelect } from '../../models/company';
import { AddressInput, ContactIDSelect, ItemFormButtons, NoteInput } from '../../models/impersonal';
import {
  SirenDeskInput,
  SirenLatitudeInput,
  SirenLongitudeInput,
  SirenNumberIDInput,
  SirenNumberPassportInput,
  SirenOwnInput,
  SirenRadioInput,
  SirenStageInput,
} from '../../models/siren';
import { SirenTypeIDSelect } from '../../models/sirentype';
import type { Siren } from '../../models/types';
import { useToken } from '../../services/auth';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';
import { useNumberU, useStringU } from '../../services/hooks';

export function SirenItem(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [numberID, setNumberID, numberIDInput] = useNumberU();
  const [numberPassport, setNumberPassport, numberPassportInput] = useStringU();
  const [sirenTypeID, setSirenTypeID] = useState<number>();
  const [address, setAddress, addressInput] = useStringU();
  const [radio, setRadio, radioInput] = useStringU();
  const [desk, setDesk, deskInput] = useStringU();
  const [contactID, setContactID] = useState<number>();
  const [companyID, setCompanyID] = useState<number>();
  const [latitude, setLatitude, latitudeInput] = useStringU();
  const [longitude, setLongitude, longitudeInput] = useStringU();
  const [stage, setStage, stageInput] = useNumberU();
  const [own, setOwn, ownInput] = useStringU();
  const [note, setNote, noteInput] = useStringU();
  const [item] = GetItem('Siren', id);
  const [status, setStatus] = useState(false);
  const { token } = useToken();

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

    SetItem('Siren', siren, setStatus, token);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Siren', setStatus, token);
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
  }, [
    item,
    setAddress,
    setDesk,
    setLatitude,
    setLongitude,
    setNote,
    setNumberID,
    setNumberPassport,
    setOwn,
    setRadio,
    setStage,
  ]);

  useEffect(() => {
    if (status) {
      navigate(-1);
    }
  }, [navigate, status]);

  return (
    <div>
      {item && (
        <>
          <SirenNumberIDInput setter={numberIDInput} value={numberID} />
          <SirenNumberPassportInput setter={numberPassportInput} value={numberPassport} />
          <SirenTypeIDSelect id={sirenTypeID} setter={setSirenTypeID} />
          <AddressInput setter={addressInput} value={address} />
          <SirenRadioInput setter={radioInput} value={radio} />
          <SirenDeskInput setter={deskInput} value={desk} />
          <ContactIDSelect id={contactID} setter={setContactID} />
          <CompanyIDSelect id={companyID} setter={setCompanyID} />
          <SirenLatitudeInput setter={latitudeInput} value={latitude} />
          <SirenLongitudeInput setter={longitudeInput} value={longitude} />
          <SirenStageInput setter={stageInput} value={stage} />
          <SirenOwnInput setter={ownInput} value={own} />
          <NoteInput setter={noteInput} value={note} />

          <ItemFormButtons del={del} send={send} />
        </>
      )}
    </div>
  );
}

export default SirenItem;
