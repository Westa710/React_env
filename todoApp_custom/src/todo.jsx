import { useState, useRef } from 'react'
import './App.css'
import './index.css'
// import { IconContent } from 'react-icons'
import { FaTrash } from "react-icons/fa"

export const Todo = () => {
  const [tabs, setTabs] = useState({
    "買い物": [
      { name: "食パン", completed: false },
      { name: "洗剤", completed: false },
      { name: "目薬", completed: false },
      { name: "ハンドクリーム", completed: false },
      { name: "乾電池", completed: false },
      { name: "ティッシュ", completed: false }
    ],
    "課題": [
      { name: "作文", completed: false },
      { name: "数学プリント", completed: false },
      { name: "物理問題集", completed: false }
    ],
    "タブ1": [
      { name: "タスク名1", completed: false },
      { name: "タスク名2", completed: false },
      { name: "タスク名3", completed: false },
      { name: "タスク名4", completed: false }
    ],
    "タブ2": [
      { name: "タスク名4", completed: false },
      { name: "タスク名5", completed: false },
      { name: "タスク名7", completed: false },
      { name: "タスク名8", completed: false }
    ]
  });
  
  const [selectedTab, setSelectedTab] = useState(Object.keys(tabs)[0]);
  const [newTabName, setNewTabName] = useState("");
  const [newTodoName, setNewTodoName] = useState("");
  const [isAddingTab, setIsAddingTab] = useState(false);
  
  const isExistTabs = (Object.keys(tabs).length !== 0);
  // const isExistTodosInSelectedTab = (
  //   selectedTab !== "" &&
  //   tabs[selectedTab].length !== 0
  // );

  const inputTabElem = useRef(null);

  const onClickSelectTab = (tab) => {
    console.log(tab);
    setSelectedTab(tab);
  };

  const onClickSaveTab = () => {
    if(newTabName === "") {
      setIsAddingTab(false);
      return;
    }

    if(newTabName in tabs) {
      window.alert("同名のタブは追加できません");
      return;
    };
    const newTabs = tabs;
    newTabs[newTabName] = [];
    
    setTabs(newTabs);
    setNewTabName("");
    setSelectedTab(newTabName);
    setIsAddingTab(false);
  }

  const onClickSaveTodo = () => {
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
    
    const newTabs = tabs;
    newTabs[selectedTab] = newTodos;

    setTabs(newTabs);
    setNewTodoName("");

  }

  const onClickDeleteTab = (tabName) => {
    const newTabs = { ...tabs };
    delete newTabs[tabName];
    setTabs(newTabs);
    if(tabName === selectedTab) {
      setSelectedTab(Object.keys(newTabs)[0] || "");
    }
  }

  const onClickAddingTab = () => {
    setIsAddingTab(true);
    setTimeout(() => {
      inputTabElem.current.focus();
    }, 0);
  }

  const tabInputKeyDown = (event) => {
    if(event.key === "Enter"){
      onClickSaveTab();
    }
  }

  const todoInputKeyDown = (event) => {
    if(event.key === "Enter"){
      onClickSaveTodo();
    }
  }

  const onToggleTodo = (index) => {
    const newTabs = { ...tabs }; 
    newTabs[selectedTab] = [...newTabs[selectedTab]];
    newTabs[selectedTab][index] = { ...newTabs[selectedTab][index], completed: !newTabs[selectedTab][index].completed };
    setTabs(newTabs);
  }

  const onClickDeleteTodo = () => {
    const newTabs = { ...tabs }; 
    newTabs[selectedTab] = [ ...newTabs[selectedTab].filter(todo => todo.completed === false) ];
    setTabs(newTabs);
  }

  return (
    <>
      <h1 className="
        text-5xl
        text-white
        bg-sky-300
        w-full
        flex 
        justify-center 
        items-center
        h-28
      "
      >TODOリスト</h1>
      <div className='overflow-x-auto'>
        <ul className='flex'>
          {isExistTabs && (
            Object.keys(tabs).map((tab, index) => {
              const selectButtonClass = `h-8 w-28 text-lg ${tab === selectedTab ? 'border-b-2 border-blue-400 bg-gray-300' : 'bg-gray-200'} text-gray-700`;
              const deleteButtonClass = `h-8 w-10 ${tab === selectedTab ? 'border-b-2 border-blue-400 bg-gray-300' : 'bg-gray-200'}  justify-center inline-flex item-center mt-0 text-2xl`;
              return (
                <li key={index} className="
                  flex
                  h-8
                  w-28
                  text-lg
                ">
                  <button onClick={() => onClickSelectTab(tab)} className={selectButtonClass}>{tab}</button>
                  <button onClick={() => onClickDeleteTab(tab)} className={deleteButtonClass}>×</button>
                </li>
              );
          }))}

          {isAddingTab && (
            <div>
              <input
                type="text"
                ref={inputTabElem}
                value={newTabName}
                onChange={(e) => setNewTabName(e.target.value)}
                onKeyDown={tabInputKeyDown}
                placeholder=' タブ名を入力'
                className='
                  h-8
                  w-30
                  border
                  bg-gray-100'
              />
              {/* <button onClick={onClickSaveTab} className='
                ml-1
                p-1
                rounded-lg
                border
                bg-gray-200
              '>保存</button> */}
            </div>
          )}

          {!isAddingTab &&
            <button onClick={onClickAddingTab} className='
              text-2xl
              ml-2
            '>+</button>
          }
          
        </ul>
      </div>
      
      {isExistTabs &&  
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
            {tabs[selectedTab].map((todo, index) => {
              return (
                <div key={index} className='
                  w-[260px]
                  mx-0
                  flex
                  border-b-2
                  items-center
                  border-gray-600
                  h-10
                  pl-2

                '>
                  <input 
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => {onToggleTodo(index)}}/>
                  <li>
                    <p>{todo.name}</p>
                  </li>
                </div>
              )
          })}
            <div>
              <input type="text"
                value={newTodoName}
                onChange={(e) => setNewTodoName(e.target.value)}
                onKeyDown={todoInputKeyDown}
                placeholder=' TODOを入力' 
                className='
                  mt-2
                  rounded-md

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
      }

      {!isExistTabs && 
        <p>タスクを登録するには，タブを追加してください</p>
      }



    </>
  )
}

