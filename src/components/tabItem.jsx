export const TabItem = (props) => {
  const {
    tabsName,
    selectedTab,
    onClickSelectTab,
    onClickDeleteTab
  } = props

  // console.log(tabsName);

  return (
    <>
      {(tabsName.map((tab, index) => {
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
    </>
  )
}