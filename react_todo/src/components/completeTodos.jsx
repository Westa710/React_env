export const CompleteTodos = (props) => {
  const {todos, onClickBack} = props;
  console.log("debug", todos)
  return (
    <div className='complete-area'>
      <p className='title'>完了のTODO</p>
      <ul>
        {todos.map((todo, index) => (
          // keyにtodoを設定するのは妥協案
          // keyはループごとにユニークである必要があり，
          // todoの名前が同じだとユニークでなくなってしまうため
          <li key={todo}>
            <div className='list-row'>
              <p className='todo-item'>{todo}</p>
              <button onClick={() => onClickBack(index)}>戻す</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}