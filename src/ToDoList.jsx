import React, {useEffect, useState} from "react";

function ToDoList() {

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const [newTask, setNewTask] = useState("");
    

    // Live Time
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {

        if(newTask.trim() !== "") {
            setTasks(t =>[...t, newTask]);
            setNewTask("");
        }
    }

   function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
    }

    function movetaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            const temp = updatedTasks[index - 1];
            updatedTasks[index - 1] = updatedTasks[index];
            updatedTasks[index] = temp;
            setTasks(updatedTasks);
        }
       
    }

    function movetaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            const temp = updatedTasks[index + 1];
            updatedTasks[index + 1] = updatedTasks[index];
            updatedTasks[index] = temp;
            setTasks(updatedTasks);
        }
    }

    
    return(
        <div className="to_do_list">

            <div className="time-display">
                {currentTime.toLocaleTimeString()}
                <br />
                <span className="date">{currentTime.toLocaleDateString()}</span>
                
            </div>

            <h1>My To-Do List</h1>

            <div>
                <input 
                type="text" 
                placeholder="Enter Task..." 
                value={newTask}
                onChange={handleInputChange}/>

                <button 
                className="addTask"
                onClick={addTask}>
                    Add Task
                </button>
            </div>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <input type="checkbox" />
                        <span className="text">{task}</span>
                        <button className="dltBtn" onClick={() => deleteTask(index)}>🗑️</button>
                        <button className="moveBtn" onClick={() => movetaskUp(index)}>🔼</button>
                        <button className="moveBtn" onClick={() => movetaskDown(index)}>🔽</button>
                    </li>
                ))}

            </ol>
        </div>
    )

}

export default ToDoList;