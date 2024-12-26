// const MyName = () => {
//   return <h2>私の名前は西尾です</h2>
// }

const App = () => {
  const onClickButton = (content) => alert(content);
  const contentStyle = {
    color: "blue",
    fontSize:"18px",
    margin: 100
  };

  return (
    <>
      <h1 style={contentStyle}>こんにちは！</h1>
      <p style={{color: "red"}}>お元気ですか？</p>
      <button onClick = {() => onClickButton("aaa")}>ボタン</button>
    </>
  )
}

export default App
