
import { useSuscripcionStore } from "../store/useSuscripcionStore";
import { useEffect } from "react";
import { suscripcion } from "../services/UserService";
import { Alert, Card, Col, Descriptions, Divider, Row, Spin, Statistic, Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, WalletOutlined } from "@ant-design/icons";

const HomeView = () => {

  const information = useSuscripcionStore((state) => state.suscripcion);
  const setSuscripcion = useSuscripcionStore((state) => state.suscripcionStore);

  useEffect(() => {
    const handleSuscripcion = async () => {
      try {
        const response = await suscripcion();
        if (response.status === "success") {
          setSuscripcion(response.data);
        }
      } catch (error) {
        console.error("Error al recuperar suscripción", error);
      }
    };

    handleSuscripcion();
  }, [setSuscripcion]);

  if (!information) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Cargando suscripción..." />
      </div>
    );
  }
  return (
    <div style={{ padding: window.innerWidth < 576 ? '15px' : '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' , flexWrap: 'wrap',gap: '10px'}}>
            <h1>Panel de Suscripción</h1>
            <Tag
              color={information.is_active ? "success" : "error"}
              icon={information.is_active ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
              style={{ padding: '5px 15px', fontSize: '14px' }}
            >
              {information.is_active ? "SUSCRIPCIÓN ACTIVA" : "INACTIVA"}
            </Tag>
          </div>
          <Divider />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card bordered={false} hoverable>
            <Statistic
              title="Consultas Disponibles"
              value={information.consultas_disponibles}
              prefix={<WalletOutlined />}
              valueStyle={{ color: information.consultas_disponibles > 0 ? '#3f8600' : '#cf1322' }}
            />
          </Card>
        </Col>


        <Col span={24}>
          <Card title="Información Detallada" style={{ marginTop: '20px' }}>
            <Descriptions size="small" bordered column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
              <Descriptions.Item label="Plan Actual">{information.plan?.name}</Descriptions.Item>
              <Descriptions.Item label="Precio">${information.plan?.price}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Alerta de Consultas Agotadas */}
        {information.consultas_disponibles === 0 && (
          <Col span={24}>
            <Alert
              message="Atención"
              description="Has agotado tus consultas disponibles. Por favor, renueva tu plan para continuar consultando."
              type="warning"
              showIcon
              style={{ marginTop: '20px' }}
            />
          </Col>
        )}
      </Row>
    </div>
  )
}

export default HomeView