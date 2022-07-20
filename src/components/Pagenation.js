
function Pagenation(props) {
  const { itemCount, itemCountPerPage, currentIndex, onClick } = props;
  const rangeMax = Math.ceil(itemCount / itemCountPerPage);
  const pageIndexArr = _rangeMax => {
    let arr = [];
    for (let i = 1; i <= _rangeMax ; i++) {
      arr.push(i);
    }
    return arr;
  }
  console.log('currentIndex')
  console.log(currentIndex)
  return (
    <ul>
      {pageIndexArr(rangeMax).map((item, i) => (
        <li
        className={item===currentIndex?'text-blue-500':'hoge'}
        key={i}
        >
          <button onClick={onClick(item)}>{item}</button>
        </li>
      ))}
    </ul>
  )
}
export default Pagenation;