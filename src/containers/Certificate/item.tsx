import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { CertificateDateInput, CertificateNumberInput } from '../../models/certificate'
import { CompanyIDSelect } from '../../models/company'
import { ContactIDSelect } from '../../models/contact'
import { ItemFormButtons, NoteInput } from '../../models/impersonal'
import { Certificate, ParameterTypes } from '../../models/types'
import { DelItem, GetItem, SetItem } from '../../services/fetcher'

export const CertificateItem = () => {
  const history = useHistory()
  const { id } = useParams<ParameterTypes>()
  const [sNumber, setSNumber] = useState<string>()
  const [contactID, setContactID] = useState<number>()
  const [companyID, setCompanyID] = useState<number>()
  const [certDate, setCertDate] = useState<string>()
  const [note, setNote] = useState<string>()
  const [item] = GetItem('Certificate', id)
  const [status, setStatus] = useState(false)

  const send = (): void => {
    const NumberID = Number(id)
    const certificate: Certificate = {
      id: NumberID,
      num: sNumber,
      contact_id: contactID,
      company_id: companyID,
      cert_date: certDate,
      note,
    }

    SetItem(NumberID, 'Certificate', certificate, setStatus)
  }

  const del = (): void => {
    const NumberID = Number(id)
    DelItem(NumberID, 'Certificate', setStatus)
  }

  useEffect(() => {
    if (item) {
      const data = item as Certificate
      setSNumber(data.num)
      setContactID(data.contact_id)
      setCompanyID(data.company_id)
      setCertDate(data.cert_date)
      setNote(data.note)
    }
  }, [item])

  useEffect(() => {
    if (status) {
      history.go(-1)
    }
  }, [history, status])

  return (
    <div>
      {item && (
        <>
          <CertificateNumberInput value={sNumber} setter={setSNumber} />
          <ContactIDSelect id={contactID} setter={setContactID} />
          <CompanyIDSelect id={companyID} setter={setCompanyID} />
          <CertificateDateInput value={certDate} setter={setCertDate} />
          <NoteInput value={note} setter={setNote} />

          <ItemFormButtons send={send} del={del} />
        </>
      )}
    </div>
  )
}
export default CertificateItem
