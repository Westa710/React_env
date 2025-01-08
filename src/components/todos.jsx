import { TodoItem } from "./todoItem"
import { FaTrash } from "react-icons/fa"

export const Todos = (props) => {
  const { tabs, 
          selectedTab,
          newTodoName,
          onToggleTodo,
          setNewTodoName,
          todoInputKeyDown,
          onClickSaveTodo,
          onClickDeleteTodo
  } = props;

  return(
    
      <div className='
        w-80
        mt-10
        min-h-[400px]
        mx-auto
        py-5
        px-1
        flex
        justify-center
        bg-gray-200
        rounded-3xl
        relative
      '>
        <ul>
        <TodoItem tabs={tabs}
                  selectedTab={selectedTab}
                  onToggleTodo={onToggleTodo}
        />
        
          <div>
            <input type="text"
              value={newTodoName}
              onChange={(e) => setNewTodoName(e.target.value)}
              onKeyDown={todoInputKeyDown}
              placeholder=' TODOを入力' 
              className='
                mt-2
                rounded-md
                focus:outline-none 
                focus:ring-2
                focus:ring-cyan-300 
                focus:ring-opacity-75
              '/>
            <button onClick={onClickSaveTodo} className='
              pl-1
              text-xl
            '>+</button>
            <button onClick={onClickDeleteTodo} className='
              absolute
              bottom-4
              right-2
              mt-2
              mr-2
            ' ><FaTrash size={25}/></button>
          </div>
        </ul>
      </div>
  )
}