import { useState, useEffect } from "react";
import axios from "axios";
import { MonitorOff, Trash } from "lucide-react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState();
  const [priority, setPriority] = useState("low");
  const [description, setDescription] = useState();

  const handleUp = async () => {
    try {
      const result = await axios.post("http://localhost:550/add_todo", {
        task: task,
        pro: priority,
        des: description,
      });
      console.log(result.data);
      const newTodo = result.data;
      setTodos([newTodo, ...todos]); //Destructuring Array
    } catch (fault) {
      alert("Not Found...");
    }
  };
  const getAllTodos = async () => {
    try {
      const result = await axios.get("http://localhost:550/getall");
      console.log(result.data);
      setTodos([...result.data]);
    } catch (Err) {
      alert("Error");
    }
  };
  
  useEffect(() => {
    getAllTodos();
  }, []);
  const deleteTodoById = async (todoid) => {
    try {
      await axios.delete("http://localhost:550/del/" + todoid);
      const temp= todos.filter((d)=>d._id!==todoid);
      setTodos(temp);
    } catch (Err) {
      console.log("Faulted");
    }
  };




  const odd_even = [2,3,4,5,7];
const even_num = odd_even.filter((nm)=> nm%2===0);

  return (
    <div className="p-4">
      <h2 className="text-2xl"> Todo List</h2>
      <div className="flex flex-col w-96 space-y-4 ">
        <input
          type="Text"
          value={task}
          onChange={(ev) => {
            setTask(ev.target.value);
          }}
          className="align-centre p-2  border outline-none border-green-600"
        />
        <textarea
          className="align-centre p-2 border outline-none border-green-600"
          value={description}
          onChange={(ev) => {
            setDescription(ev.target.value);
          }}
        />
        <select
          value={priority}
          onChange={(a) => {
            setPriority(a.target.value);
          }}
          className="align-centre p-2 border bottom-5 outline-none border-green-600"
        >
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>
      </div>

      <button
        className="p-2 my-2  w-20 bg-emerald-600 text-white uppercase "
        onClick={handleUp}
      >
        Add
      </button>

      {todos.map((todo) => (
        <div className="my-3 flex flex-row items-center justify-between space-x-4 w-72 bg-emerald-600 text-white p-3">
          <div className="flex">
            <div className="flex flex-col">
              <div className="text-xl">
                {todo.task}
                <span className="bg-white rounded-md ml-3 text-emerald-500 text-xs p-1 font-medium uppercase">
                  {todo.priority}
                </span>
              </div>
              <div className="mt-3">{todo.description}</div>
            </div>
          </div>
          <div>
            <Trash onClick={()=>{
              deleteTodoById(todo._id)
            }}/>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Todo;
