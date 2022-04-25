import styles from '../styles/singlepage.module.scss';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { endpoint, apikey } from "../config";


function SinglePage() {
  const [blogData, changeBlogData] = useState([]);
  const params = useParams();

  

  // 初回レンダリング時にAjaxでデータ取得する
  useEffect(() => {
    // console.log(endpoint + '/' + params.id);
    const apiurl = endpoint + '/' + params.id;
    axios.get(apiurl, {
      headers: {
        'X-MICROCMS-API-KEY': apikey
      }
    }).then(res => {
      changeBlogData(res.data);
      createMarkup(blogData.contents)
      console.log(res.data);
    })
  }, [])

  function createMarkup(str) {
    return {__html: str};
  }

  return (
    <div className={styles.content}>
      <h2 className={styles.ttl}>{blogData.title}</h2>
      <div
      className={styles.contentInr}
      dangerouslySetInnerHTML={{
        __html: blogData.content
      }}
    />
    </div>
  );
}

export default SinglePage;
