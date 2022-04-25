import styles from '../styles/listpage.module.scss';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { endpoint, apikey } from "../config";

function ListPage() {
  const [blogList, changeBlogList] = useState([]);
  const [pageCount, changePageCount] = useState(0);
  const params = useParams();
  const itemCountPerPage = 3;
  const page = params.pageid || '1';
  const categoryid = params.categoryid || null;

  //API endpoint query setting
  const query = {
    fields: 'id,title,date,category,description,taglist',
    filters: categoryid ? '&filters=category[contains]' + categoryid : '',
    limit: itemCountPerPage,
    offset: (page-1)*itemCountPerPage
  }
  const setApiUrl = () => {
    let url = endpoint;
    Object.keys(query).forEach((key, idx) => {
      url += idx === 0 ? '?' + key + '=' + query[key] : '&' + key + '=' + query[key];
    })
    return url;
  }
  
  // paramsが更新されたらAjaxでデータ取得する
  useEffect(() => {
    axios.get(setApiUrl(), {
      headers: {
        'X-MICROCMS-API-KEY': apikey
      }
    }).then(res => {
      console.log(res.data.totalCount);
      let itemCount = res.data.totalCount;
      let _pageCount = itemCount / itemCountPerPage;
      changePageCount(_pageCount);
      changeBlogList(res.data.contents);
    })
  }, [params]);

  return (
    <>
      <div className={styles.content}>
        {categoryid ? <h2>{categoryid}</h2> : ''}
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
        <hr/>
        <ul>
          {page > 1 ?  <Link to={`/page/${Number(page) - 1}`}><li>prev({Number(page) - 1})</li></Link>: ''}
          <li>現在のページ({Number(page)})</li>
          {page < pageCount ? <Link to={`/page/${Number(page) + 1}`}><li>next({Number(page) + 1})</li></Link> : ''}
        </ul>
      </div>
    </>
  );
}

export default ListPage;
