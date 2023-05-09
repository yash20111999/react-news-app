import React from 'react';
import { Row, Col, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import './Footer.css';

const { Text, Title } = Typography;

const Footer = () => {
  return (
    <Row justify="center" className="footer-container">
      <Col xs={24} sm={12}>
        <Row justify="center">
          <Title style={{ color: 'white' }} level={3} className="footer-title">
            Powered By NewsAPI
          </Title>
        </Row>
        <Row justify="center">
          <Text style={{ color: 'white' }} type="secondary" className="footer-text">
            © 2023 Yash Maheshwari. All rights reserved.
          </Text>
        </Row>
      </Col>
      <Col xs={24} sm={12}>
        <Row justify="center">
          <Title style={{ color: 'white' }} level={3} className="footer-title">
            Developed By
          </Title>
        </Row>
        <Row justify="center" align="middle">
          <Col>
            <a href="https://github.com/yash20111999">
              <GithubOutlined className="footer-icon" />
            </a>
          </Col>
          <Col  style={{ marginLeft: 10 }}>
            <Text style={{ color: 'white' }} type="secondary">Yash Maheshwari</Text>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Footer;
