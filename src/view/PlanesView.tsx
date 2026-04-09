import { useEffect, useState } from 'react';
import { Card, Col, Row, Button, List, Typography, Spin, message, Modal } from 'antd';
import { CheckOutlined, CreditCardOutlined, SyncOutlined } from '@ant-design/icons';
import type { PlanesResponse } from "../interfaces/planesInterface";
import { comprar, planes, verificarPago } from '../services/PlanesService';

const { Title, Text } = Typography;

const PlanesView = () => {
  const [data, setData] = useState<PlanesResponse[]>([]);
  const [comprandoId, setComprandoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const [verificando, setVerificando] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [currentTransactionId, setCurrentTransactionId] = useState<string | null>(null);

  useEffect(() => {
    const getPlanes = async () => {
      try {
        const response = await planes();
        if (response.status === 'success') {
          setData(response.data);
        }
      } catch (error) {
        message.error("Error al cargar los planes");
      } finally {
        setLoading(false);
      }
    };
    getPlanes();
  }, []);

  const handleComprar = async (plan_id: number) => {
    setComprandoId(plan_id);
    try {
      const response = await comprar(plan_id);
      if (response.status === 'success' && response.data.redirectUrl) {
        setPaymentUrl(response.data.redirectUrl);
        setCurrentTransactionId(response.data.transactionId);
        setIsModalVisible(true);
      }
    } catch (error) {
      message.error("Error al generar la orden de pago");
    } finally {
      setComprandoId(null);
    }
  };

  const handleVerificarPago = async () => {
    if (!currentTransactionId) return;

    setVerificando(true);
    try {
      const response = await verificarPago(currentTransactionId);
      if (response.status === 'success') {
        message.success("¡Pago confirmado! Tus consultas han sido acreditadas.");
        setIsModalVisible(false);
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "El pago aún no ha sido aprobado.";
      message.warning(msg);
    } finally {
      setVerificando(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>Nuestros Planes</Title>
      <Row gutter={[16, 16]} justify="center">
        {data.map((plan) => {
          const isBasico = plan.name.toLowerCase() === 'básico' || parseFloat(plan.price) === 0;

          return (
            <Col xs={24} sm={12} md={8} key={plan.id}>
              <Card
                hoverable
                title={plan.name}
                extra={plan.id === 2 ? <Text type="danger">Popular</Text> : null}
                style={{
                  textAlign: 'center',
                  borderColor: plan.id === 2 ? '#1890ff' : '#f0f0f0',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ flex: 1 }}>
                  <Title level={3}>${plan.price}<small>/mes</small></Title>
                  <List
                    dataSource={[`${plan.limit_consultas} Consultas`]}
                    renderItem={(item) => (
                      <List.Item style={{ border: 'none', justifyContent: 'center' }}>
                        <CheckOutlined style={{ color: '#52c41a', marginRight: 8 }} /> {item}
                      </List.Item>
                    )}
                  />
                </div>
                {!isBasico ? (
                  <Button
                    type={plan.id === 2 ? 'primary' : 'default'}
                    block
                    size="large"
                    style={{ marginTop: 20 }}
                    loading={comprandoId === plan.id}
                    onClick={() => handleComprar(plan.id)}
                  >
                    Comprar Plan
                  </Button>
                ) : (
                  <div style={{ marginTop: 20, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text type="secondary" italic>Plan incluido por defecto</Text>
                  </div>
                )}
              </Card>
            </Col>
          );
        })}
      </Row>
      <Modal
        title="Finalizar Compra"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Title level={4}>Tu orden ha sido generada</Title>
          <Text>Haz clic en el botón de abajo para completar el pago de forma segura en Payphone.</Text>

          <Button
            type="primary"
            size="large"
            block
            icon={<CreditCardOutlined />}
            href={paymentUrl || '#'}
            target="_blank"
            onClick={() => setIsModalVisible(true)} 
            style={{ marginTop: 25, backgroundColor: '#52c41a', borderColor: '#52c41a' }}
          >
            Pagar con Payphone
          </Button>

          <div style={{ marginTop: 20 }}>
            <Text type="secondary">¿Ya realizaste el pago?</Text>
            <Button
              type="link"
              icon={<SyncOutlined spin={verificando} />}
              onClick={handleVerificarPago}
              loading={verificando}
              block
              style={{ marginTop: 10 }}
            >
              Verificar mi suscripción ahora
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PlanesView;