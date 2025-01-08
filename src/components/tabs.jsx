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
        
        {(Object.keys(tabs).map((tab, index) => {
            const selectButtonClass = `h-8 w-28 text-lg ${tab === selectedTab ? 'border-b-2 border-blue-400 bg-gray-300' : 'bg-gray-200'} text-gray-700`;
            const deleteButtonClass = `h-8 w-10 ${tab === selectedTab ? 'border-b-2 border-blue-400 bg-gray-300' : 'bg-gray-200'}  justify-center inline-flex item-center mt-0 text-2xl`;
            return (
              <li key={index} className="
                flex
                h-8
                w-28
                text-lg
              ">
                <button onClick={() => onClickSelectTab(tab)} className={selectButtonClass}>{tab}</button>
                <button onClick={() => onClickDeleteTab(tab)} className={deleteButtonClass}>×</button>
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