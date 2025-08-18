export const validateFullName = (
  fieldName: string,
  value: string,
  minValue: number,
  maxValue: number
): string | true => {
  if (!value) return "Please provide the Form Value."
  const trimmedValue = value.trim();
  if (trimmedValue.length < minValue) {
    return `Min. ${minValue} characters required in ${fieldName}.`;
  }
  if (trimmedValue.length > maxValue) {
    return `Max. ${maxValue} characters allowed in ${fieldName}.`;
  }
  const regex = /^[a-zA-Z]+(?: [a-zA-Z]+)+$/;
  if (!regex.test(trimmedValue)) {
    return `${fieldName} Only words with first and last name`;
  }
  return true;
};
export const validateWord = (
  fieldName: string,
  value: string,
  minValue: number,
  maxValue: number
): string | true => {
  if (!value) return "Please provide the Form Value."
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
export const validateSingleWord = (
  fieldName: string,
  value: string
): string | true => {
  if (!value) return `Please provide a value for ${fieldName}.`;
  const trimmedValue = value.trim();
  // Check if it's a single word (no spaces)
  if (trimmedValue.includes(" ")) {
    return `${fieldName} should be a single word without spaces.`;
  }
  // Check if it contains only letters (a-zA-Z)
  const regex = /^[a-zA-Z]+$/;
  if (!regex.test(trimmedValue)) {
    return `${fieldName} should only contain letters (no numbers or special characters).`;
  }
  return true;
};
export const validateSentence = (
  fieldName: string,
  value: string,
  minValue: number,
  maxValue: number
): string | true => {
  if (!value) return "Please provide the Form Value."
  const trimmedValue = value.trim();
  if (trimmedValue.length < minValue) {
    return `Min. ${minValue} characters required in ${fieldName}.`;
  }
  if (trimmedValue.length > maxValue) {
    return `Max. ${maxValue} characters allowed in ${fieldName}.`;
  }
  return true;
};
export const validateString = (fieldName: string, value: string, minValue: number, maxValue: number): string | true => {
  if (!value) return `Please provide ${fieldName}`
  const trimmedValue = value.trim();
  if (trimmedValue.length < minValue) {
    return `Min. ${minValue} digits required in ${fieldName}.`;
  }
  if (trimmedValue.length > maxValue) {
    return `Max. ${maxValue} digits allowed in ${fieldName}.`;
  }
  return true
}
export const validateNumber = (
  fieldName: string,
  value: string,
  minValue: number,
  maxValue: number
): string | true => {
  if (!value) return "Please provide the Form Value."
  const sringValue = value.toString();
  const trimmedValue = sringValue.trim();
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
  if (!value) return "Please provide the Form Value."
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
  if (!value) return "Please provide the Form Value."
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
export const validateDate = (fieldName: string, value: string) => {
  if (!value) {
    return `${fieldName} is Required`
  }
  const [month, year] = value.split('/');
  const numbericMonth = parseInt(month);
  const numericYear = parseInt(year);
  if (numbericMonth < 1 && numbericMonth > 12) return 'Invalid Month';
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth()
  if (currentYear > 2000 + numericYear) return 'Card is Expired';
  if (currentYear === 2000 + numericYear && currentMonth > numbericMonth) return 'Card is Expired'
}
