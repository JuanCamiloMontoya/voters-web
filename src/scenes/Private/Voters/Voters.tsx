import { DeleteOutlined, EyeFilled, EyeOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Divider, Row, Spin, Table, Tooltip, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React, { useEffect } from 'react'
import { useVotersSelectors } from '../../../services/Voters/VotersSelectors'
import { votersActions } from '../../../services/Voters/VotersSlice'
import { useAppDispatch } from '../../../store/Store'

const { Title } = Typography

interface DataType {
  key: string
  firstname: string
  lastname: string
  document: string
  phone: string
  email: string
}

const Voters: React.FC = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(votersActions.getAll({}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { voters, status } = useVotersSelectors()

  const columns: ColumnsType<DataType> = [
    { title: <h2>Nombre</h2>, dataIndex: 'firstname', key: 'firstname' },
    { title: <h2>Apellido</h2>, dataIndex: 'lastname', key: 'lastname' },
    { title: <h2>N° Documento</h2>, dataIndex: 'document', key: 'document' },
    { title: <h2>N° Telefono</h2>, dataIndex: 'phone', key: 'phone' },
    { title: <h2>Correo</h2>, dataIndex: 'email', key: 'email' },
    {
      title: <h2>Acción</h2>,
      key: 'action',
      render: (_, record) => (
        <div style={{ width: 81 }}>
          <Button type="primary" shape="circle" icon={<EyeFilled />} />
          <Divider type='vertical' />
          <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
        </div>
      ),
    },
  ]

  return (
    <div className='voters'>
      <Breadcrumb>
        <Breadcrumb.Item><HomeOutlined /></Breadcrumb.Item>
        <Breadcrumb.Item>Lista de votantes</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Title level={2} style={{ flexGrow: 1 }}>Votantes</Title>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
        />
      </Row>
      {status.getAll === "loading" && <Spin />}
      <Table
        dataSource={voters.data.map(voter => ({ ...voter, key: voter.id }))}
        columns={columns}
        scroll={{ x: 600 }}
      />
    </div>
  )
}

export default Voters