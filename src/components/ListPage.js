import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { endpoint, axiosOption } from '../config';
import styles from '../styles/listpage.module.scss';
import Pagenation from './Pagenation';

function ListPage() {
  const [blogList, changeBlogList] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const itemCountPerPage = 4;
  const apiurl = `${endpoint}?fields=id,title,date,category,description,taglist,thumnail`;

  const currentPageIndex = !params.pageid ? 1 : Number(params.pageid);
  // const date = '2022-04'

  useEffect(() => {
    axios.get(apiurl, axiosOption).then((res) => {
      // console.log(res.data.contents)
      changeBlogList(res.data.contents);
    });
  }, [apiurl]);

  const categoryFilterdList = (list) => {
    // eslint-disable-next-line no-underscore-dangle
    let _newList = [];
    if (params.categoryid) {
      _newList = list.filter((item) =>
        item.category.find((_item) => _item === params.categoryid),
      );
    } else if (params.date) {
      _newList = list.filter((item) => {
        return item.date.indexOf(params.date) === 0;
      });
    } else {
      _newList = list;
    }
    return _newList;
  };
  const dateFilterdList = (list) => {
    const { date } = params;
    const _newList = list.filter((item) => item.date.indexOf(date) === 0);
    return _newList;
  };
  const filterList = (list) => {
    if (params.categoryid) return categoryFilterdList(list);
    if (params.date) return dateFilterdList(list);
    return list;
  };
  const renderList = (list) => {
    const _currentPageIndex = !params.pageid ? 1 : params.pageid;
    const itemRangeMin = (_currentPageIndex - 1) * itemCountPerPage;
    const itemRangeMax = _currentPageIndex * itemCountPerPage - 1;
    const _newList = filterList(list).filter(
      (item, i) => i >= itemRangeMin && i <= itemRangeMax,
    );
    return _newList;
  };
  const handleNavigate = (pageid) => () => {
    const url =
      (params.categoryid ? `/category/${params.categoryid}` : '') +
      (params.date ? `/date/${params.date}` : '') +
      '/page/' +
      pageid +
      '/';
    navigate(url);
  };
  const itemCount = (list) => {
    return list.length || 0;
  };

  return (
    <div className={styles.content}>
      {params.categoryid ? <h2>{params.categoryid}</h2> : ''}
      {params.date ? <h2>{params.date}</h2> : ''}
      <p>全{itemCount(categoryFilterdList(blogList))}件</p>

      <ul className={styles.list}>
        {renderList(blogList).map((item) => (
          <li className={styles.listItem} key={item.id}>
            <Link to={`/post/${item.id}`}>
              <div className={styles.listItem__wrap}>
                <div className={styles.listItem__imgarea}>
                  <img
                    src={item.thumnail.url}
                    alt=""
                    width={item.thumnail.width}
                    height={item.thumnail.height}
                  />
                </div>
                <div className={styles.listItem__txtarea}>
                  <div className={styles.listItem__txtarea__head}>
                    <ul className={styles.category}>
                      {item.category.map((elm) => (
                        <li className={styles.categoryItem} key={item.id}>
                          {elm}
                        </li>
                      ))}
                    </ul>
                    <p className={styles.listItem__ttl}>{item.title}</p>
                  </div>
                  <p className={styles.listItem__description}>
                    {item.description}
                  </p>
                  {/* <div className={styles.listItem__txtarea__foot}>
                  <ul className={styles.taglist}>
                    {item.taglist.map((elm, k) => (
                      <li className={styles.categoryItem} key={k}>{elm}</li>
                    ))}
                  </ul>
                </div> */}
                </div>
              </div>
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
  );
}

export default ListPage;
