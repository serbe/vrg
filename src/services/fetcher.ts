import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Certificate, CertificateEmpty, CertificateList } from '../models/certificate';
import { Company, CompanyEmpty, CompanyList } from '../models/company';
import { Contact, ContactEmpty, ContactList } from '../models/contact';
import { Department, DepartmentEmpty, DepartmentList } from '../models/department';
import { Education, EducationEmpty, EducationList, EducationShort } from '../models/education';
import { Kind, KindEmpty, KindList } from '../models/kind';
import { Post, PostEmpty, PostList } from '../models/post';
import { Practice, PracticeEmpty, PracticeList, PracticeShort } from '../models/practice';
import { Rank, RankEmpty, RankList } from '../models/rank';
import { Scope, ScopeEmpty, ScopeList } from '../models/scope';
import { Siren, SirenEmpty, SirenList } from '../models/siren';
import { SirenType, SirenTypeEmpty, SirenTypeList } from '../models/sirentype';
import { useToken } from './auth';

const URL = (import.meta.env.VITE_APP_JSONURL as string) || '/go/json'
const loginURL = (import.meta.env.VITE_APP_LOGINURL as string) || '/go/login'

type SelectItem = {
  id: number
  name: string
}

export type Item =
  | undefined
  | Certificate
  | Company
  | Contact
  | Department
  | Education
  | Kind
  | Post
  | Practice
  | Rank
  | Scope
  | Siren
  | SirenType

export type List =
  | CertificateList
  | CompanyList
  | ContactList
  | DepartmentList
  | EducationList
  | EducationShort
  | KindList
  | PostList
  | PracticeList
  | PracticeShort
  | RankList
  | ScopeList
  | SirenList
  | SirenTypeList

