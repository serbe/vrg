import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ItemFormButtons, NoteInput } from '../../models/impersonal';
import { PostGOSwitch, PostNameInput } from '../../models/post';
import type { Post } from '../../models/types';
import { useToken } from '../../services/auth';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';
import { useStringU } from '../../services/hooks';

export function PostItem(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName, nameInput] = useStringU();
  const [go, setGo] = useState(false);
  const [note, setNote, noteInput] = useStringU();
  const [item] = GetItem('Post', id);
  const [status, setStatus] = useState(false);
  const { token } = useToken();

  const send = (): void => {
    const NumberID = Number(id);
    const post: Post = {
      id: NumberID,
      name,
      go,
      note,
    };

    SetItem('Post', post, setStatus, token);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Post', setStatus, token);
  };

  useEffect(() => {
    if (item) {
      const data = item as Post;
      setName(data.name);
      setGo(data.go ?? false);
      setNote(data.note);
    }
  }, [item, setName, setNote]);

  useEffect(() => {
    if (status) {
      navigate(-1);
    }
  }, [navigate, status]);

  return (
    <div>
      {item && (
        <>
          <PostNameInput setter={nameInput} value={name} />
          <PostGOSwitch setter={setGo} value={go} />
          <NoteInput setter={noteInput} value={note} />

          <ItemFormButtons del={del} send={send} />
        </>
      )}
    </div>
  );
}

export default PostItem;
