import React, { useState, useReducer, useRef, useEffect } from 'react';
import './App.css';
//const App = ({ name: newName, lastname, age, isActive: newIsActive }) => {
    const [name, setName] = useState("");
    const [person, setPerson] = useState({
        name: '',
        lastname: '',
        age: 0
    });
    const [notas, setNotas] = useState([]);
    const [isActive, setIsActive] = useState(true);
    const [todos, setTodos] = useState([]);
    const [users, setUsers] = useState([]);
    let task = useRef(null);
    let task2 = useRef(null);
    const addTask = e => {
        e.preventDefault();
        alert(task.value + " " + task2.value);
    }
    const addTask2 = e => {
        const { name: firstname, value: myvalue, type } = e.target;
        alert("Name: " + firstname + " Value: " + myvalue + " Type: " + type + " Key: " + e.key);
    }
    const setPersonValues = ({ name, lastname, age }) => {
        setPerson((prevPerson) => {
            return {
                ...prevPerson,
                name: name,
                lastname: lastname,
                age: age
            };
        });
    }
    useEffect(() => { // componenetDidMount
        console.log(newName);
        getUsers("https://jsonplaceholder.typicode.com/users");
    }, []);
    useEffect(() => { // componentDidUpdate
        console.log(person);
    }, [person])
    /* const getUsers = url => {
      let data = {
        username: 'lrodriguez',
        password: '123456'
      }
      fetch(url, {
        method: 'GET', // GET, POST, PUT, DELETE // CRUD CREATE, READ, UPDATE, DELETE
        //body: JSON.stringify(data), // POST, PUT // "name=luis"
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUsers(data);
        }).catch((error) => console.log(error));
    } */
    const getUsers = async url => {
        try {
            const response = await fetch(url, {
                method: 'GET', // GET, POST, PUT, DELETE // CRUD CREATE, READ, UPDATE, DELETE
                //body: JSON.stringify(data), // POST, PUT // "name=luis"
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }
    const saveUser = async url => {
        try {
            const response = await fetch(url, {
                method: 'POST', // GET, POST, PUT, DELETE // CRUD CREATE, READ, UPDATE, DELETE
                //body: JSON.stringify(data), // POST, PUT // "name=luis"
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data.result == "ok") {
                getUsers()
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
    <>
            <form onSubmit={(e) => addTask(e)}>
                <input type="text" ref={(input) => task = input} />
                <input type="text" ref={(input) => task2 = input} />
                <button>Enviar</button>
            </form>
            <input type="text" name="task" placeholder="Insert Task" onKeyUp={(e) => addTask2(e)} />
            <input type="password" name="task" placeholder="Insert Password" onKeyUp={(e) => addTask2(e)} />
            <h1>Hola Mundo</h1>
            <p>Name: {name}</p>
            <button onClick={() => {
                setName("Luis");
            }}>
                Cambiar Nombre
      </button>
