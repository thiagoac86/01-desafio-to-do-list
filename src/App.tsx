import { Header } from './components/Header'
import { ToDoList } from './components/ToDoList'
import './global.css'

function App() {

  return (
    <div >
      <Header />
      <div>
        <ToDoList />
      </div>
    </div>
  )
}

export default App
