import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../Editor";
import { apiUrl } from "../utils/settings";

export default function EditJob() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [company,setCompany] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);

  useEffect(() => {
    fetch(`${apiUrl}/job/`+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setCompany(postInfo.company);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('company', company);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch(`${apiUrl}/job`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/job/'+id} />
  }

  return (
    <form  style={{width: '600px',margin: 'auto',marginTop: '120px',marginBottom: '100px'}} onSubmit={updatePost}>
      <h2 style={{textAlign: 'center'}}>Edit Job</h2>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="company"
             placeholder={'Company Name'}
             value={company}
             onChange={ev => setCompany(ev.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button style={{marginTop:'5px'}}>Update post</button>
    </form>
  );
}