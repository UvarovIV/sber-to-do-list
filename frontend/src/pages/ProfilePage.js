import React from 'react';
import { Layout, Avatar, Typography } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

const ProfilePage = () => {
    const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#fff', padding: '16px', textAlign: 'center' }}>
                <Avatar size={64} src={user.avatarUrl} />
                <Title level={3}>{user.name}</Title>
                <Title level={4}>{user.email}</Title>
            </Header>
            <Content style={{ margin: '16px' }}>
                {/* Здесь вы можете разместить дополнительное содержимое для страницы профиля */}
            </Content>
        </Layout>
    );
};

export default ProfilePage;