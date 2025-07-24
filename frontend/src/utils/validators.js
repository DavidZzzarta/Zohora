import validator from "validator";

const isLength = (value, min, max) => {
  if (typeof value !== "string") return false;
  return value.length >= min && value.length <= max;
};

export const isUsername = ({ value }) => isLength(value, 3, 31);

export const isEmail = ({ value }) => {
  if (typeof value !== "string") return false;
  return validator.isEmail(value.trim());
};

export const isPassword = ({ value }) => {
  if (typeof value !== "string") return false;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,42}$/;
  return passwordRegex.test(value);
};

export const isAmount = ({ value }) => validator.isInt(value);

export const isAccount = ({ value }) => isLength(value, 2, 31);

export const isDescription = ({ value }) => {
  if (typeof value !== "string") return false;
  return value.length <= 31;
};
