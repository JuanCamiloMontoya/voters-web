import { CheckCircleTwoTone } from "@ant-design/icons"
import { Alert, Button, Col, Form, Modal, Row, Typography } from "antd"
import dayjs from "dayjs"
import { colors, columnSizes } from "../../../../common/antd/theme"
import DatePicker from "../../../_components/DatePicker"
import Select from "../../../_components/Select"
import TextInput from "../../../_components/TextInput"
import useCreateVoters from "./controllers"

const { Title } = Typography
const today = dayjs()

const CreateVoter = () => {

  const {
    votersStatus,
    votersError,
    generalStatus,
    control,
    errors,
    isValid,
    fullSubdivisions,
    occupations,
    hobbies,
    handleSubmit,
    onFinish,
    onSearchSubdivision,
    onCloseErrorAlert,
    reset,
    goToVoters
  } = useCreateVoters()

  const onSuccess = () => {
    Modal.confirm({
      title: 'Registro exitoso!',
      content: 'La persona a sido registrada correctamente',
      okText: 'Realizar nuevo registro',
      onOk: reset,
      cancelText: 'Ver lista de personas',
      onCancel: goToVoters,
      icon: <CheckCircleTwoTone twoToneColor={colors.succesIconColor} />
    })
  }

  return (
    <div className='create-voter'>
      <Title level={2}>Registrar persona</Title>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={handleSubmit((values) => onFinish(values, onSuccess))}
      >
        {votersStatus.createVoter === 'error' && (
          <Alert
            message={votersError.createVoter}
            type="error"
            showIcon
            closable
            onClose={onCloseErrorAlert}
          />
        )}
        <Row gutter={10}>
          <Col {...columnSizes}>
            <TextInput
              name='document'
              control={control}
              label='N° de documento'
              placeholder='N° de documento'
              maxLength={10}
              error={errors.document}
              type='number'
            />
          </Col>
          <Col {...columnSizes}>
            <TextInput
              name='firstname'
              control={control}
              label='Nombre(s)'
              placeholder='Nombre(s)'
              maxLength={30}
              error={errors.firstname}
            />
          </Col>
          <Col {...columnSizes}>
            <TextInput
              name='lastname'
              control={control}
              label='Apellidos'
              placeholder='Apellidos'
              maxLength={30}
              error={errors.lastname}
            />
          </Col>
          <Col {...columnSizes}>
            <TextInput
              name='phone'
              control={control}
              label='N° de teléfono'
              placeholder='N° de teléfono'
              maxLength={10}
              error={errors.phone}
              type='number'
            />
          </Col>
          <Col {...columnSizes}>
            <TextInput
              name='email'
              control={control}
              label='Correo'
              placeholder='Dirección de correo'
              maxLength={50}
              error={errors.email}
              required={false}
              type='email'
            />
          </Col>
          <Col {...columnSizes}>
            <DatePicker
              name='birthdate'
              control={control}
              label='Fecha de nacimiento'
              error={errors.birthdate}
              placeholder="Fecha de nacimiento"
              disabledDate={(date) => date.isAfter(today.subtract(18, 'years'))}
              required={false}
            />
          </Col>
          <Col {...columnSizes}>
            <Select
              name='subdivisionId'
              control={control}
              label='Vereda/Barrio'
              placeholder='Vereda/Barrio'
              error={errors.subdivisionId}
              required={false}
              options={fullSubdivisions}
              showSearch
              onSearch={onSearchSubdivision}
              loading={generalStatus.getFullSubdivisions === 'loading'}
              allowClear
            />
          </Col>
          <Col {...columnSizes}>
            <Select
              name='occupations'
              control={control}
              label='Ocupación(es)'
              placeholder='Ocupación(es)'
              error={errors.occupations}
              required={false}
              options={occupations}
              showSearch={false}
              mode="multiple"
              allowClear
            />
          </Col>
          <Col {...columnSizes}>
            <Select
              name='hobbies'
              control={control}
              label='Pasatiempo(s)'
              placeholder='Pasatiempo(s)'
              error={errors.hobbies}
              required={false}
              options={hobbies}
              mode="multiple"
              allowClear
            />
          </Col>
        </Row>
        <div className='center-element'>
          <Button
            htmlType='submit'
            loading={votersStatus.createVoter === 'loading'}
            disabled={!isValid}
            type="primary"
          >
            Registrar persona
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default CreateVoter