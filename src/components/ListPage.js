import styles from '../styles/listpage.module.scss';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { endpoint, axiosOption } from "../config";
import Pagenation from './Pagenation';

function ListPage() {
  const [blogList, changeBlogList] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const itemCountPerPage = 4;
  const apiurl = endpoint + '?fields=id,title,date,category,description,taglist';

  const currentPageIndex = !params.pageid ? 1 : Number(params.pageid);

  useEffect(() => {
    axios.get(apiurl, axiosOption).then(res => {
      changeBlogList(res.data.contents);
    })
  }, []);

  const categoryFilterdList = (list) => {
    const _newList = !params.categoryid ? list : list.filter(item => item.category.find(_item => _item === params.categoryid));
    return _newList;
  }
  const renderList = (list) => {
    const _currentPageIndex = !params.pageid ? 1 : params.pageid;
    const itemRangeMin = (_currentPageIndex - 1) * itemCountPerPage;
    const itemRangeMax = _currentPageIndex * itemCountPerPage - 1;
    return categoryFilterdList(list).filter((item, i) => (i >= itemRangeMin && i <= itemRangeMax));
  }
  const handleNavigate = (pageid) => () => {
    const url = (params.categoryId ? '/category/' + params.categoryId : '') +'/page/' + pageid + '/';
    navigate(url);
  }
  const itemCount = (list) => {
    return list.length || 0;
  }

  return (
    <>
      <div className={styles.content}>
        {params.categoryid ? <h2>{params.categoryid}</h2> : ''}
        <p>全{itemCount(categoryFilterdList(blogList))}件</p>

        <ul className={styles.list}>
        {renderList(blogList).map((item, i) => (
          <li
          className={styles.list__item}
          key={i}
          >
          <Link to={`/post/${item.id}`}>
            <p className={styles.ttl}>{item.title}</p>
            <CategoryTag category={item.category} />
          </Link>
          </li>
        ))}
        </ul>

        <Pagenation
          itemCount={itemCount(categoryFilterdList(blogList))}
          itemCountPerPage={itemCountPerPage}
          currentIndex={currentPageIndex}
          onClick={handleNavigate}
        />
      </div>
    </>
  );
}

function CategoryTag(props) {
  const { category } = props;
  return (
    <ul className={styles.category}>
      {category.map((elm, j) => (
        <li
          className={styles.category__item}
          key={j}
        >{elm}</li>
      ))}
    </ul>
  )
}

export default ListPage;
