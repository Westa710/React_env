import { useState, useRef } from 'react'
import { Tabs } from './components/tabs'
import { Todos } from './components/todos'
import './App.css'
import './index.css'



export const App = () => {
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

  const inputTabElem = useRef(null);

  const onClickSelectTab = (tab) => {
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
    const ifTabHasUncompletedTodo = tabs[tabName].some((tab) => {
      return tab.completed === false;
    })
    
    if(ifTabHasUncompletedTodo){
      if(!window.confirm('未終了のTODOが含まれています．タブを削除しますか?')){
        return;
      }
    }
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
      {/* <h1 className="
        text-5xl
        text-white
        bg-sky-300
        w-full
        flex 
        justify-center 
        items-center
        h-28
      "
      >TODOリスト</h1> */}
      <Tabs tabs={tabs}
            selectedTab={selectedTab} 
            isAddingTab={isAddingTab} 
            inputTabElem={inputTabElem} 
            newTabName={newTabName} 
            onClickSelectTab={onClickSelectTab} 
            onClickDeleteTab={onClickDeleteTab} 
            setNewTabName={setNewTabName} 
            onClickAddingTab={onClickAddingTab} 
            tabInputKeyDown={tabInputKeyDown} />

      {isExistTabs && 
        <Todos  tabs={tabs} 
                selectedTab={selectedTab}
                newTodoName={newTodoName}
                onToggleTodo={onToggleTodo}
                setNewTodoName={setNewTodoName}
                todoInputKeyDown={todoInputKeyDown}
                onClickSaveTodo={onClickSaveTodo}
                onClickDeleteTodo={onClickDeleteTodo}
                />
      }

      {!isExistTabs && 
        <p>タスクを登録するには，タブを追加してください</p>
      }



    </>
  )
}

