import { ArrowLeftOutlined, CheckCircleTwoTone } from '@ant-design/icons'
import { Alert, Button, Col, Divider, Form, Modal, Row, Typography } from 'antd'
import dayjs from 'dayjs'
import { colors, columnSizes } from '../../../../common/antd/theme'
import DatePicker from '../../../_components/DatePicker'
import Select from '../../../_components/Select'
import TextInput from '../../../_components/TextInput'
import useUpdateVoter from './controllers'

const { Title } = Typography
const today = dayjs()

const UpdateVoter = () => {

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
    voter,
    isDirty,
    genders,
    handleSubmit,
    onFinish,
    onSearchSubdivision,
    onCloseErrorAlert,
    goBack,
    goToVoters
  } = useUpdateVoter()

  const onSuccess = () => {
    Modal.confirm({
      title: 'Actualización exitosa!',
      content: 'El votante a sido actualizado correctamente',
      okText: 'Ver lista de votantes',
      cancelText: 'Cerrar',
      onOk: goToVoters,
      icon: <CheckCircleTwoTone twoToneColor={colors.succesIconColor} />
    })
  }

  return (
    <div className='update-voter'>
      <Title level={3}>
        <ArrowLeftOutlined onClick={goBack} />
        <Divider type='vertical' />
        Actualizar votante
      </Title>
      {votersStatus.updateVoter === 'error' && (
        <Alert
          message={votersError.updateVoter}
          type='error'
          showIcon
          closable
          onClose={onCloseErrorAlert}
        />
      )}
      {voter && (
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={handleSubmit((values) => onFinish(values, onSuccess))}
        >
          <Row gutter={10}>
            <Col {...columnSizes}>
              <TextInput
                name='document'
                control={control}
                label='N° de documento'
                placeholder='N° de documento'
                maxLength={10}
                error={undefined}
                type='number'
                defaultValue={voter.document}
                disabled
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
                defaultValue={voter.firstname}
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
                defaultValue={voter.lastname}
              />
            </Col>
            <Col {...columnSizes}>
              <TextInput
                name='phone'
                control={control}
                label='N° de teléfono'
                placeholder='N° de teléfono'
                maxLength={10}
                type='number'
                error={errors.phone}
                defaultValue={voter.phone}
              />
            </Col>
            <Col {...columnSizes}>
              <TextInput
                name='email'
                control={control}
                label='Correo'
                placeholder='Dirección de correo'
                maxLength={50}
                required={false}
                type='email'
                error={errors.email}
                defaultValue={voter?.email}
              />
            </Col>
            <Col {...columnSizes}>
              <DatePicker
                name='birthdate'
                control={control}
                label='Fecha de nacimiento'
                error={errors.birthdate}
                placeholder='Fecha de nacimiento'
                disabledDate={(date) => date.isAfter(today.subtract(18, 'years'))}
                required={false}
                defaultPickerValue={voter.birthdate ? dayjs(voter.birthdate) : today.subtract(18, 'year')}
                defaultValue={voter.birthdate ? dayjs(voter.birthdate) : undefined}
              />
            </Col>
            <Col {...columnSizes}>
              <Select
                name='gender'
                control={control}
                label='Género'
                placeholder='Género'
                error={errors.gender}
                required={false}
                options={genders}
                allowClear
                defaultValue={voter.gender}
              />
            </Col>
            <Col {...columnSizes}>
              <Select
                name='subdivision'
                control={control}
                label='Vereda/Barrio'
                placeholder='Vereda/Barrio'
                error={errors.subdivision}
                required={false}
                options={fullSubdivisions}
                showSearch
                onSearch={onSearchSubdivision}
                loading={generalStatus.getFullSubdivisions === 'loading'}
                allowClear
                defaultValue={voter.subdivision && `${voter.subdivision.name} - ${voter.subdivision.division.name}`}
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
                mode='multiple'
                allowClear
                defaultValue={voter.occupations.map(({ id }) => (id))}
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
                mode='multiple'
                allowClear
                defaultValue={voter.hobbies.map(({ id }) => (id))}
              />
            </Col>
          </Row>
          <div className='center-element'>
            <Button
              htmlType='submit'
              loading={votersStatus.updateVoter === 'loading'}
              disabled={!isValid || !isDirty}
              type='primary'
            >
              Actualizar votante
            </Button>
          </div>
        </Form>
      )}
    </div>
  )
}

export default UpdateVoter