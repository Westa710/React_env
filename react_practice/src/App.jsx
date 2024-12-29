
import { ColorfulMessage } from "./components/ColorfulMessage";
import { useEffect, useState } from "react";

const App = () => {
  const [num, setNum] = useState(0);
  const [isShowFace, setIsShowFace] = useState(false);
  const onClickCountUp = () => {
    // prevには 現在(関数の中でstateが更新されたとしても，
    // 更新後の状態)のstateの値が格納されている
    setNum((prev) => prev + 1);
  };
  const onClickToggle = () => {
    setIsShowFace(!isShowFace);
  };

  //useEffectの第一匹日数に設定した関数は，第二引数の配列に含まれる
  // Stateが更新されたことによる再レンダリング時のみ実行される．
  // ここでは，on/offボタンを押したときにnumが変化しないため，ボタンを押しても
  // numのModを求めてisShowFaceを更新する処理が発生せず，再レンダリングも行われない
  useEffect(() => {
    if(num % 3 === 0 && num > 0) {
      isShowFace || setIsShowFace(true);
    } else {
      isShowFace && setIsShowFace(false);
    }
  }, [num]);
  

  return (
    <>
      <h1 style={{color: "red"}}>こんにちは！</h1>
      <ColorfulMessage color="blue" >お元気ですか？</ColorfulMessage>
      <ColorfulMessage color="green" >元気です!</ColorfulMessage>
      <button onClick = {onClickCountUp}>カウントアップ</button>
      <p>{num}</p>
      <button onClick={onClickToggle}>on/off</button>
      {isShowFace && <p>( ;∀;)</p>}
    </>
  )
}

export default App
