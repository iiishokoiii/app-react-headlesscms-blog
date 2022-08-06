import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endpoint, axiosOption } from '../config';

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
      item.category.forEach((_item) => {
        _newList.push(_item);
      });
    });
    return _newList.filter((item, idx, arr) => arr.indexOf(item) === idx);
  };

  const archiveList = (list) => {
    // const _list = list.map(item => item.date[0])
    const _newList = list.map((item) => {
      const dateArr = item.date.split('T')[0].split('-');
      return dateArr[0] + '-' + dateArr[1];
    });
    return _newList.filter((item, idx, arr) => arr.indexOf(item) === idx);
  };

  return (
    <>
      <p>カテゴリー一覧</p>
      <ul>
        {cagtegoryList(blogList).map((item) => (
          <li key={item.id}>
            <Link to={`/category/${item}/page/1`}>
              <p>{item}</p>
            </Link>
          </li>
        ))}
      </ul>
      <p>アーカイブ</p>
      <ul>
        {archiveList(blogList).map((item) => (
          <li key={item.id}>
            <Link to={`/archive/${item}/page/1`}>
              <p>{item}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
