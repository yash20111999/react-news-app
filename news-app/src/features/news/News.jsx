import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Image, Row, Col, Spin, Pagination} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import './News.css';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const News = ({handlePageChange}) => {
  const { data, status, totalResults, activePage } = useSelector(state => state.news);
  
  console.log(data, status, activePage)

  if (status === 'loading') {
    return (
      <Row justify="center" style={{height: '70vh'}}>
        <Spin indicator={antIcon} />
      </Row>
    );
  } else if (status === 'success') {
    return (
      <div className='news-container'>
        <Row gutter={12}>
          <Col span={24}>
            <Card.Grid gutter={16}>
              {data?.map((elem, index) => (
                <>
                  <br/>
                <Card
                  href={elem.url}
                  key={index}
                  hoverable
                  cover={
                    <Image
                      src={
                        elem.urlToImage && elem.urlToImage.substr(0, 4) === 'http'
                          ? elem.urlToImage
                          : 'https://pooreboysingray.files.wordpress.com/2014/11/mobile-tribune-18640001.jpg'
                      }
                    />
                  }
                >
                  <Card.Meta
                    title={elem.title}
                    description={elem.description}
                    style={{ textAlign: 'justify'}}
                  />
                  <Card.Meta
                      title={
                        <a href={elem.url}>{elem.author}</a>
                      }
                    description={
                      <div>
                        <div style={{ float: 'left' }}>{elem.source.name}</div>
                        <div style={{ float: 'right' }}>{`${moment(elem.publishedAt).format('DD/MM/YYYY')} ${moment(elem.publishedAt).format('HH:mm:ss')}`}</div>
                      </div>
                    }
                    style={{ textAlign: 'right' }}
                  />
                  </Card>
                  </>
              ))}
            </Card.Grid>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Pagination
              className='pagination-container'
              current={activePage}
              showSizeChanger={false}
              total={totalResults}
              onChange={handlePageChange}
            />
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      null
    );
  }
};

export default News;
