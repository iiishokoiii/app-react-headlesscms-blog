import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/singlepage.module.scss';
import { endpoint, axiosOption } from '../config';

function SinglePage() {
  const [blogData, changeBlogData] = useState([]);
  const params = useParams();
  const apiurl = endpoint + '/' + params.postid;

  // 初回レンダリング時にAjaxでデータ取得する
  useEffect(() => {
    // console.log(endpoint + '/' + params.id);
    axios.get(apiurl, axiosOption).then((res) => {
      changeBlogData(res.data);
    });
  }, [apiurl]);

  return (
    <div className={styles.content}>
      <h2 className={styles.ttl}>{blogData.title}</h2>
      <div
        className={styles.contentInr}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: blogData.content,
        }}
      />
    </div>
  );
}

export default SinglePage;
