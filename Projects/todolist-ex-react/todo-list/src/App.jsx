import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

let API_URL = 'http://localhost:3000/api/data';

function App() {
  let [users,setUsers] = useState([]);
  const [updateUser, setUpdateUser] = useState({ id: '', name: '' });
  let newUser = useRef();
  useEffect(() => {
  fetchedData()
  },[]);
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
  let handleAddBtn = () => {
    // alert(newUser.current.value)
    let user = newUser.current.value
    axios.post(API_URL, { name : user })
  .then(function (response) {
    setUsers([...users,response.data]);
    fetchedData();
    // fetchedData();
    // handle success
    // fetchedData()
    // console.log(newUser.current.value)
    // setUsers(response.data);
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
  let handleDelete = (id) => {
      axios.delete(`${API_URL}/${id}`)
        .then(() => {
          setUsers(users.filter(user => user.id !== id));
        })
        .catch(err => console.error(err));
    }
  return (
    <>
    <input
    ref={newUser}
    type="text" placeholder='Enter something...' /> 
    <button 
    onClick={handleAddBtn}
    >ADD</button>
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

    <ul>
      {users.map((item) => (
        <li key={item.id}>{item.name} <span className='ml-5'> <button
        onClick={() => setUpdateUser({ id: item.id, name: item.name })}
        className='border-2'>Edit</button> 
        <button
        onClick={() => handleDelete(item.id)}
        className='border-2'>Delete</button></span></li>
      ))}
    </ul>
    </>
  )
}

export default App