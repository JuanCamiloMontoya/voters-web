import { Alert, Descriptions, Divider, List, Row, Spin, Typography } from "antd"
import useVoterDetail from "./controllers"
import { ArrowLeftOutlined } from "@ant-design/icons"

const { Item } = Descriptions
const { Title } = Typography

const itemProps = {
  labelStyle: { fontWeight: 'bold', color: 'black' }
}

const VoterDetail = () => {

  const {
    voter,
    error,
    status,
    onCloseErrorAlert,
    goToVoters
  } = useVoterDetail()

  return (
    <div className='voters'>
      <Title level={3}>
        <ArrowLeftOutlined onClick={goToVoters} />
        <Divider type='vertical' />
        Detalle de votante
      </Title>
      {status.getVoterDetail === "loading" && (
        <Row className='center-element'><Spin /></Row>
      )}
      {status.getVoterDetail === 'error' && (
        <Alert
          message={error.getVoterDetail}
          type='error'
          showIcon
          closable
          onClose={onCloseErrorAlert}
        />
      )}
      <Descriptions bordered size="small" layout="vertical">
        <Item {...itemProps} label="Nombre(s)">{voter?.firstname}</Item>
        <Item {...itemProps} label="Apellidos">{voter?.lastname}</Item>
        <Item {...itemProps} label="N° Documento">{voter?.document}</Item>
        <Item {...itemProps} label="N° Teléfono">{voter?.phone}</Item>
        <Item {...itemProps} label="Correo">{voter?.email}</Item>
        <Item {...itemProps} label="Fecha de nacimiento">{voter?.birthdate}</Item>
        <Item
          {...itemProps}
          label={voter?.subdivision?.type === 'neighborhood' ? 'Barrio' : 'Vereda'}
        >
          {voter?.subdivision?.name}
        </Item>
        <Item
          {...itemProps}
          label={voter?.subdivision?.division.type === 'commune' ? 'Comuna' : 'Corregimiento'}
        >
          {voter?.subdivision?.division?.name}
        </Item>
        <Item {...itemProps} label="Ocupaciones" contentStyle={{ display: 'block' }}>
          <List
            size="small"
            dataSource={voter?.occupations}
            renderItem={({ name }) => <List.Item>{name}</List.Item>}
          />
        </Item>
        <Item {...itemProps} label="Hobbies" contentStyle={{ display: 'block' }}>
          <List
            size="small"
            dataSource={voter?.hobbies}
            renderItem={({ name }) => <List.Item>{name}</List.Item>}
          />
        </Item>
      </Descriptions>
    </div>
  )
}

export default VoterDetail