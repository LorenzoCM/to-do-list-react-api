import React, { useState, useRef, useEffect } from 'react';
import Tasks from './Tasks';
import './App.css';

function App() {

  let list = useRef(null);
  let text = useRef(null);

  const [state, setState] = useState([]);

  useEffect(() => {
    console.log("Component Mounted");

    getInfo();

  }, []);

  useEffect(() => {
    console.log("Component Mounted");
    
    if (state.length > 0) {
    putInfo();
    }


  }, [state]);


  const taskPost = () => {

    fetch('https://assets.breatheco.de/apis/fake/todos/user/LorenzoCM', {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(data => {
        //here is were your code should start after the fetch finishes
        data = state.label; //this will print on the console the exact object received from the server
      })
      .catch(error => {
        //error handling
        console.log(error);
      });
  }

  const putInfo = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/LorenzoCM', {
      method: "PUT",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        console.log(resp.ok); // will be true if the response is successfull        
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        console.log(data);
      })
      .catch(error => {
        //error handling
        console.log(error);
      });
  }

  const getInfo = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/LorenzoCM')
      .then((response) => {        
        return response.json();
      })
      .then((data) => { 
        if (data.msg) {
          taskPost();
        }       
        setState(data);
      })
      .catch((error) => {
        console.log(error);
      })
    //fetch("", {}).then(() => {}).then(() => {}).catch(() => {});
  }

  const deleteTasks = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/LorenzoCM', {
      method: "DELETE"
    })
    setState([{
      "label": "Please add a task",
      "done": false
    }])
  }

  const addTask = (e) => {
    if (e.keyCode === 13 && e.target.value !== "") {
      const newState = state.concat({ label: e.target.value, done: false });
      setState(newState)
      text.current.value = "";      
    }
  }


  const deleteTask = (index) => {
    console.log(index);
    state.splice(index, 1);
    setState([...state]);
  }

  const pendingTasks = state.length;

  return (
    <div className="container">
      <div className="central">
        <div className="header">
          todos
        </div>
        <div className="box-principal">
          <div ref={list} className="form-group">
            <input ref={text} type="text" className="form-control" id="todolist" placeholder="Add a task" onKeyDown={(e) => addTask(e)} />
          </div>
          <div>
            {
              state.length > 0 &&
              state.map((item, index) => {
                return (                  
                    <div key={index} className="separate">
                      <div className="list">
                        <Tasks
                          task={item.label}                          
                          index={index}
                          deleteTask={deleteTask}
                        />
                      </div>
                      <div className="trash">
                        <i className="fas fa-trash" onClick={() => deleteTask(index)}></i>
                      </div>
                    </div>
                  )
              })
            }
          </div>
          <div className="footer">
            <span>You have {pendingTasks} pending task</span>
          </div>
          <div className="deleter">
            <i className="fas fa-trash" onClick={() => deleteTasks()}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
