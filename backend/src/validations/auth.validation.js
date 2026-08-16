export function validateRegister(body) {
  const errors = {};

  if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (body.name.length > 50) {
    errors.name = 'Name cannot exceed 50 characters';
  }

  if (!body.email || !/^\S+@\S+\.\S+$/.test(body.email)) {
    errors.email = 'A valid email is required';
  }

  if (!body.password || typeof body.password !== 'string') {
    errors.password = 'Password is required';
  } else if (body.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateLogin(body) {
  const errors = {};

  if (!body.email || !/^\S+@\S+\.\S+$/.test(body.email)) {
    errors.email = 'A valid email is required';
  }

  if (!body.password) {
    errors.password = 'Password is required';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateChangePassword(body) {
  const errors = {};

  if (!body.currentPassword) {
    errors.currentPassword = 'Current password is required';
  }

  if (!body.newPassword || body.newPassword.length < 8) {
    errors.newPassword = 'New password must be at least 8 characters';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
