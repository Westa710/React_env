import { TodoItem } from "./todoItem"
import { NewTodoInput } from "./newTodoInput"
import { FaTrash } from "react-icons/fa"
import { memo, useCallback } from 'react'

const TodosComponent = (props) => {
  const { tabs, setTabs, selectedTab } = props;

  const onToggleTodo = useCallback((index) => {
    const newTabs = { ...tabs }; 
    newTabs[selectedTab] = [...newTabs[selectedTab]];
    newTabs[selectedTab][index] = { ...newTabs[selectedTab][index], completed: !newTabs[selectedTab][index].completed };
    setTabs(newTabs);
  }, [tabs, selectedTab, setTabs]);

  

  const onClickDeleteTodo = useCallback(() => {
    const newTabs = { ...tabs }; 
    newTabs[selectedTab] = [ ...newTabs[selectedTab].filter(todo => todo.completed === false) ];
    setTabs(newTabs);
  }, [tabs, selectedTab, setTabs]);

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
          <NewTodoInput tabs={tabs}
                        selectedTab={selectedTab}
                        setTabs={setTabs}/>
          <button onClick={onClickDeleteTodo} className='
            absolute
            bottom-4
            right-2
            mt-2
            mr-2
          ' >
          <FaTrash size={25}/></button>
        </div>
      </ul>
    </div>
  )
}

export const Todos = memo(TodosComponent);