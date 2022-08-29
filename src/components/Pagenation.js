import React from 'react';
import styles from '../styles/pagenation.module.scss';

function Pagenation(props) {
  const { itemCount, itemCountPerPage, currentIndex, onClick } = props;
  const rangeMax = Math.ceil(itemCount / itemCountPerPage);
  const pageIndexArr = (rangeMax) => {
    return [...Array(rangeMax)].map((_, idx) => idx + 1);
  };
  return (
    <>
      <ul className={styles.list}>
        {currentIndex > 1 ? (
          <li  className={styles.item}>
            <button type="button" onClick={onClick(currentIndex - 1)}>
              prev
            </button>{' '}
          </li>
        ) : (
          ''
        )}

        {pageIndexArr(rangeMax).map((item) => (
          <li
            className={`${styles.item} ${
              item === currentIndex ? styles.current : ''
            }`}
            key={item.id}
          >
            <button type="button" onClick={onClick(item)}>
              {item}
            </button>
          </li>
        ))}

        {currentIndex <rangeMax ? (
         <li  className={styles.item}>
            <button type="button" onClick={onClick(currentIndex + 1)}>
              next
            </button>{' '}
          </li>
        ) : (
          ''
        )}
      </ul>
    </>
  );
}
export default Pagenation;
