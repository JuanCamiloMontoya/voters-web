const useTextInput = () => {

  const validateLength = (e: React.KeyboardEvent, value: string, maxLength: number) => {
    if (value.length >= maxLength && e.key.match(/^[0-9]*$/))
      e.preventDefault()
  }

  return {
    validateLength
  }
}

export default useTextInput