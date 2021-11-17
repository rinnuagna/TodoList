import './App.css';
import Menubar from "./Menubar";
import ToDoListSeg  from './TodoList/ToDoListSeg';

function App() {
  return (
    <div className="main-div-app">
     <Menubar />
     <ToDoListSeg />
    </div>
  );
}

export default App;
