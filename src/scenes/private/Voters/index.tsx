import { DeleteOutlined, EditFilled, EyeFilled, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Divider,
  Popconfirm,
  Row,
  Table,
  Typography,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Voter } from '../../../services/voters/voters.models'
import useVoters from './controllers'

const { Title, Text } = Typography

const Voters = () => {
  const {
    status,
    voters,
    onCreateVoter,
    onShowVoter,
    onDeleteVoter,
    onUpdateVoter,
    onPageChange
  } = useVoters()

  const columns: ColumnsType<Voter> = [
    {
      title: <Text strong>Nombre</Text>,
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: <Text strong>Apellido</Text>,
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: <Text strong>N° Documento</Text>,
      dataIndex: 'document',
      key: 'document',
    },
    {
      title: <Text strong>N° Telefono</Text>,
      dataIndex: 'phone',
      key: 'phone',
    },
    { title: <Text strong>Correo</Text>, dataIndex: 'email', key: 'email' },
    {
      title: <Text strong>Acción</Text>,
      key: 'action',
      render: (_, record) => (
        <div style={{ width: 140 }}>
          <Button
            type='primary'
            shape='circle'
            icon={<EyeFilled />}
            onClick={() => onShowVoter(record.id)}
          />
          <Divider type='vertical' />
          <Button
            type='primary'
            shape='circle'
            icon={<EditFilled />}
            onClick={() => onUpdateVoter(record.id)}
          />
          <Divider type='vertical' />
          <Popconfirm
            title='Eliminar votante'
            description={`Está seguro de eliminar a ${record.firstname} ${record.lastname}?`}
            onConfirm={() => onDeleteVoter(record.id)}
            okText='Sí'
            cancelText='Cancelar'
            placement='topRight'
          >
            <Button
              type='primary'
              danger
              shape='circle'
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <div className='voters'>
      <Row>
        <Title level={2} style={{ flexGrow: 1 }}>
          Votantes
        </Title>
        <Button
          type='primary'
          shape='circle'
          icon={<PlusOutlined />}
          onClick={onCreateVoter}
        />
      </Row>
      <Table
        dataSource={voters.data.map((voter) => ({ ...voter, key: voter.id }))}
        columns={columns}
        scroll={{ x: 600 }}
        loading={status.getAllVoters === 'loading' || status.deleteVoter === 'loading'}
        onChange={onPageChange}
        pagination={{
          pageSize: voters.meta.pageSize,
          total: voters.meta.total,
          current: voters.meta.current,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 50],
          locale: { items_per_page: '/ Página' }
        }}
      />
    </div>
  )
}

export default Voters