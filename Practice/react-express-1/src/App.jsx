import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
function App() {
  let [users,setUsers] = useState([]);
  let [updateUser,setUpdateUser] = useState({id : '',name : '',email : ''})
  let name = useRef();
  let email = useRef();
  useEffect(() => {
    fetchedUser()
  },[])
  let fetchedUser = () => {
    axios.get('http://localhost:3000/api/users')
  .then(function (response) {
    // handle success
    setUsers(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  }
  let addData = () => {
    console.log(name.current.value + email.current.value)
    axios.post('http://localhost:3000/api/users',{name : name.current.value,email:email.current.value})
  .then(function (response) {
    // handle success
    name.current.value = '';
    email.current.value = '';
    fetchedUser()
    document.getElementById('my_modal_5').close();
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  }
  let handleDelete = (id) => {
    console.log(id);
    axios.delete(`http://localhost:3000/api/users/${id}`)
  .then(function (response) {
    // handle success
    fetchedUser()
    document.getElementById('my_modal_5').close();
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  }
  let handleUpdate = () => {
    axios.put(`http://localhost:3000/api/users/${updateUser.id}`,{id : updateUser.id,name : updateUser.name,
      email : updateUser.email
    })
    .then(function (response) {
      // handle success
      document.getElementById('my_modal_6').close();
      fetchedUser()
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

  }
  let handleEditClick = (user) => {
    setUpdateUser({id : user.id,name : user.name,email : user.email});
    document.getElementById('my_modal_6').show();
    
  }
  return (
    <div className='App flex justify-center h-screen items-center'>
      <div className='border-2 w-[35%]'>
        <h1 className='text-lg font-semibold text-center'>User Management System</h1>
        <button onClick={()=>document.getElementById('my_modal_5').showModal()} className='text-white bg-blue-700 outline-none text-sm px-2 rounded-lg float-end'>ADD</button>
        <div className='mt-10'>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.name}
              </th>
              <td class="px-6 py-4">
                  {user.email}
              </td>
              <td class="px-6 py-4">
                
        <a
        onClick={() => handleEditClick(user)} 
                   class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  <button
                  onClick={() => handleDelete(user.id)}
                  className='bg-red-600 text-sm px-2 outline-none text-white'>DELETE</button>
              </td>
          </tr>
            ))}
        </tbody>
    </table>
</div>

        </div>
      </div>
    {/* Modal For ADD DATA */}
    {/* Open the modal using document.getElementById('ID').showModal() method */}

<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Enter Data to Add.</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <div method="dialog" className=' w-full'>
        <input 
        ref={name}
        type="text" placeholder='Enter Your Name' className='px-5 py-2 w-[100%] border-2 ' />
        <input
        ref={email}
        type="text" placeholder='Enter Your Email' className='mt-2 px-5 py-2 w-[100%] border-2 ' />
        <button className="btn outline-none py-1 bg-blue-600"
        onClick={addData}
        >Add</button>
      </div>
    </div>
  </div>
</dialog>
    {/* Modal For PUT DATA */}
    {/* Open the modal using document.getElementById('ID').showModal() method */}

<dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Enter Data to Add.</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <div method="dialog" className=' w-full'>
        <input 
        value={updateUser.name}
        onChange={(e) => setUpdateUser({...updateUser,name : e.target.value})}
        type="text" placeholder='Enter Your Name' className='px-5 py-2 w-[100%] border-2 ' />
        
        <input 
        value={updateUser.email}
        onChange={(e) => setUpdateUser({...updateUser,email : e.target.value})}
        type="text" placeholder='Enter Your Email' className='px-5 py-2 w-[100%] border-2 mt-3' />
        
        <button className="btn outline-none py-1 bg-blue-600"
        onClick={handleUpdate}
        >Update</button>
      </div>
    </div>
  </div>
</dialog>
    </div>
  )
}



export default App