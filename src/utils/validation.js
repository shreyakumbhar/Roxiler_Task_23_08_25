// src/utils/validation.js

// Name: Min 20 chars, Max 60 chars
export const validateName = (name) => {
  return name.length >= 20 && name.length <= 60;
};

// Email validation (basic regex)
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Password: 8-16 chars, at least one uppercase and one special char
export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
  return regex.test(password);
};

// Address: Max 400 chars
// export const validateAddress = (address) => {
//   return address.length <= 400;
// };
