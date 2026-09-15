export const MAX_LENGTHS = {
  todoTitle: 100,
  email: 254,
  password: 128,
  filter: 100,
};

export function isRequired(value) {
  return typeof value === 'string' && value.trim() !== '';
}

export function isValidTodoTitle(title) {
  return isRequired(title) && title.trim().length <= MAX_LENGTHS.todoTitle;
}

export function isValidEmail(email) {
  const trimmed = email.trim();
  return (
    trimmed !== '' &&
    trimmed.length <= MAX_LENGTHS.email &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
  );
}

export function isValidPassword(password) {
  return password !== '' && password.length <= MAX_LENGTHS.password;
}

// Strips control chars and trims whitespace before text is saved/sent.
export function sanitizeText(text) {
  return text
    .split('')
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code > 0x1f && code !== 0x7f;
    })
    .join('')
    .trim();
}
// Converts any error into a safe, generic message for display.
// Logs the real error to console; never shows raw error.message to the user.
export function getSafeErrorMessage(error) {
  console.error(error);
  const msg = error?.message || '';
  if (msg === 'Unauthorized')
    return 'Your session has expired. Please log in again.';
  if (msg === 'Not Found') return 'The requested data could not be found.';
  if (msg === 'Failed to fetch') return 'Network error. Please try again.';
  return 'Something went wrong. Please try again.';
}
