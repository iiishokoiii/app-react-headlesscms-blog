import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endpoint, axiosOption } from '../config';
import styles from '../styles/sidenav.module.scss';

export default function SideNav() {
  const [blogList, changeBlogList] = useState([]);
  const apiurl = endpoint + '?fields=date,category';

  useEffect(() => {
    axios.get(apiurl, axiosOption).then((res) => {
      changeBlogList(res.data.contents);
    });
  }, [apiurl]);

  const cagtegoryList = (list) => {
    const _newList = [];
    list.forEach((item) => {
      item.category.forEach((_item, idx) => {
        _newList.push(_item);
      });
    });
    return _newList.filter((item, idx, arr) => arr.indexOf(item) === idx);
  };

  const archiveList = (list) => {
    const _newList = list.map((item) => {
      const dateArr = item.date.split('T')[0].split('-');
      return dateArr[0] + '-' + dateArr[1];
    });
    return _newList.filter((item, idx, arr) => arr.indexOf(item) === idx);
  };

  return (
    <div className={styles.content}>
      <div className={styles.listwrap}>
        <p className={styles.ttl}>カテゴリー</p>
        <ul className={styles.list}>
          {cagtegoryList(blogList).map((item, idx) => (
            <li className={styles.item} key={idx}>
              <Link to={`/category/${item}/page/1`}>
                <p>{item}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.listwrap}>
        <p className={styles.ttl}>アーカイブ</p>
        <ul className={styles.list}>
          {archiveList(blogList).map((item, idx) => (
            <li className={styles.item} key={idx}>
              <Link to={`/archive/${item}/page/1`}>
                <p>{item}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
