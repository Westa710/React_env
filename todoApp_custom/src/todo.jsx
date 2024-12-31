import { useState } from 'react'
import './App.css'

// fixme: すべてのタブを消去したときにエラーが発生する問題を解消
export const Todo = () => {
  const [todoTabs, setTodoTabs] = useState({
    "買い物": ["食パン","洗剤","目薬","ハンドクリーム","乾電池","ティッシュ"],
    "課題": ["作文","数学プリント","物理問題集"],
    "タブ1": ["タスク名1","タスク名2","タスク名3","タスク名4"],
    "タブ2": ["タスク名4","タスク名5","タスク名7","タスク名8"]
  });
  
  const [selectedTab, setSelectedTab] = useState("買い物");
  const [newTabName, setNewTabName] = useState("");
  const [isAddingTab, setIsAddingTab] = useState(false);

  const onClickSelectTab = (tab) => {
    console.log(tab);
    setSelectedTab(tab);
  };

  const onClickSaveTab = () => {
    if(newTabName === "") {
      setIsAddingTab(false);
      return;
    }
    const newTodoTabs = todoTabs;
    newTodoTabs[newTabName] = [];
    setTodoTabs(newTodoTabs);

    setIsAddingTab(false);
  }

  const onClickDeleteTab = (tabName) => {
    console.log("called");
    const newTodoTabs = { ...todoTabs };
    delete newTodoTabs[tabName];
    setTodoTabs(newTodoTabs);
    if(tabName === selectedTab) {
      setSelectedTab(Object.keys(newTodoTabs)[0] || "");
    }
  }

  return (
    <>
      <p>TODOリスト</p>
      <div>
        <ul style={{ display: 'flex'}}>
          {Object.keys(todoTabs).map((tab, index) => {
            return (
              <li key={index} style={{margin: "0 20px"}}>
                <p>{tab}</p>
                <button onClick={() => onClickSelectTab(tab)}>{tab}</button>
                <button onClick={() => onClickDeleteTab(tab)}>削除</button>
              </li>
            );
          })}

          {isAddingTab && (
            <div>
              <input
                type="text"
                value={newTabName}
                onChange={(e) => setNewTabName(e.target.value)}
                placeholder='タブ名を入力'
              />
              <button onClick={onClickSaveTab}>保存</button>
            </div>
          )}

          {!isAddingTab &&
            <button onClick={() => setIsAddingTab(true)}>タブを追加</button>
          }
          
        </ul>
      </div>
      <ul>
        {todoTabs[selectedTab].map((todo, index) => {
          return (
            <li key={index}>
              <p>{todo}</p>
            </li>
          )
        })}
      </ul>



    </>
  )
}

