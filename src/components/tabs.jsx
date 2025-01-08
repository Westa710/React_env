import { TabItem } from './tabItem'

export const Tabs = (props) => {
  const {
    tabs, 
    selectedTab, 
    isAddingTab, 
    inputTabElem,
    newTabName,
    onClickSelectTab,
    onClickDeleteTab,
    setNewTabName,
    onClickAddingTab,
    tabInputKeyDown
  } = props;
  
  return ( 
    <div className='overflow-x-auto'>
      <ul className='flex'>

        <TabItem  tabs={tabs}
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
            {/* タブ追加ボタンの保存ボタン，スマホではこのボタンがないとタブ追加できなくなる */}
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
  )
}