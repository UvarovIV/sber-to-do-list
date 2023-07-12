import React from 'react';
import { Layout, Avatar, Typography } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

const ArchivePage = () => {


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#fff', padding: '16px', textAlign: 'center' }}>
                <Title level={3}>Archive</Title>

            </Header>
            <Content style={{ margin: '16px' }}>
                {}
            </Content>
        </Layout>
    );
};

export default ArchivePage;