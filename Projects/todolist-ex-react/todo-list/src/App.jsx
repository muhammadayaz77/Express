import React, { useEffect, useState } from 'react'
import axios from 'axios';
let API_URL = 'http://localhost:3000/api/data';
function App() {
  let [users,setUsers] = useState([]);
  let [newUser,setNewUser] = useState('');
 const [updateUser, setUpdateUser] = useState({ id: '', name: '' });

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

  let handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
    .then(function (response) {
      // handle success
      setUsers(users.filter(user => user.id !== id));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  const updateUserById = (id) => {
    axios.put(`${API_URL}/${id}`, { name: updateUser.name })
      .then(response => {
        console.log('hi')
        setUsers(users.map(user => (user.id === id ? response.data : user)));
        setUpdateUser({ id: '', name: '' }); // Reset input
        fetchedData();
      })
      .catch(err => console.error(err));
  };

  return (
    <> 
    <input
    onChange={(e) => setNewUser(e.target.value)}
    value={newUser}
    type="text" placeholder='Add Users' className='p-2 border-2 mt-10' />
    <button
    onClick={addUser}
    className='p-2 border-2'>ADD Users</button>

{/* Update User */}
{updateUser.id && (
        <div>
          <input
            type="text"
            value={updateUser.name}
            onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
            placeholder="Update user name"
          />
          <button onClick={() => updateUserById(updateUser.id)}>Update User</button>
        </div>
      )}

      <ul className=''>
    {users.map((user) => (
        <li className='mt-3' key={user.id}>{user.name} 
        <button className='bg-blue-500 text-white px-3 ml-5'
        onClick={() => setUpdateUser({ id: user.id, name: user.name })}
        >Edit</button>
        <button className='bg-red-500 text-white px-3 ml-3'
        onClick={() => handleDelete(user.id)}
        >Delete</button>
        </li>
      ))}
      </ul>
    </>
  )
}

export default App