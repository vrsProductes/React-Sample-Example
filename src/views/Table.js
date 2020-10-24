/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import EditNameCard from '../components/EditNameCard';
export default  function Counter() {
    const data = useSelector(state => state.empData);
    const employData = data && data.empDataLoad;

    const dispatch = useDispatch();
    const [firstName,setFirstName] =  useState('');
    const [lastName,setLastName] =  useState('');
    const [email,setEmail] =  useState('');
    const [errMsg,setErrMsg] = useState('');
    const [isEdit,setEdit] = useState(false);
    const [isAdd,setAdd] = useState(false);
    const [editData,setEditData] = useState({});
    
    
    const addDetails = () => {
      setAdd(!isAdd)
    }
    const handleInput = (e)=>{
      if (e.target.id === 'fname') {
        setFirstName(e.target.value);
      } else if (e.target.id === 'lname') {
        setLastName(e.target.value);
      } else if (e.target.id === 'email') {
        setEmail(e.target.value);
      }
      
      
      // setFirstName(e.target.value);
      
    }
    const apiUrl = 'https://reqres.in/api/users?page=2';
    
    useEffect(() => {
      loadEmpData()
    // eslint-disable-next-line no-use-before-define
    }, [loadEmpData]);
  
    const loadEmpData = async() => {
      const response = await axios(apiUrl);
      dispatch({type:'loadData',payload:response.data.data});
  
    }


    const addNewTodo = async()=>{
      setAdd(!isAdd)
      //Valid input value
      if(firstName.trim().length>1)
      {   
          setErrMsg('');
          const postapiurl = 'https://reqres.in/api/users';
          const postResponse = await axios.post(postapiurl, {"fname": firstName,"lname": lastName, "email":email});
            if (postResponse.status == 200 || postResponse.status == 201){
              alert("Successfully Added New Employe Data, please click ok button, after that you can see the New Row in that table, Thank you!");
            }
          let newTodoObject={
              id: Math.random(),
              content: employData.unshift({
                id: (postResponse && postResponse.data && postResponse.data.id),
                first_name:(postResponse && postResponse.data && postResponse.data.fname),
                last_name: (postResponse && postResponse.data && postResponse.data.lname),
                avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg",
                email: (postResponse && postResponse.data && postResponse.data.email)
              })
          }
           //Add new todo item into List with the action
          dispatch({type:'ADD_TODO',payload:newTodoObject});
          //Empty input 
          setFirstName('');
          setLastName('');
          setEmail('');
      }
      else{
          //Display Error message
          setErrMsg('Please input something...');
      }
  
     
    }

    

  const toggleEditBtn = (data) => {
    setEdit(!isEdit);
    setAdd(!isAdd)
    setEditData(data);
  }

  const deleteEmpData = (index) => {
    delete employData[index];
    dispatch({type:'REMOVE_EMP_DATA',payload:employData})
  }
  
    return (
      <div>
        <h2 className="center-align">Empolyee Data</h2>
        {!isAdd && <p>
                <span className="center-align">if you want add any new empolye data click add button </span>
                <button className="btn col s2 blue" onClick={addDetails}>Add</button>
              </p>
        }
        {!isAdd && <div>
          <table>
            <tr>
              <th>Emp ID</th>
              <th>Emp Profile</th>
              <th>Emp Name</th>
              <th>Emp email</th>
              <th>Edit Emplyoy Data</th>
            </tr>
            {employData && employData.length > 0 && employData.map((item,index) => {
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td><span><img src={item.avatar} style={{ width: '25%'}}/></span></td>
                    <td>{`${item.first_name} ${item.last_name}`}</td>
                    <td>{item.email}</td>
                    <td><button className="btn col s2 blue" onClick={() => toggleEditBtn(item)} >Edit</button></td>
                    <td><button className="btn col s2 blue" onClick={() => deleteEmpData(index)} >Delete</button></td>
                  </tr>
                </>
              )
            })}
          </table>
        </div>}
        {isEdit ?<EditNameCard editData={editData} isAddFunc = {setAdd} iseditFunc={setEdit}/> : (<div className="row">
          <p className="red-text err-msg col s12 center-align">
          {errMsg}
          </p>
          <div className="input-field col s10">
            {isAdd ? <span><input onChange={handleInput} value={firstName} placeholder="Add First Name" id="fname" type="text" />
            <input onChange={handleInput} value={lastName} placeholder="Add Last name" id="lname" type="text" />
            <input onChange={handleInput} value={email} placeholder="Add Emalil." id="email" type="text" />
            
            <label htmlFor="todo-input" className="active">Add New Employee Data</label>
            <button className="btn col s2 blue" onClick={addNewTodo} >submit</button>
            </span>: '' }
          </div>
          
  
        </div>)}
      </div>
    );
  }
  