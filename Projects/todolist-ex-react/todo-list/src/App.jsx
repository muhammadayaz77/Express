import React, { useEffect, useState } from 'react'
import axios from 'axios';
let API_URL = 'http://localhost:3000/api/data';
function App() {
  let [users,setUsers] = useState([]);
  let [newUser,setNewUser] = useState('');
  let fetchedData = () => {
    axios.get(API_URL)
  .then(function (response) {
    // handle success
    setUsers(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  }
  useEffect(() => {
    fetchedData()
  },[])


  // ADD NEW USER

  let addUser = () => {
    axios.post(API_URL,{name : newUser})
    .then(function (response) {
      // handle success
      setUsers(users);
      setNewUser('');
      fetchedData();

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }


  return (
    <> 
    <input
    onChange={(e) => setNewUser(e.target.value)}
    value={newUser}
    type="text" placeholder='Add Users' className='p-2 border-2 mt-10' />
    <button
    onClick={addUser}
    className='p-2 border-2'>ADD Users</button>
      <ul className=''>
    {users.map((user) => (
        <li className='mt-3' key={user.id}>{user.name} 
        <button className='bg-blue-500 text-white px-3 ml-5'>Edit</button>
        <button className='bg-red-500 text-white px-3 ml-3'>Delete</button>
        </li>
      ))}
      </ul>
    </>
  )
}

export default App