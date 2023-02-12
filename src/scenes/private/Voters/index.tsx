import { DeleteOutlined, EyeFilled, PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Row, Spin, Table, Typography } from 'antd'
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
    onDeleteVoter
  } = useVoters()

  const columns: ColumnsType<Voter> = [
    { title: <Text strong>Nombre</Text>, dataIndex: 'firstname', key: 'firstname' },
    { title: <Text strong>Apellido</Text>, dataIndex: 'lastname', key: 'lastname' },
    { title: <Text strong>N° Documento</Text>, dataIndex: 'document', key: 'document' },
    { title: <Text strong>N° Telefono</Text>, dataIndex: 'phone', key: 'phone' },
    { title: <Text strong>Correo</Text>, dataIndex: 'email', key: 'email' },
    {
      title: <Text strong>Acción</Text>,
      key: 'action',
      render: (_, record) => (
        <div style={{ width: 81 }}>
          <Button
            type="primary"
            shape="circle"
            icon={<EyeFilled />}
            onClick={() => onShowVoter(record.id)}
          />
          <Divider type='vertical' />
          <Button
            type="primary"
            danger shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => onDeleteVoter(record.id)}
          />
        </div>
      )
    }
  ]

  return (
    <div className='voters'>
      <Row>
        <Title level={2} style={{ flexGrow: 1 }}>Personas</Title>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={onCreateVoter}
        />
      </Row>
      {status.getAllVoters === "loading" && <Row className='center-element'><Spin /></Row>}
      <Table
        dataSource={voters.data.map(voter => ({ ...voter, key: voter.id }))}
        columns={columns}
        scroll={{ x: 600 }}
      />
    </div>
  )
}

export default Voters