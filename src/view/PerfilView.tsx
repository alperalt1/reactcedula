import { Card, Col, Row, Avatar, Tag, Divider, Typography, Flex } from 'antd';
import { CheckCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useAuthStore } from '../store/useAuthStore';

const { Title, Text } = Typography;

const PerfilView = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Flex 
            justify="space-between" 
            align="center" 
            wrap="wrap" 
            gap="middle"
          >
            <Flex align="center" gap={20}>
              <Avatar
                size={64}
                icon={<UserOutlined />}
                style={{ backgroundColor: '#1890ff', flexShrink: 0 }}
              />
              <div>
                <Title level={2} style={{ margin: 0, fontSize: 'clamp(1.2rem, 5vw, 2rem)' }}>
                  Perfil de Usuario
                </Title>
                <Text type="secondary">Gestiona tus datos personales</Text>
              </div>
            </Flex>
            
            <Tag
              color="blue"
              icon={<CheckCircleOutlined />}
              style={{ 
                padding: '5px 15px', 
                fontSize: '14px',
                margin: '10px 0' 
              }}
            >
              CUENTA VERIFICADA
            </Tag>
          </Flex>
          <Divider />
        </Col>

        <Col xs={24} md={12}>
          <Card bordered={false} hoverable>
            <Flex vertical>
              <Text type="secondary">Nombre Completo</Text>
              <Flex align="center" gap={10} style={{ marginTop: 8 }}>
                <UserOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
                <Text strong style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', wordBreak: 'break-word' }}>
                  {user?.name || 'No definido'}
                </Text>
              </Flex>
            </Flex>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card bordered={false} hoverable>
            <Flex vertical>
              <Text type="secondary">Correo Electrónico</Text>
              <Flex align="center" gap={10} style={{ marginTop: 8 }}>
                <MailOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
                <Text strong style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', wordBreak: 'break-all' }}>
                  {user?.email || 'No definido'}
                </Text>
              </Flex>
            </Flex>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PerfilView;