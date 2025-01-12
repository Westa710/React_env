import { useState } from 'react'
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

  return (
    <>
      <Tabs tabs={tabs}
            setTabs={setTabs}
            selectedTab={selectedTab} 
            setSelectedTab={setSelectedTab} />
      {Object.keys(tabs).length > 0 && 
        <Todos  tabs={tabs} 
                setTabs={setTabs}
                selectedTab={selectedTab} />
      }
      {Object.keys(tabs).length === 0 && 
        <p>タスクを登録するには，タブを追加してください</p>
      }
    </>
  )
}

