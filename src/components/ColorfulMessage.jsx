export const ColorfulMessage = ({color, children}) => {
  //オブジェクトの省略記法
  // const { color, children } = props;
  console.log("--ColorFulMessage--");
  const contentStyleA = {
    color,
    fontSize: "18px"
  };

  return (
    <p style = {contentStyleA}>{children}</p>
  )
}