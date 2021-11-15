import { Box, Container, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CompanyIDSelect } from '../../models/company';
import { ContactBirthdayInput, ContactEducations, ContactNameInput } from '../../models/contact';
import { DepartmentIDSelect } from '../../models/department';
import { EmailInputs, FaxInputs, ItemFormButtons, NoteInput, PhoneInputs } from '../../models/impersonal';
import { PostGoIDSelect, PostIDSelect } from '../../models/post';
import { RankIDSelect } from '../../models/rank';
import { Contact } from '../../models/types';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';
import { addEmptyString, filterArrayNumber, filterArrayString, numberToString } from '../../services/utils';

export const ContactItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState<string>();
  const [companyID, setCompanyID] = useState<number>();
  const [departmentID, setDepartmentID] = useState<number>();
  const [postID, setPostID] = useState<number>();
  const [postGoID, setPostGoID] = useState<number>();
  const [rankID, setRankID] = useState<number>();
  const [birthday, setBirthday] = useState<string>();
  const [note, setNote] = useState<string>();
  const [emails, setEmails] = useState(['']);
  const [phones, setPhones] = useState(['']);
  const [faxes, setFaxes] = useState(['']);
  const [educations, setEducations] = useState<string[]>([]);
  const [item] = GetItem('Contact', id);
  const [status, setStatus] = useState(false);
  const [date, setDate] = useState(new Date());

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
      phones: filterArrayNumber(phones),
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
      setPhones(addEmptyString(numberToString(data.phones)));
      setFaxes(addEmptyString(numberToString(data.faxes)));
      setEducations(data.educations || []);
    }
  }, [item]);

  useEffect(() => {
    if (status) {
      navigate(-1);
    }
  }, [navigate, status]);

  return (
    <Container maxW="full" mt={0} centerContent overflow="hidden">
      {item && (
        <Wrap>
          <WrapItem>
            <Box bg="white" borderRadius="lg">
              <Box m={8} color="#0B0E3F">
                <VStack spacing={5}>
                  <ContactNameInput value={name} setter={setName} />
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
                      <ContactBirthdayInput value={date} setter={setDate} />
                    </div>
                    <div className="column is-one-third">
                      <input type="date" />
                    </div>
                  </div>

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

                  <ContactEducations educations={educations} />
                  <NoteInput value={note} setter={setNote} />

                  <ItemFormButtons send={send} del={del} />
                </VStack>
              </Box>
            </Box>
          </WrapItem>
        </Wrap>
      )}
    </Container>
  );
};

export default ContactItem;
