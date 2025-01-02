import { useState, useRef } from 'react'
import './App.css'

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
  const isExistTodosInSelectedTab = (
    selectedTab !== "" &&
    tabs[selectedTab].length !== 0
  );

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

  return (
    <>
      <p>TODOリスト</p>
      <div>
        <ul style={{ display: 'flex'}}>
          {isExistTabs && (
            Object.keys(tabs).map((tab, index) => {
              return (
                <li key={index} style={{margin: "0 20px"}}>
                  <p>{tab}</p>
                  <button onClick={() => onClickSelectTab(tab)}>{tab}</button>
                  <button onClick={() => onClickDeleteTab(tab)}>削除</button>
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
                placeholder='タブ名を入力'
              />
              <button onClick={onClickSaveTab}>保存</button>
            </div>
          )}

          {!isAddingTab &&
            <button onClick={onClickAddingTab}>タブを追加</button>
          }
          
        </ul>
      </div>
      <ul style={{listStyleType: "none"}}>
        {isExistTabs && isExistTodosInSelectedTab && (
          tabs[selectedTab].map((todo, index) => {
            return (
              <div style={{display: "flex"}} key={index}>
                <input 
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => {onToggleTodo(index)}}/>
                <li>
                  <p>{todo.name}</p>
                </li>
              </div>
            )
        }))}
        {isExistTabs && (
          <div>
            <input type="text"
                    value={newTodoName}
                    onChange={(e) => setNewTodoName(e.target.value)}
                    onKeyDown={todoInputKeyDown}
                    placeholder='TODOを入力' />
            <button onClick={onClickSaveTodo}>Todoを追加</button>
          </div>
        )}

      </ul>
      {!isExistTabs && 
        <p>タスクを登録するには，タブを追加してください</p>
      }



    </>
  )
}