type GetListResponse =
  | undefined
  | {
      command: 'GetList'
      name: 'CertificateList'
      object: { CertificateList: CertificateList[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'CompanyList'
      object: { CompanyList: CompanyList[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'CompanySelect'
      object: { SelectItem: SelectItem[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'ContactList'
      object: { ContactList: ContactList[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'ContactSelect'
      object: { SelectItem: SelectItem[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'DepartmentList'
      object: { DepartmentList: DepartmentList[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'DepartmentSelect'
      object: { SelectItem: SelectItem[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'EducationList'
      object: { EducationList: EducationList[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'EducationNear'
      object: { EducationShort: EducationShort[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'KindList'
      object: { KindList: KindList[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'KindSelect'
      object: { SelectItem: SelectItem[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'PostGoSelect'
      object: { SelectItem: SelectItem[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'PostList'
      object: { PostList: PostList[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'PostSelect'
      object: { SelectItem: SelectItem[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'PracticeList'
      object: { PracticeList: PracticeList[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'PracticeNear'
      object: { PracticeShort: PracticeShort[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'RankList'
      object: { RankList: RankList[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'RankSelect'
      object: { SelectItem: SelectItem[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'ScopeList'
      object: { ScopeList: ScopeList[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'ScopeSelect'
      object: { SelectItem: SelectItem[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'SirenList'
      object: { SirenList: SirenList[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'SirenTypeList'
      object: { SirenTypeList: SirenTypeList[] }
      error: string
    }
  | {
      command: 'GetList'
      name: 'SirenTypeSelect'
      object: { SelectItem: SelectItem[] }
      error: string
    }

type ModifyItemResponse =
  | {
      command: 'InsertItem' | 'UpdateItem' | 'DeleteItem'
      name: 'Certificate'
      error: string
    }
  | {
      command: 'InsertItem' | 'UpdateItem' | 'DeleteItem'
      name: 'Company'
      error: string
    }
  | {
      command: 'InsertItem' | 'UpdateItem' | 'DeleteItem'
      name: 'Contact'
      error: string
    }
  | {
      command: 'InsertItem' | 'UpdateItem' | 'DeleteItem'
      name: 'Department'
      error: string
    }
  | {
      command: 'InsertItem' | 'UpdateItem' | 'DeleteItem'
      name: 'Education'
      error: string
    }
  | {
      command: 'InsertItem' | 'UpdateItem' | 'DeleteItem'
      name: 'Kind'
      error: string
    }
  | {
      command: 'InsertItem' | 'UpdateItem' | 'DeleteItem'
      name: 'Post'
      error: string
    }
  | {
      command: 'InsertItem' | 'UpdateItem' | 'DeleteItem'
      name: 'Practice'
      error: string
    }
  | {
      command: 'InsertItem' | 'UpdateItem' | 'DeleteItem'
      name: 'Rank'
      error: string
    }
  | {
      command: 'InsertItem' | 'UpdateItem' | 'DeleteItem'
      name: 'Scope'
      error: string
    }
  | {
      command: 'InsertItem' | 'UpdateItem' | 'DeleteItem'
      name: 'Siren'
      error: string
    }
  | {
      command: 'InsertItem' | 'UpdateItem' | 'DeleteItem'
      name: 'SirenType'
      error: string
    }

type GetItemResponse =
  | {
      command: 'GetItem'
      name: 'Certificate'
      object: { Certificate: Certificate }
      error: string
    }
  | {
      command: 'GetItem'
      name: 'Company'
      object: { Company: Company }
      error: string
    }
  | {
      command: 'GetItem'
      name: 'Contact'
      object: { Contact: Contact }
      error: string
    }
  | {
      command: 'GetItem'
      name: 'Department'
      object: { Department: Department }
      error: string
    }
  | {
      command: 'GetItem'
      name: 'Education'
      object: { Education: Education }
      error: string
    }
  | { command: 'GetItem'; name: 'Kind'; object: { Kind: Kind }; error: string }
  | { command: 'GetItem'; name: 'Post'; object: { Post: Post }; error: string }
  | {
      command: 'GetItem'
      name: 'Practice'
      object: { Practice: Practice }
      error: string
    }
  | { command: 'GetItem'; name: 'Rank'; object: { Rank: Rank }; error: string }
  | {
      command: 'GetItem'
      name: 'Scope'
      object: { Scope: Scope }
      error: string
    }
  | {
      command: 'GetItem'
      name: 'Siren'
      object: { Siren: Siren }
      error: string
    }
  | {
      command: 'GetItem'
      name: 'SirenType'
      object: { SirenType: SirenType }
      error: string
    }

type LoginResponse = {
  t: string
  r: number
}

export const getItem = (name: string, id: string, token: string): Promise<GetItemResponse> =>
  fetch(URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `{"command":{"GetItem":{"name":"${name}","id":${Number(id)}}},"addon":"${token}"}`,
  })
    .then(response => response.json())
    .then(response => response as GetItemResponse)

export const getList = (name: string, token: string): Promise<GetListResponse> =>
  fetch(URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `{"command":{"GetList":"${name}"},"addon":"${token}"}`,
  })
    .then(response => response.json())
    .then(response => response as GetListResponse)

export const setItem = (id: number, name: string, item: Item, token: string): Promise<ModifyItemResponse> =>
  fetch(URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `{ "command": { "${id === 0 ? 'InsertItem' : 'UpdateItem'}": { "${name}": ${JSON.stringify(
      item,
    )} } }, "addon": "${token}" }`,
  })
    .then(response => response.json())
    .then(response => response as ModifyItemResponse)

export const delItem = (id: number, name: string, token: string): Promise<ModifyItemResponse> =>
  fetch(URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `{"command":{"Delete":{"name":"${name}","id":${id}}},"addon":"${token}"}`,
  })
    .then(response => response.json())
    .then(response => response as ModifyItemResponse)

export const postLogin = (name: string, pass: string): Promise<LoginResponse> =>
  fetch(loginURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ u: name, p: btoa(pass) }),
  })
    .then(response => response.json())
    .then(response => response as LoginResponse)

export const GetItem = (name: string, id: string): [Item, string] => {
  const { token } = useToken()
  const [data, setData] = useState<Item>()
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const NumberID = Number(id)
    if (NumberID !== 0) {
      getItem(name, id, token)
        .then(response => {
          if (response.command === 'GetItem') {
            switch (response.name) {
              case 'Certificate':
                setData(response.object.Certificate)
                break
              case 'Company':
                setData(response.object.Company)
                break
              case 'Contact':
                setData(response.object.Contact)
                break
              case 'Department':
                setData(response.object.Department)
                break
              case 'Education':
                setData(response.object.Education)
                break
              case 'Kind':
                setData(response.object.Kind)
                break
              case 'Post':
                setData(response.object.Post)
                break
              case 'Practice':
                setData(response.object.Practice)
                break
              case 'Rank':
                setData(response.object.Rank)
                break
              case 'Scope':
                setData(response.object.Scope)
                break
              case 'Siren':
                setData(response.object.Siren)
                break
              case 'SirenType':
                setData(response.object.SirenType)
                break
              default:
                break
            }
          }
          return true
        })
        .catch(() => setError(`unknown list ${name}`))
    } else {
      switch (name) {
        case 'Certificate':
          setData(CertificateEmpty)
          break
        case 'Company':
          setData(CompanyEmpty)
          break
        case 'Contact':
          setData(ContactEmpty)
          break
        case 'Department':
          setData(DepartmentEmpty)
          break
        case 'Education':
          setData(EducationEmpty)
          break
        case 'Kind':
          setData(KindEmpty)
          break
        case 'Post':
          setData(PostEmpty)
          break
        case 'Practice':
          setData(PracticeEmpty)
          break
        case 'Rank':
          setData(RankEmpty)
          break
        case 'Scope':
          setData(ScopeEmpty)
          break
        case 'Siren':
          setData(SirenEmpty)
          break
        case 'SirenType':
          setData(SirenTypeEmpty)
          break
        default:
          break
      }
    }
  }, [id, name])
  return [data, error]
}

export const GetList = (name: string): [List[], string] => {
  const { token } = useToken()
  const [list, setList] = useState<List[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getList(name, token)
      .then(response => {
        if (response && response.command === 'GetList') {
          switch (response.name) {
            case 'CertificateList':
              setList(response.object.CertificateList)
              break
            case 'CompanyList':
              setList(response.object.CompanyList)
              break
            case 'ContactList':
              setList(response.object.ContactList)
              break
            case 'DepartmentList':
              setList(response.object.DepartmentList)
              break
            case 'EducationList':
              setList(response.object.EducationList)
              break
            case 'EducationNear':
              setList(response.object.EducationShort)
              break
            case 'KindList':
              setList(response.object.KindList)
              break
            case 'PostList':
              setList(response.object.PostList)
              break
            case 'PracticeList':
              setList(response.object.PracticeList)
              break
            case 'PracticeNear':
              setList(response.object.PracticeShort)
              break
            case 'RankList':
              setList(response.object.RankList)
              break
            case 'ScopeList':
              setList(response.object.ScopeList)
              break
            case 'SirenList':
              setList(response.object.SirenList)
              break
            case 'SirenTypeList':
              setList(response.object.SirenTypeList)
              break
            default:
              break
          }
        }
        return true
      })
      .catch(() => setError(`unknown list ${name}`))
  }, [name])

  return [list, error]
}

export const GetSelect = (name: string): [SelectItem[], string] => {
  const [list, setSelect] = useState<SelectItem[]>([{ id: 0, name: '' }])
  const [error, setError] = useState<string>('')
  const { token } = useToken()

  useEffect(() => {
    getList(name, token)
      .then(response => {
        if (response && response.command === 'GetList') {
          const item =
            'SelectItem' in response.object && response.object.SelectItem.length > 0
              ? response.object.SelectItem
              : [{ id: 0, name: '' }]
          switch (response.name) {
            case 'CompanySelect':
              setSelect(item)
              break
            case 'ContactSelect':
              setSelect(item)
              break
            case 'DepartmentSelect':
              setSelect(item)
              break
            case 'KindSelect':
              setSelect(item)
              break
            case 'PostSelect':
              setSelect(item)
              break
            case 'PostGoSelect':
              setSelect(item)
              break
            case 'RankSelect':
              setSelect(item)
              break
            case 'ScopeSelect':
              setSelect(item)
              break
            case 'SirenTypeSelect':
              setSelect(item)
              break
            default:
              break
          }
        }
        return true
      })
      .catch(() => setError(`unknown select ${name}`))
  }, [name])

  return [list, error]
}

export const SetItem = (id: number, name: string, item: Item, status: Dispatch<SetStateAction<boolean>>): void => {
  const { token } = useToken()
  setItem(id, name, item, token)
    .then(response => {
      const command = id === 0 ? 'InsertItem' : 'UpdateItem'
      if (response.command === command && response.name === name) {
        status(true)
      }
      return status(false)
    })
    .catch(() => status(false))
}

export const DelItem = (id: number, name: string, status: Dispatch<SetStateAction<boolean>>): void => {
  const { token } = useToken()
  delItem(id, name, token)
    .then(response => {
      if (response.command === 'DeleteItem' && response.name === name) {
        status(true)
      }
      return status(false)
    })
    .catch(() => status(false))
}
