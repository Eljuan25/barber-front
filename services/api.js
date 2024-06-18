import { API_BASE_URL } from "../apiConfig";

export const registerCustomer = async ({ name, phone, email }) => {
  try {
    const formData = new FormData();
    formData.append('customer[name]', name);
    formData.append('customer[phone]', phone);
    formData.append('customer[email]', email);

    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Could not register customer');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error registering customer:', error);
    throw error;
  }
};

// Función para crear una cita
export const createAppointment = async ({ date, time, customerId }) => {
  try {
    const appointmentData = {
      date,
      time,
      customer_id: customerId, // Asumiendo que así se llama la clave foránea en tu API
    };

    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      throw new Error('Could not create appointment');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

// Función para obtener la lista de clientes
export const getCustomers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/customers`,);

    if (!response.ok) {
      throw new Error('Could not get customer list');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting customers:', error);
    throw error;
  }
};

// Función para obtener la lista de citas
export const getAppointments = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments`,);

    if (!response.ok) {
      throw new Error('Could not get appointment list');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting appointments:', error);
    throw error;
  }
};
     

