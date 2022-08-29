import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endpoint, axiosOption } from '../config';
import styles from '../styles/header.module.scss';

export default function Header() {
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

  return (
    <header className={styles.header}>
      <h1 className={styles.ttl}>
        <Link to="/">TestBlog</Link>
      </h1>
      <div className={styles.nav}>
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
    </header>
  );
}
