import React from 'react';
import { Layout, Avatar, Typography } from 'antd';
import {useSelector} from "react-redux";

const { Header, Content } = Layout;
const { Title } = Typography;

const ProfilePage = () => {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const user = {
        name: 'Test',
        email: 'test@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
    };

    return (<>
        {isLoggedIn ? (<Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#fff', padding: '16px', textAlign: 'center' }}>
                <Avatar size={64}/>
                <Title level={3}>{user.name}</Title>
                <Title level={4}>{user.email}</Title>
            </Header>
            <Content style={{ margin: '16px' }}>

            </Content>
        </Layout>) :
            (<div style={{textAlign: "center", fontSize: 30, marginTop: 30}}>
                Пожалуйста войдите или зарегистрируйтесь
            </div>)}
        </>
    );
};

export default ProfilePage;