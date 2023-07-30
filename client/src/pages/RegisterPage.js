import {useState} from "react";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({name,email,phone,description,username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      alert('registration successful');
    } else {
      alert('registration failed');
    }
  }
  return (
    <form className="register"  style={{marginTop: '200px',marginBottom: '400px'}}  onSubmit={register}>
      <h1>Register</h1>
      <input type="text"
             placeholder="name"
             value={name}
             onChange={ev => setName(ev.target.value)}/>
      <input type="text"
             placeholder="email"
             value={email}
             onChange={ev => setEmail(ev.target.value)}/>
      <input type="text"
             placeholder="Phone"
             value={phone}
             onChange={ev => setPhone(ev.target.value)}/>
      <input type="text"
             placeholder="description"
             value={description}
             onChange={ev => setDescription(ev.target.value)}/>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button>Register</button>
    </form>
  );
}