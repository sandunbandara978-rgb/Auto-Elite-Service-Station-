// Customer Authentication Store for AUTO ELITE

const DEFAULT_USERS = [
  {
    id: 'usr-1',
    name: 'Dinesh Perera',
    email: 'dinesh@luxurycar.lk',
    phone: '+94 77 123 4567',
    password: 'user123',
    vehicle: 'Porsche 911 GT3 RS (WP CAD-911)'
  }
];

export const getRegisteredUsers = () => {
  const data = localStorage.getItem('auto_elite_registered_users');
  return data ? JSON.parse(data) : DEFAULT_USERS;
};

export const getLoggedInCustomer = () => {
  const data = sessionStorage.getItem('auto_elite_current_customer');
  return data ? JSON.parse(data) : null;
};

export const loginCustomer = (emailOrPhone, password) => {
  const users = getRegisteredUsers();
  const found = users.find(
    u => (u.email.toLowerCase() === emailOrPhone.toLowerCase() || u.phone === emailOrPhone) && u.password === password
  );

  if (found) {
    sessionStorage.setItem('auto_elite_current_customer', JSON.stringify(found));
    window.dispatchEvent(new Event('auto_elite_auth_change'));
    return { success: true, user: found };
  }
  return { success: false, message: 'Invalid email or password. Please try again or create a new account.' };
};

export const registerCustomer = (userData) => {
  const users = getRegisteredUsers();
  
  // Check if email already exists
  const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
  if (existing) {
    return { success: false, message: 'An account with this email already exists. Please log in.' };
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    name: userData.name,
    email: userData.email,
    phone: userData.phone || '+94 77 000 0000',
    password: userData.password,
    vehicle: userData.vehicle || 'Luxury Automobile'
  };

  const updatedUsers = [...users, newUser];
  localStorage.setItem('auto_elite_registered_users', JSON.stringify(updatedUsers));
  sessionStorage.setItem('auto_elite_current_customer', JSON.stringify(newUser));

  window.dispatchEvent(new Event('auto_elite_auth_change'));
  return { success: true, user: newUser };
};

export const logoutCustomer = () => {
  sessionStorage.removeItem('auto_elite_current_customer');
  window.dispatchEvent(new Event('auto_elite_auth_change'));
};
