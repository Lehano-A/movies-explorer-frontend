import { useEffect, useState } from "react";
import useIdentifyCurrentPathname from "./useIdentifyCurrentPathname";
import { REGEX_EMAIL, REGEX_NAME, REGEX_PASSWORD } from "../utils/constants/constants";
import useActionsValidation from "./useActionsValidation";
import getDataUserFromLocalStorage from "../utils/helpers/getDataUserFromLocalStorage";

const defaultInputParameters = {
  name: {
    inputValue: '',
    isValidInput: false,
  },
  email: {
    inputValue: '',
    isValidInput: false,
  },
  password: {
    inputValue: '',
    isValidInput: false,
  }
}



function useValidation({ dataUser, changeDataUser }) {

  const [errorsForm, setErrorsForm] = useState({})
  const [isRegex, setIsRegex] = useState({
    name: null,
    email: null,
    password: null
  })
  const [inputParameters, setInputParameters] = useState(defaultInputParameters); // ДЛЯ ОБРАБОТЧИКА ОШИБОК

  const identifyCurrentPathname = useIdentifyCurrentPathname()

  const {
    saveInputError,
    removeErrorInputField,
    checkValiditySigninForm,
    checkValiditySignupForm,
    checkValidityProfileForm,
    resetFormByDefault,
    resetValidInputFields,
    saveRegexResult,
    getValidDataFromForm,
    setInitialInputParametersForProfile,
  } = useActionsValidation({ isRegex, inputParameters, errorsForm, defaultInputParameters, setErrorsForm, setInputParameters, setIsRegex })



  useEffect(() => {
    const dataUserFromLocalStorage = getDataUserFromLocalStorage()

    if (dataUserFromLocalStorage) {
      changeDataUser(dataUserFromLocalStorage)
      setInputParameters((prevState) => ({
        ...prevState,
        name: {
          inputValue: dataUserFromLocalStorage.name,
          isValidInput: false,
        },
        email: {
          inputValue: dataUserFromLocalStorage.email,
          isValidInput: false,
        },
      }))
    }
  }, [])



  // ОБРАБОТАТЬ ИЗМЕНЕНИЕ ВХОДНОГО ЗНАЧЕНИЯ В ПОЛЕ ФОРМЫ
  function handleChangeInput(e) {

    const inputFieldName = e.target.name;
    const inputValue = e.target.value;


    let isMatchedRegex

    if (inputFieldName === 'email') {
      isMatchedRegex = inputValue.match(REGEX_EMAIL)
    }

    if (inputFieldName === 'name') {
      isMatchedRegex = inputValue.match(REGEX_NAME)
    }

    if (inputFieldName === 'password') {
      isMatchedRegex = inputValue.match(REGEX_PASSWORD)
    }

    handleInputValue(inputValue, isMatchedRegex, inputFieldName)
  }



  // ОБРАБОТАТЬ ВХОДЯЩЕЕ ЗНАЧЕНИЕ ПОЛЯ
  function handleInputValue(inputValue, isMatchedRegex, inputFieldName) {

    // ЕСЛИ НЕТ ДАННЫХ ПОЛЬЗОВАТЕЛЯ, ЗНАЧИТ ЭТО СТРАНИЦА - /signin или /signup
    if (!dataUser) {
      if (isMatchedRegex) {
        setInputParameters((prevState) => ({ ...prevState, [inputFieldName]: { inputValue: inputValue, isValidInput: true } }))
        removeErrorInputField(inputFieldName)
        saveRegexResult(isMatchedRegex, inputFieldName)
        return true
      }

      if (!isMatchedRegex) {
        setInputParameters((prevState) => ({ ...prevState, [inputFieldName]: { inputValue: inputValue, isValidInput: false } }))
        saveInputError(inputFieldName)
        saveRegexResult(isMatchedRegex, inputFieldName)
        return false
      }
    }


    const currentValue = dataUser[inputFieldName]

    if (inputValue !== currentValue && isMatchedRegex) {
      setInputParameters((prevState) => ({ ...prevState, [inputFieldName]: { inputValue: inputValue, isValidInput: true } }))
      removeErrorInputField(inputFieldName)
      saveRegexResult(isMatchedRegex, inputFieldName)
      return true
    }

    if (inputValue === currentValue) {
      setInputParameters((prevState) => ({ ...prevState, [inputFieldName]: { inputValue: inputValue, isValidInput: false } }))
      removeErrorInputField(inputFieldName)
      saveRegexResult(isMatchedRegex, inputFieldName)
      return false
    }


    setInputParameters((prevState) => ({ ...prevState, [inputFieldName]: { inputValue: inputValue, isValidInput: false } }))
    saveInputError(inputFieldName)
    saveRegexResult(isMatchedRegex, inputFieldName)
    return false
  }



  // ПРОВЕРИТЬ ВАЛИДНОСТЬ ПОЛЕЙ ВВОДА ФОРМЫ
  function checkValidityForm() {

    // ЕСЛИ ОТКРЫТА СТРАНИЦА /signup
    if (identifyCurrentPathname.isSignup()) {
      return checkValiditySignupForm()
    }


    // ЕСЛИ ОТКРЫТА СТРАНИЦА /signin
    if (identifyCurrentPathname.isSignin()) {
      return checkValiditySigninForm()
    }


    // ЕСЛИ ОТКРЫТА СТРАНИЦА /profile
    if (identifyCurrentPathname.isProfile()) {
      return checkValidityProfileForm()
    }
  }



  return {
    handleChangeInput,
    errorsForm,
    inputParameters,
    checkValidityForm,
    resetFormByDefault,
    resetValidInputFields,
    getValidDataFromForm,
    setInitialInputParametersForProfile,
  }
}

export default useValidation