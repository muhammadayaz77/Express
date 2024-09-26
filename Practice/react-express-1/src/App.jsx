import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
let API_URL = 'http://localhost:3000/api/data';

function App() {
  let [users,setUsers] = useState([]);
  
//  const [newUser, setNewUser] = useState('');
 const [updateUser, setUpdateUser] = useState({ id: '', name: '' });
  let newUser = useRef();
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
  let handleAddBtn = () => {
    axios.post(API_URL,{name : newUser.current.value })
    .then(function (response) {
      // handle success
      // setUsers(response.data);
      fetchedData();
      newUser.current.value = '';
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  let handleDeleteBtn = (id) => {
    axios.delete(`${API_URL}/${id}`)
    .then(function (response) {
      // handle success
      fetchedData();
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  const updateUserById = (id) => {
    axios.put(`${API_URL}/${id}`, { name: updateUser.name })
      .then(response => {
        setUsers(users.map(user => (user.id === id ? response.data : user)));
        setUpdateUser({ id: '', name: '' }); // Reset input
        fetchedData();
      })
      .catch(err => console.error(err));
  };
  return (
    <>
    <input
    ref={newUser}
    type="text" placeholder='Enter Something...' />
    <button
    onClick={handleAddBtn}
    >ADD</button>
     {/* Update User */}
     {/* {updateUser.id && ( */}
        <div>
          <input
            type="text"
            value={updateUser.name}
            onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
            placeholder="Update user name"
          />
          <button onClick={() => updateUserById(updateUser.id)}>Update User</button>
        </div>
      {/* )} */}
    <ul>
      {users.map((item) =>(
        <li>{item.name}
        <button className=''>Edit</button>
        <button 
        onClick={() => handleDeleteBtn(item.id)}
        >Delete</button>
        </li>
      ))}
    </ul>
    </>
  )
}

export default App