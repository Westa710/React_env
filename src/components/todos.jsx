import { TodoItem } from "./todoItem"
import { FaTrash } from "react-icons/fa"
import { memo, useState, useCallback } from 'react'

const TodosComponent = (props) => {
  const { tabs, setTabs, selectedTab } = props;
  const [newTodoName, setNewTodoName] = useState("");

  const onToggleTodo = useCallback((index) => {
    const newTabs = { ...tabs }; 
    newTabs[selectedTab] = [...newTabs[selectedTab]];
    newTabs[selectedTab][index] = { ...newTabs[selectedTab][index], completed: !newTabs[selectedTab][index].completed };
    setTabs(newTabs);
  }, [tabs, selectedTab, setTabs]);

  const onClickSaveTodo = useCallback(() => {
    if(newTodoName === "") {
      return;
    };

    for (const todo of tabs[selectedTab]) {
      if (newTodoName === todo.name) {
        window.alert("同名のTODOは追加できません");
        return;
      }
    }

    const newTodos = tabs[selectedTab];
    newTodos.push({name: newTodoName, completed: false});
    
    const newTabs = { ...tabs };
    newTabs[selectedTab] = newTodos;

    setTabs(newTabs);
    setNewTodoName("");
  }, [newTodoName, tabs, selectedTab, setTabs]);

  const onClickDeleteTodo = useCallback(() => {
    const newTabs = { ...tabs }; 
    newTabs[selectedTab] = [ ...newTabs[selectedTab].filter(todo => todo.completed === false) ];
    setTabs(newTabs);
  }, [tabs, selectedTab, setTabs]);

  const todoInputKeyDown = useCallback((event) => {
    if(event.key === "Enter"){
      onClickSaveTodo();
    }
  }, [onClickSaveTodo]);

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

export const Todos = memo(TodosComponent);