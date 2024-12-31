import { useState } from 'react'
import './App.css'
export const Todo = () => {
  const [todoTabs, setTodoTabs] = useState({
    "買い物": ["食パン","洗剤","目薬","ハンドクリーム","乾電池","ティッシュ"],
    "課題": ["作文","数学プリント","物理問題集"],
    "タブ1": ["タスク名1","タスク名2","タスク名3","タスク名4"],
    "タブ2": ["タスク名4","タスク名5","タスク名7","タスク名8"]
  });
  
  const [selectedTab, setSelectedTab] = useState("買い物");

  const onClickTab = (tab) => {
    console.log(tab);
    setSelectedTab(tab);
  };

  return (
    <>
      <p>TODOリスト</p>
      <div>
        <ul style={{ display: 'flex'}}>
          {Object.keys(todoTabs).map((tab, index) => {
            return (
              <li key={index} style={{margin: "0 20px"}}>
                <p>{tab}</p>
                <button onClick={() => onClickTab(tab)}>{tab}</button>
              </li>
            );
          })}
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

