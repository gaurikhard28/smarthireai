import React, { useState } from 'react';
import { Menu, Dropdown, Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LogoutOutlined, SettingOutlined, UploadOutlined, DashboardOutlined, EditFilled } from '@ant-design/icons';

const NavBar = () => {
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    const profileMenu = (
        <Menu>
            <Menu.Item key="1">
                <div style={{ textAlign: 'center', padding: '10px' }}>
                    <Avatar size={64} icon={<UserOutlined />} />
                    <div style={{ marginTop: '10px' }}>
                        <strong>
                            John Doe
                            <span
                                style={{
                                    marginLeft: '8px',
                                    cursor: 'pointer',
                                    color: '#bfbfbf', // Changed to grey
                                }}
                                onClick={() => {
                                    const newName = prompt('Enter your new name:', 'John Doe');
                                    if (newName) {
                                        console.log(`Name changed to: ${newName}`);
                                        // Update the name in the state or backend as needed
                                    }
                                }}
                            >
                                <EditFilled/>
                            </span>
                        </strong>
                        <br />
                        <span>Email: john.doe@example.com</span>
                        <br />
                        <span>Resumes Uploaded: 5</span>
                    </div>
                </div>
            </Menu.Item>
        </Menu>
    );

    return (
        <div
            className="navbar"
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 20px',
                background: '#0d1a26',
                color: '#d9d9d9',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Dropdown overlay={profileMenu} trigger={['click']}>
                <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    style={{ cursor: 'pointer', backgroundColor: '#456583' }}
                    onClick={() => setShowProfilePopup(!showProfilePopup)}
                />
            </Dropdown>
            <Menu
                mode="horizontal"
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    background: 'transparent',
                    borderBottom: 'none',
                    color: '#d9d9d9',
                }}
                theme="dark"
            >
                <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                    <Link to="/dashboard" style={{ color: '#d9d9d9' }}>
                        Dashboard
                    </Link>
                </Menu.Item>
                <Menu.Item key="previous-uploads" icon={<UploadOutlined />}>
                    <Link to="/previous-uploads" style={{ color: '#d9d9d9' }}>
                        Previous Uploads
                    </Link>
                </Menu.Item>
                <Menu.Item key="settings" icon={<SettingOutlined />}>
                    <Link to="/settings" style={{ color: '#d9d9d9' }}>
                        Settings
                    </Link>
                </Menu.Item>
            </Menu>
            <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                onClick={() => {
                    localStorage.removeItem('authToken');
                    window.location.replace('/login');
                }}
                style={{
                    marginLeft: '20px',
                    backgroundColor: '#ff7875',
                    borderColor: '#ff4d4f',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    padding: '0 20px',
                    height: '40px',
                }}
            >
                Logout
            </Button>
        </div>
    );
};

export default NavBar;