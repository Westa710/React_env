const styleListRow = {
  display: 'flex',
  alignItems: 'center'
}

const styleCompleteArea = {
  border: '2px solid #aacfd9',
  width: '400px',
  minHeight: '200px',
  padding: '8px',
  margin: '8px',
  borderRadius: '8px',
  backgroundColor: '#c9dede'
}

const styleTitle = {
  textAlign: 'center',
  marginTop: '0px',
  fontWeight: 'bold'
}

const styleTodoItem = {
  margin: '6px'
}

export const CompleteTodos = (props) => {
  const {todos, onClickBack} = props;
  return (
    <div style={styleCompleteArea}>
      <p style={styleTitle}>完了のTODO</p>
      <ul>
        {todos.map((todo, index) => (
          // keyにtodoを設定するのは妥協案
          // keyはループごとにユニークである必要があり，
          // todoの名前が同じだとユニークでなくなってしまうため
          <li key={todo}>
            <div style={styleListRow}>
              <p style={styleTodoItem}>{todo}</p>
              <button onClick={() => onClickBack(index)}>戻す</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}