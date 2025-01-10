import { TabItem } from './tabItem'
import { memo } from 'react'

const TabsComponent = (props) => {
  const {
    tabsName,
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

        {/* FIXME:  新規タブを作成する際に長い文字列を入力するとタブ名が数行になり，
                    枠をはみ出してしまう 
        */}

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