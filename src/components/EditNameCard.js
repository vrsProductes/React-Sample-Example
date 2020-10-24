import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

const EditNameCard = (props) => {
    //Get the whole state from characterReducer
    const person = useSelector(state => state.empData );
    const dispatch = useDispatch();
    const [editData,editDataAll] =  useState(props.editData);
    const [firstName,setFirstName] =  useState('');
    const [lastName,setLastName] =  useState('');
    const [email,setEmail] =  useState('');

    const handleInput = (e)=>{
        editDataAll({});
        if (e.target.id === 'fname') {
          setFirstName(e.target.value);
        } else if (e.target.id === 'lname') {
          setLastName(e.target.value);
        } else if (e.target.id === 'email') {
          setEmail(e.target.value);
        }
        
      }
    const update  = async() => {
        props.isAddFunc(false);
        props.iseditFunc(false);
        const postapiurl = 'https://reqres.in/api/users/2';
        const editResponse = await axios.put(postapiurl, {"fname": firstName,"lname": lastName, "email":email});
            if (editResponse.status == 200){
              alert("Successfully Edit you are Employe Data, please click ok button, after that you can see the New Row in that table, Thank you!");
            }
        const objIndex = person.empDataLoad.findIndex(obj => obj.id === props.editData.id);
        const update = {...person.empDataLoad[objIndex],
                        id:props.editData.id,
                        first_name: editResponse.data.fname.length > 0 ? firstName : props.editData.first_name,
                        last_name: editResponse.data.lname.length > 0 ? lastName : props.editData.last_name,
                        email: editResponse.data.email.length > 0 ? email : props.editData.email
                    }
        const updatedProjects = [
            ...person.empDataLoad.slice(0, objIndex),
            update,
            ...person.empDataLoad.slice(objIndex + 1),
          ];
          dispatch({type: 'loadData', payload: updatedProjects})
    }
    return (
        <div className="row">
            <div className="row">
                <div className="input-field col s4">
                    <input
                        value={editData.first_name}
                        id="fname"
                        type="text"
                        onChange={handleInput}/>
                    <label htmlFor="name" className="active">Name</label>
                </div>
                <div className="input-field col s4">
                    <input
                        value={editData.last_name}
                        id="lname"
                        type="text"
                        onChange={handleInput}/>
                    <label htmlFor="occupation" className="active">Occupation</label>
                </div>
                <div className="input-field col s4">
                    <input
                        value={editData.email}
                        id="email"
                        type="email"
                        onChange={handleInput}/>
                    <label htmlFor="age" className="active">Age</label>
                </div>
            </div>
            <button className="btn col s2 blue" onClick={update} >update</button>
        </div>
    );
}

export default EditNameCard;