export const validateWord = (
    fieldName: string,
    value: string,
    minValue: number,
    maxValue: number
  ): string | true => {
    const trimmedValue = value.trim();
    if (trimmedValue.length < minValue) {
      return `Min. ${minValue} characters required in ${fieldName}.`;
    }
    if (trimmedValue.length > maxValue) {
      return `Max. ${maxValue} characters allowed in ${fieldName}.`;
    }
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(trimmedValue)) {
      return `${fieldName} should only contain letters.`;
    }
    return true;
  };
  export const validateNumber = (
    fieldName: string,
    value: string,
    minValue: number,
    maxValue: number
  ): string | true => {
    const trimmedValue = value.trim();
    const regex = /^[0-9]+$/;
    if (!regex.test(trimmedValue)) {
      return `${fieldName} should only contain numbers.`;
    }
    if (trimmedValue.length < minValue) {
      return `Min. ${minValue} digits required in ${fieldName}.`;
    }
    if (trimmedValue.length > maxValue) {
      return `Max. ${maxValue} digits allowed in ${fieldName}.`;
    }
    return true;
  };
  export const validateEmail = (fieldName: string, value: string): string | true => {
    const trimmedValue = value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(trimmedValue)) {
      return `${fieldName} must be a valid email.`;
    }
    return true;
  };
  export const validatePassword = (
    fieldName: string,
    value: string,
    minLength: number
  ): string | true => {
    const trimmedValue = value.trim();
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (trimmedValue.length < minLength) {
      return `${fieldName} must be at least ${minLength} characters.`;
    }
    if (!regex.test(trimmedValue)) {
      return `${fieldName} must have:
      atleast 1 UpperCase, LowerCase, Special Character and Number.`
    }
    return true;
  };
  export const validateConfirmPassword = (
    fieldName: string,
    password: string,
    confirmPassword: string
  ): string | true => {
    if (password !== confirmPassword) {
      return `${fieldName} must match password.`;
    }
    return true;
  };
