import axios from 'axios';
import React, { useState } from 'react'

const Map = () => {
  const [text, setText] = useState(null);
  const [todo, setTodo] = useState([]);

  function handleChange(event) {
    setText(event.target.value)
  }
  const handleSubmit = (e) => {
    console.log(text);
    setTodo((prevState) => ([...prevState, text]));
    document.getElementById('input').value = ""

    axios.post("http://localhost:4200/name", {
      name : text
    
    }).then((response)=>{
      console.log(response);
      getData()
    }).catch((err)=>{
      console.log(err);
    })
  }

  const getData = () => {
    axios.get("http://localhost:4200/name" )
    .then((response)=>{
      console.log(response);
    }).catch((err)=>{
      console.log(err);
    })
  }
  const handleDelete = (name) => {
    const restTodo = todo.filter((item) => item !== name);

    
    setTodo(restTodo)

  }

  return (
    <div style={{ width: "300px", margin: "50px auto" }} >
      <input placeholder='enter todo' id='input' onInput={handleChange} /> <button onClick={handleSubmit}>Add</button>


      <ul>
        {
          todo && todo.map((item) => {
            console.log(item);
            return (
              <div style={{ display: "flex", justifyContent: "space-between", margin: "2px" }}>

                <li  >{item}</li>
                <div style={{ display: "flex", justifyContent: "space-between", margin: "2px" }} >
                  <button  >Edit</button>
                  <button onClick={() => handleDelete(item)} style={{ marginLeft: "2px" }} >Delete</button>
                </div>

              </div>

            )
          })
        }
      </ul>

    </div>
  )
}

export default Map