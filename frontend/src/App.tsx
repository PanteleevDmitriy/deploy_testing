import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IUser } from './models';
import { Users } from './components/Users';

function App() {
  const [users, setUsers] = useState<IUser[]>([])
  async function fetchUsers() {
    const response = await axios.get<IUser[]>('http://localhost:5000/users', { withCredentials: true })
    setUsers(response.data)
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className='container mx-auto max-w-2xl pt-5'>
      <h1 className='text-7xl'>
        Hello world!
      </h1>
      { users.map(users => <Users users={users} key={users.id} />) }
    </div>
  )
}

export default App;
