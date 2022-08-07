import React from 'react';

function Pagenation(props) {
  const { itemCount, itemCountPerPage, currentIndex, onClick } = props;
  const rangeMax = Math.ceil(itemCount / itemCountPerPage);
  const pageIndexArr = (rangeMax) => {
    return [...Array(rangeMax)].map((_, idx) => idx + 1);
  };
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
