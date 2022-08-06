import React from 'react';

function Pagenation(props) {
  const { itemCount, itemCountPerPage, currentIndex, onClick } = props;
  const rangeMax = Math.ceil(itemCount / itemCountPerPage);
  const pageIndexArr = (_rangeMax) => {
    const arr = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= _rangeMax; i++) {
      arr.push(i);
    }
    return arr;
  };
  // console.log('currentIndex');
  // console.log(currentIndex);
  return (
    <ul>
      {pageIndexArr(rangeMax).map((item) => (
        <li
          className={item === currentIndex ? 'text-blue-500' : 'hoge'}
          key={item.id}
        >
          <button type="button" onClick={onClick(item)}>
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}
export default Pagenation;
