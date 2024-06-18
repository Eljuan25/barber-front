import React, { useState, useEffect } from 'react';
import { registerCustomer, createAppointment, getCustomers } from '../src/api';

const HomePage = () => {
  const [customerFormData, setCustomerFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [appointmentFormData, setAppointmentFormData] = useState({
    date: '',
    time: '',
    customerId: '',
  });
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersData = await getCustomers();
        setCustomers(customersData);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newCustomer = await registerCustomer(customerFormData);
      console.log('Cliente registrado:', newCustomer);
      setMessage('Cliente registrado exitosamente. Ahora puedes programar una cita.');
      setLoading(false);
    } catch (error) {
      console.error('Error al registrar cliente:', error);
      setMessage('Hubo un error al registrar el cliente.');
      setLoading(false);
    }
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newAppointment = await createAppointment({
        ...appointmentFormData,
        customerId: customerFormData.id, // Utilizamos el id del cliente registrado
      });
      console.log('Cita programada:', newAppointment);
      setMessage('Cita programada exitosamente.');
      setLoading(false);
    } catch (error) {
      console.error('Error al programar cita:', error);
      setMessage('Hubo un error al programar la cita.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Registro de Cliente y Programación de Cita</h1>

      {message && <p>{message}</p>}

      {/* Formulario de registro de cliente */}
      <form onSubmit={handleCustomerSubmit}>
        <h2>Registrar Cliente</h2>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={customerFormData.name}
            onChange={handleCustomerChange}
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            name="phone"
            value={customerFormData.phone}
            onChange={handleCustomerChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={customerFormData.email}
            onChange={handleCustomerChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar Cliente'}
        </button>
      </form>

      {/* Formulario de programación de cita */}
      {message && (
        <form onSubmit={handleAppointmentSubmit}>
          <h2>Programar Cita</h2>
          <div>
            <label>Fecha:</label>
            <input
              type="date"
              name="date"
              value={appointmentFormData.date}
              onChange={handleAppointmentChange}
              required
            />
          </div>
          <div>
            <label>Hora:</label>
            <input
              type="time"
              name="time"
              value={appointmentFormData.time}
              onChange={handleAppointmentChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Programando...' : 'Programar Cita'}
          </button>
        </form>
      )}
    </div>
  );
};

export default HomePage;