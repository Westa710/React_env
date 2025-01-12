import { TabItem } from './tabItem'
import { memo, useState, useRef, useCallback } from 'react'

const TabsComponent = (props) => {
  const { tabs, setTabs, selectedTab, setSelectedTab } = props;
  const [newTabName, setNewTabName] = useState("");
  const [isAddingTab, setIsAddingTab] = useState(false);
  const inputTabElem = useRef(null);

  const tabsName = Object.keys(tabs);

  const onClickSelectTab = useCallback((tab) => {
    setSelectedTab(tab);
  }, [setSelectedTab]);

  const onClickDeleteTab = useCallback((tabName) => {
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
  }, [tabs, selectedTab, setTabs, setSelectedTab]);

  const onClickAddingTab = useCallback(() => {
    setIsAddingTab(true);
    setTimeout(() => {
      inputTabElem.current.focus();
    }, 0);
  }, []);
  
  const onClickSaveTab = useCallback(() => {
    if(newTabName === "") {
      setIsAddingTab(false);
      return;
    }

    if(newTabName in tabs) {
      window.alert("同名のタブは追加できません");
      return;
    };

    const newTabs = { ...tabs };
    newTabs[newTabName] = [];
    
    setTabs(newTabs);
    setNewTabName("");
    setSelectedTab(newTabName);
    setIsAddingTab(false);
  }, [newTabName, tabs, setTabs, setSelectedTab]);
  
  const tabInputKeyDown = useCallback((event) => {
    if(event.key === "Enter"){
      onClickSaveTab();
    }
  }, [onClickSaveTab]);


  return (
    <div className='overflow-x-auto'>
      <ul className='flex'>
        <TabItem  tabsName={tabsName}
                  selectedTab={selectedTab}
                  onClickSelectTab={onClickSelectTab}
                  onClickDeleteTab={onClickDeleteTab}
        />
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
  )
}

export const Tabs = memo(TabsComponent);