import { useState, useRef, useCallback } from 'react';

export const NewTabInput = (props) => {
  const { tabs, setTabs, setSelectedTab } = props

  const [newTabName, setNewTabName] = useState("");
  const [isAddingTab, setIsAddingTab] = useState(false);
  const inputTabElem = useRef(null);

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
      <div>
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
    </div>
    )
}