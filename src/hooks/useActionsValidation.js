import { ERROR_MESSAGES_FORM } from "../utils/constants/constants"
import getDataUserFromLocalStorage from "../utils/helpers/getDataUserFromLocalStorage"


function useActionsValidation({
  isRegex,
  inputParameters,
  errorsForm,
  defaultInputParameters,
  setErrorsForm,
  setInputParameters,
  setIsRegex,
}) {



  // СОХРАНИТЬ ОШИБКУ ВХОДНОГО ЗНАЧЕНИЯ
  function saveInputError(inputName) {

    setErrorsForm((prevState) => ({
      ...prevState,
      [inputName]: ERROR_MESSAGES_FORM[inputName]
    }))
  }



  // ПРОВЕРИТЬ ВАЛИДНОСТЬ ФОРМЫ АУТЕНТИФИКАЦИИ
  function checkValiditySigninForm() {

    if (!isRegex.email || !isRegex.password) {
      return false
    }

    return true
  }



  // ПРОВЕРИТЬ ВАЛИДНОСТЬ ФОРМЫ РЕГИСТРАЦИИ
  function checkValiditySignupForm() {

    if (!isRegex.name || !isRegex.email || !isRegex.password) {
      return false
    }

    return true
  }



  // ПРОВЕРИТЬ ВАЛИДНОСТЬ ФОРМЫ ПРОФИЛЯ
  function checkValidityProfileForm() {

    const { name, email } = inputParameters

    if (name.isValidInput || email.isValidInput) {
      return true
    }
  }



  // СБРОСИТЬ ЗНАЧЕНИЯ inputParameters ПО ДЕФОЛТУ
  function resetInputParametersByDefault() {
    setInputParameters(defaultInputParameters)
  }



  // СБРОСИТЬ СБРОСИТЬ ВАЛИДНОСТЬ ПОЛЕЙ ФОРМЫ
  function resetValidInputFields() {
    Object.keys(inputParameters).forEach((key) => {
      inputParameters[key].isValidInput = false
    })
  }



  // СБРОСИТЬ ОШИБКИ ПОЛЕЙ ФОРМЫ
  function resetErrorsInputFields() {
    setErrorsForm({})
  }



  // СБРОСИТЬ ФОРМУ ПО ДЕФОЛТУ
  function resetFormByDefault() {
    resetInputParametersByDefault()
    resetErrorsInputFields()
  }



  // СБРОСИТЬ ОШИБКУ ПОЛЯ ФОРМЫ
  function removeErrorInputField(inputFieldName) {
    if (errorsForm[inputFieldName]) {

      setErrorsForm((prevState) => {
        delete prevState[inputFieldName]
        return { ...prevState }
      })
    }
  }



  // СОХРАНИТЬ РЕЗУЛЬТАТ РЕГУЛЯРНОГО ВЫРАЖЕНИЯ
  function saveRegexResult(resultRegex, inputName,) {
    setIsRegex((prevState) => ({ ...prevState, [inputName]: resultRegex }))
  }



  // УСТАНОВИТЬ НАЧАЛЬНЫЕ ПАРАМЕТРЫ ДЛЯ ПОЛЕЙ ФОРМЫ ПРОФАЙЛА
  function setInitialInputParametersForProfile() {
    const { name, email } = getDataUserFromLocalStorage()
    setInputParameters({
      name: {
        inputValue: name,
        isValidInput: false,
      },
      email: {
        inputValue: email,
        isValidInput: false,
      }
    })
  }



  // ПОЛУЧИТЬ ВАЛИДНЫЕ ДАННЫЕ ИЗ ФОРМЫ
  /*
    НАПРИМЕР, В ПРОФАЙЛЕ МОЖНО ИЗМЕНИТЬ ОДНО ИЗ ПОЛЕЙ, В ОТЛИЧИИ ОТ ДРУГИХ СТРАНИЦ,
    ГДЕ ВСЕ ПОЛЯ ОБЯЗАТЕЛЬНЫ ДЛЯ ЗАПОЛНЕНИЯ
  */
  function getValidDataFromForm() {
    const keys = Object.keys(inputParameters)

    const box = {}
    let boxLength = 0

    keys.forEach((key) => {
      if (inputParameters[key].isValidInput) {
        box[key] = inputParameters[key].inputValue
        boxLength++
      }
    })

    if (boxLength > 0) {
      return box
    }

    return null
  }



  return {
    saveInputError,
    removeErrorInputField,
    resetFormByDefault,
    checkValiditySigninForm,
    checkValiditySignupForm,
    checkValidityProfileForm,
    resetValidInputFields,
    saveRegexResult,
    getValidDataFromForm,
    setInitialInputParametersForProfile
  }
}


export default useActionsValidation