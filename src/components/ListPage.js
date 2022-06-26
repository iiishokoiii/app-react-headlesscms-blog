import styles from '../styles/listpage.module.scss';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { endpoint, axiosOption } from "../config";
import Pagenation from './Pagenation';

function ListPage() {
  const [blogList, changeBlogList] = useState([]);
  const [pageCount, changePageCount] = useState(0);
  const params = useParams();
  const itemCountPerPage = 3;
  //API endpoint query setting
  const setApiUrl = params => {
    const page = params.pageid || '1';
    const categoryid = params.categoryid || null;
    let url = endpoint;
    let query = {
      fields: 'id,title,date,category,description,taglist',
      filters: categoryid ? '&filters=category[contains]' + categoryid : '',
      limit: itemCountPerPage,
      offset: (page-1)*itemCountPerPage
    }
    Object.keys(query).forEach((key, idx) => {
      url += idx === 0 ? '?' + key + '=' + query[key] : '&' + key + '=' + query[key];
    })
    return url;
  }
  let apiurl = setApiUrl(params);

  // paramsが更新されたらAjaxでデータ取得する
  useEffect(() => {
    // changeApiUrl(setApiUrl(params))
    axios.get(apiurl, axiosOption).then(res => {
      console.log(res.data.totalCount);
      let itemCount = res.data.totalCount;
      let _pageCount = itemCount / itemCountPerPage;
      changePageCount(_pageCount);
      changeBlogList(res.data.contents);
    })
  }, [apiurl]);

  return (
    <>
      <div className={styles.content}>
        {params.categoryid ? <h2>{params.categoryid}</h2> : ''}
        <ul className={styles.list}>
        {blogList.map((item, i) => (
          <li
          className={styles.list__item}
          key={i}
          >
          <Link to={`/post/${item.id}`}>
            <p className={styles.ttl}>{item.title}</p>
            <ul className={styles.category}>
            {item.category.map((elm, j) => (
              <li
                className={styles.category__item}
                key={j}
              >{elm}</li>
            ))}
            </ul>
          </Link>
          </li>
        ))}
        </ul>
        <hr />  
        <Pagenation totalCount={pageCount} />
      </div>
    </>
  );
}

export default ListPage;
