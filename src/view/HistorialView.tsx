import { useEffect, useState } from 'react';
import { Col, Row, Avatar, Tag, Divider, Typography, Flex, Table, message, Card, Button } from 'antd';
import { CheckCircleOutlined, UserOutlined, HistoryOutlined, SyncOutlined } from '@ant-design/icons';
import { useAuthStore } from '../store/useAuthStore';
import { historialPago, verificarPago } from '../services/PlanesService';
import type { HistorialPago } from '../interfaces/planesInterface';

const { Title, Text } = Typography;

const HistorialView = () => {
  const user = useAuthStore((state) => state.user);
  const [pagos, setPagos] = useState<HistorialPago[]>([]);
  const [loading, setLoading] = useState(true);
  const [verificandoId, setVerificandoId] = useState<string | null>(null);

  useEffect(() => {
    const cargarPagos = async () => {
      try {
        const response = await historialPago();
        if (response.status === 'success') {
          setPagos(response.data);
        }
      } catch (error) {
        message.error("No se pudo cargar el historial de pagos");
      } finally {
        setLoading(false);
      }
    };
    cargarPagos();
  }, []);

  const handleVerificarDesdeTabla = async (transactionId: string) => {
    setVerificandoId(transactionId); // Activamos carga para esa fila específica

    try {
      const response = await verificarPago(transactionId);

      if (response.status === 'success') {
        message.success("¡Pago verificado exitosamente!");
        const resActualizada = await historialPago();
        setPagos(resActualizada.data);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "El pago aún no ha sido procesado.";
      message.warning(errorMsg);
    } finally {
      setVerificandoId(null);
    }
  };

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'created_at',
      key: 'fecha',
      render: (fecha: string) => new Date(fecha).toLocaleDateString('es-EC'),
    },
    {
      title: 'Plan',
      key: 'plan',
      render: (_: any, record: HistorialPago) => record.plan.name,
    },
    {
      title: 'Monto',
      dataIndex: 'monto',
      key: 'monto',
      render: (monto: string) => <Text strong>${parseFloat(monto).toFixed(2)}</Text>,
    },
    {
      title: 'Referencia',
      dataIndex: 'referencia_pago',
      key: 'referencia',
      responsive: ['md'] as any,
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado: string) => (
        <Tag color={estado === 'completado' ? 'green' : 'orange'}>
          {estado.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Acción',
      key: 'accion',
      render: (_: any, record: HistorialPago) => (
        record.estado === 'pendiente' ? (
          <Button
            type="primary"
            size="small"
            ghost
            icon={<SyncOutlined spin={verificandoId === record.referencia_pago} />}
            loading={verificandoId === record.referencia_pago}
            onClick={() => handleVerificarDesdeTabla(record.referencia_pago)}
          >
            Verificar
          </Button>
        ) : (
          <Tag color="blue" >Pago Listo</Tag>
        )
      ),
    }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Row gutter={[16, 16]}>
        {/* Header del Perfil */}
        <Col span={24}>
          <Flex justify="space-between" align="center" wrap="wrap" gap="middle">
            <Flex align="center" gap={20}>
              <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
              <div>
                <Title level={2} style={{ margin: 0 }}>{user?.name || 'Usuario'}</Title>
                <Text type="secondary">{user?.email}</Text>
              </div>
            </Flex>
            <Tag color="blue" icon={<CheckCircleOutlined />}>CUENTA VERIFICADA</Tag>
          </Flex>
          <Divider />
        </Col>

        <Col span={24}>
          <Card
            title={<><HistoryOutlined /> Historial de Pagos</>}
            bordered={false}
            className="shadow-sm"
          >
            <Table
              columns={columns}
              dataSource={pagos}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 5 }}
              scroll={{ x: true }} // Permite scroll horizontal en móviles
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HistorialView;