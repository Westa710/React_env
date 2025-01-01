import { useState, useRef } from 'react'
import './App.css'

export const Todo = () => {
  const [Tabs, setTabs] = useState({
    "買い物": ["食パン","洗剤","目薬","ハンドクリーム","乾電池","ティッシュ"],
    "課題": ["作文","数学プリント","物理問題集"],
    "タブ1": ["タスク名1","タスク名2","タスク名3","タスク名4"],
    "タブ2": ["タスク名4","タスク名5","タスク名7","タスク名8"]
  });
  
  const [selectedTab, setSelectedTab] = useState(Object.keys(Tabs)[0]);
  const [newTabName, setNewTabName] = useState("");
  const [newTodoName, setNewTodoName] = useState("");
  const [isAddingTab, setIsAddingTab] = useState(false);
  const [isAddingTabComposing, setIsAddingTabComposing] = useState(false);
  const [isAddingTodoComposing, setIsAddingTodoComposing] = useState(false);

  
  const isExistTabs = (Object.keys(Tabs).length !== 0);
  const isExistTodosInSelectedTab = (
    selectedTab !== "" &&
    Tabs[selectedTab].length !== 0
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

    if(newTabName in Tabs) {
      window.alert("同名のタブは追加できません");
      return;
    };
    const newTabs = Tabs;
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

    if(Tabs[selectedTab].includes(newTodoName)) {
      window.alert("同名のTODOは追加できません");
      return;
    };

    const newTodos = Tabs[selectedTab];
    newTodos.push(newTodoName);
    
    const newTabs = Tabs;
    newTabs[selectedTab] = newTodos;

    setTabs(newTabs);
    setNewTodoName("");

  }

  const onClickDeleteTab = (tabName) => {
    const newTabs = { ...Tabs };
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
    if(event.key === "Enter" && !isAddingTabComposing){
      onClickSaveTab();
    }
  }

  const todoInputKeyDown = (event) => {
    if(event.key === "Enter" && !isAddingTodoComposing){
      onClickSaveTodo();
    }
  }

  return (
    <>
      <p>TODOリスト</p>
      <div>
        <ul style={{ display: 'flex'}}>
          {isExistTabs && (
            Object.keys(Tabs).map((tab, index) => {
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
                onCompositionStart={() => setIsAddingTabComposing(true)}
                onCompositionEnd={() => setIsAddingTabComposing(false)}
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
          Tabs[selectedTab].map((todo, index) => {
            return (
              <div style={{display: "flex"}} key={index}>
                <input type="checkbox" />
                <li>
                  <p>{todo}</p>
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
                    onCompositionStart={() => setIsAddingTodoComposing(true)}
                    onCompositionEnd={() => setIsAddingTodoComposing(false)}
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

