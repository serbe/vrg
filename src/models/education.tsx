/* eslint-disable camelcase */
import { Table, Tbody, Td, Tr } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '../components/datepicker';
import { Select } from '../components/select';
import { tinyDate, trClass } from '../services/utils';
import { EducationShort } from './types';
import { DatePickerValues, SelectValues } from './variables';

export const EducationNameSelect = ({ id, setter }: SelectValues) => (
  <Select
    name="education-contact-name"
    label="Полное имя обучаемого"
    listName="ContactSelect"
    id={id}
    icon="user"
    setter={setter}
  />
);

export const EducationStartDateInput = ({ value, setter }: DatePickerValues) => (
  <DatePicker name="education-start-date" label="Дата начала обучения" value={value} setter={setter} />
);

export const EducationEndDateInput = ({ value, setter }: DatePickerValues) => (
  <DatePicker name="education-end-date" label="Дата окончания обучения" value={value} setter={setter} />
);

export const EducationNearList = ({ list }: { list: EducationShort[] }) => {
  const navigate = useNavigate();
  return (
    <Table size="sm">
      <Tbody bg="white">
        {list.map((row) => (
          <Tr key={row.id} className={trClass(row.start_date)}>
            <Td
              className="has-text-black small-border"
              onMouseDown={(): void => navigate(`/educations/${row.id}`)}
              w="5%"
            >
              {tinyDate(row.start_date)}
            </Td>
            <Td
              className="has-text-black small-border"
              onMouseDown={(): void => navigate(`/contacts/${row.contact_id}`)}
            >
              {row.contact_name}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
