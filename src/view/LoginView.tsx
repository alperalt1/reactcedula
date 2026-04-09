import { Button, Card, Checkbox, Flex, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import type { LoginInterface } from '../interfaces/authInterface';
import { login } from '../services/AuthService';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router';

const LoginView = () => {
  const navigate = useNavigate();
  const loginStorage = useAuthStore((state) => state.loginStore);

  const onFinish = async (values: LoginInterface) => {
    console.log('Received values of form: ', values);
    try {
      const response = await login({ email: values.email, password: values.password });
      if (response.status == 'success') {
        console.log('Token:', response.data.access_token);
        loginStorage({
          user: response.data.user,
          access_token: response.data.access_token
        });
        navigate('/home',{ replace: true })
      } else {
        console.error('Error en login:', response.message);
      }
    } catch (error) {
      console.error('Error de red o servidor:', error);
    }
  };


  return (

    <Card style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <Form
        name="login"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item<LoginInterface>
          name="email"
          label="Correo Electrónico"
          rules={[{ required: true, type: 'email', message: '¡Ingresa un correo válido!' }]}
        >
          <Input size="large" prefix={<UserOutlined />} placeholder="ejemplo@correo.com" />
        </Form.Item>

        <Form.Item<LoginInterface>
          name="password"
          label="Contraseña"
          rules={[{ required: true, message: '¡Por favor ingresa tu contraseña!' }]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Tu contraseña" />
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Recordarme</Checkbox>
            </Form.Item>
            {/* <a href="">¿Olvidó su contraseña?</a> */}
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button size="large" block type="primary" htmlType="submit">
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </Card>


  )
}

export default LoginView