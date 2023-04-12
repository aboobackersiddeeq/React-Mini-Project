import axios from '../../axios/axios'
import React, { useState } from 'react'
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function UserDetails(props) {
  // const refname=useRef()
  // const refemail=useRef()

  const [show, setShow] = useState(false);
  const [name,changeName]=useState(null)
  const [email,changeEmail]=useState(null)
  const [editId,changeId]=useState('')
  const handleClose = () => setShow(false);
  const handleShow = (index,id) =>{ 
    changeId(id)
   setShow(true);
   const name=props.users[index].username
   const email=props.users[index].email
   changeName(name)
   changeEmail(email)
  
  
    }
    // const blockUser=(id)=>{
    //     axios.post('/admin/block_user',{id:id},{headers:{"x-access-admintoken":localStorage.getItem("admintoken")}}).then((response)=>{
    //         console.log(response.data)
      
           
    //     }).catch((err)=>{
    //         swal(err.message)
    //     })
    // }
    
   const editUser=()=>{
    console.log(editId);
    axios.post('/admin/edit_user',{
      username: name,
      email: email,
      editId: editId,
    },{headers:{"x-access-admintoken":localStorage.getItem("admintoken")}}).then((response)=>{
      console.log(response.data)
      props.setUsers(response.data.result)
      swal("Poof! Your imaginary file has been Edited!", {
          icon: "success",
        }); 
        setShow(false);
  }).catch((err)=>{
      swal(err.message)
  })
   }

    const deleteUser=(id)=>{

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.post('/admin/delete_user',{id},{headers:{"x-access-admintoken":localStorage.getItem("admintoken")}}).then((response)=>{
                    console.log(response.data)
                    props.setUsers(response.data.result)
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                      });
                }).catch((err)=>{
                    swal(err.message)
                })
                
           
            } else {
              swal("Your file is safe!");
            }
          });
   
  }
    
  return (

    <div className='container-fluid  mt-5' >
        <span className='text-white'> <h4>User Details </h4></span>
        <table className="table table-light ">
  <thead>
    
    <tr>
      <th scope="col">No</th>
      <th scope="col">Image</th>
      <th scope="col">username</th>
      <th scope="col">email</th>
      <th scope="col">Actions</th>
      
    </tr>
  </thead>
  <tbody>
   
 { 

   props.users.map((e,index)=>{
       return (
       <tr key={index}>
      <th scope="row">{index+1}</th>
       {/* eslint-disable-next-line */}
      <td><img src={e.image} alt="No image"  height='50px'/></td>
      <td>{e.username}</td>
      <td>{e.email}</td>
      <td>
        {/* <button className='btn btn-primary' onClick={()=>{blockUser(e._id)}}>Block</button>  */}
        <Button className="btn btn-danger m-2" variant="primary" onClick={()=>handleShow(index,e._id)}>Edit </Button>
        <button  className="btn btn-danger ml-5" onClick={()=>{deleteUser(e._id)}}>Delete</button></td>
        
    </tr>) 
    
 })
}
  </tbody>
</table>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control  
                type="email"
                // placeholder="name@example.com"
                autoFocus
                value= {email}
                required
                onChange={(e) => {
                  changeEmail(e.target.value);
                }}
              /> 
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text"
                // placeholder="name@example.com"
                // autoFocus
                required
                value={name}
                onChange={(e) => {
                  changeName(e.target.value);
                }}
              /> 
            </Form.Group>
             
             
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UserDetails