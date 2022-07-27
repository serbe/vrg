import type { ChangeEvent, FocusEventHandler } from 'react';

export type Certificate = {
  id: number;
  num?: string;
  contact_id?: number;
  company_id?: number;
  cert_date?: string;
  note?: string;
};

export const CertificateEmpty: Certificate = {
  id: 0,
};

export type CertificateList = {
  id: number;
  num?: string;
  contact_id?: number;
  contact_name?: string;
  company_id?: number;
  company_name?: string;
  cert_date?: string;
  note?: string;
};

export type Company = {
  id: number;
  name?: string;
  full_name?: string;
  address?: string;
  scope_id?: number;
  note?: string;
  emails?: string[];
  phones?: number[];
  faxes?: number[];
  practices?: PracticeList[];
  contacts?: ContactShort[];
};

export const CompanyEmpty: Company = {
  id: 0,
};

export type CompanyList = {
  id: number;
  name?: string;
  address?: string;
  scope_name?: string;
  emails?: string[];
  phones?: number[];
  faxes?: number[];
  practices?: string[];
};

export type ContactEducationsValues = {
  educations: string[];
};

export type Contact = {
  id: number;
  name?: string;
  company_id?: number;
  department_id?: number;
  post_id?: number;
  post_go_id?: number;
  rank_id?: number;
  birthday?: string;
  note?: string;
  emails?: string[];
  phones?: number[];
  faxes?: number[];
  educations?: string[];
};

export const ContactEmpty: Contact = {
  id: 0,
};

export type ContactList = {
  id: number;
  name?: string;
  company_id?: number;
  company_name?: string;
  post_name?: string;
  phones?: number[];
  faxes?: number[];
};

export type ContactShort = {
  id: number;
  name?: string;
  department_name?: string;
  post_name?: string;
  post_go_name?: string;
};

export type ContactShortValues = {
  contacts: ContactShort[];
};

export type Department = {
  id: number;
  name?: string;
  note?: string;
};

export const DepartmentEmpty: Department = {
  id: 0,
};

export type DepartmentList = {
  id: number;
  name?: string;
  note?: string;
};

export type Education = {
  id: number;
  contact_id?: number;
  start_date?: string;
  end_date?: string;
  post_id?: number;
  note?: string;
};

export const EducationEmpty: Education = {
  id: 0,
};

export type EducationList = {
  id: number;
  contact_id?: number;
  contact_name?: string;
  start_date?: string;
  end_date?: string;
  start_str?: string;
  end_str?: string;
  post_id?: number;
  post_name?: string;
  note?: string;
};

export type EducationShort = {
  id: number;
  contact_id: number;
  contact_name: string;
  company_id: number;
  company_name: string;
  start_date: string;
};

export type InputValues = {
  values: SelectItem[];
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: (index: number) => (e: ChangeEvent<HTMLInputElement>) => void;
};

export type Kind = {
  id: number;
  name?: string;
  short_name?: string;
  note?: string;
};

export const KindEmpty: Kind = {
  id: 0,
};

export type KindList = {
  id: number;
  name?: string;
  short_name?: string;
  note?: string;
};

export type ParameterTypes = {
  id: string;
};

export type Post = {
  id: number;
  name?: string;
  go?: boolean;
  note?: string;
};

export const PostEmpty: Post = {
  id: 0,
};

export type PostList = {
  id: number;
  name?: string;
  go?: boolean;
  note?: string;
};

export type Practice = {
  id: number;
  company_id?: number;
  kind_id?: number;
  topic?: string;
  date_of_practice?: string;
  note?: string;
};

export const PracticeEmpty: Practice = {
  id: 0,
};

export type PracticeList = {
  id: number;
  company_id?: number;
  company_name?: string;
  kind_id?: number;
  kind_name?: string;
  kind_short_name?: string;
  topic?: string;
  date_of_practice?: string;
  date_str?: string;
};

export type PracticeShort = {
  id: number;
  company_id: number;
  company_name: string;
  kind_id: number;
  kind_short_name: string;
  date_of_practice: string;
};

export type PracticeValues = {
  practices: PracticeList[];
};

export type Rank = {
  id: number;
  name?: string;
  note?: string;
};

export const RankEmpty: Rank = {
  id: 0,
};

export type RankList = {
  id: number;
  name?: string;
  note?: string;
};

export type Scope = {
  id: number;
  name?: string;
  note?: string;
};

export const ScopeEmpty: Scope = {
  id: 0,
};

export type ScopeList = {
  id: number;
  name?: string;
  note?: string;
};

export type SelectItem = {
  readonly id: number;
  name: string;
};

export type Siren = {
  id: number;
  num_id?: number;
  num_pass?: string;
  siren_type_id?: number;
  address?: string;
  radio?: string;
  desk?: string;
  contact_id?: number;
  company_id?: number;
  latitude?: string;
  longitude?: string;
  stage?: number;
  own?: string;
  note?: string;
};

export const SirenEmpty: Siren = {
  id: 0,
};

export type SirenList = {
  id: number;
  siren_type_name?: string;
  address?: string;
  contact_name?: string;
  phones?: number[];
};

export type SirenType = {
  id: number;
  name?: string;
  radius?: number;
  note?: string;
};

export const SirenTypeEmpty: SirenType = {
  id: 0,
};

export type SirenTypeList = {
  id: number;
  name?: string;
  radius?: number;
  note?: string;
};

export type User = {
  role: number;
  name: string;
  token: string;
};
