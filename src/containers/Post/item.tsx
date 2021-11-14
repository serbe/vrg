import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ItemFormButtons, NoteInput } from '../../models/impersonal';
import { PostGOSwitch, PostNameInput } from '../../models/post';
import { Post } from '../../models/types';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';

export const PostItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState<string>();
  const [go, setGo] = useState(false);
  const [note, setNote] = useState<string>();
  const [item] = GetItem('Post', id);
  const [status, setStatus] = useState(false);

  const send = (): void => {
    const NumberID = Number(id);
    const post: Post = {
      id: NumberID,
      name,
      go,
      note,
    };

    SetItem(NumberID, 'Post', post, setStatus);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Post', setStatus);
  };

  useEffect(() => {
    if (item) {
      const data = item as Post;
      setName(data.name);
      setGo(data.go || false);
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
          <PostNameInput value={name} setter={setName} />
          <PostGOSwitch value={go} setter={setGo} />
          <NoteInput value={note} setter={setNote} />

          <ItemFormButtons send={send} del={del} />
        </>
      )}
    </div>
  );
};

export default PostItem;
