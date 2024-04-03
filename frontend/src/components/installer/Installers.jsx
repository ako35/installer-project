import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const Installers = () => {
  const [customers, setCustomers] = useState([]);

  const installer = JSON.parse(localStorage.getItem('installer'));

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Kurulumcu sayfasında, installerCustomer ile eşleşen müşterileri almak için bir HTTP isteği gönderin
  const fetchCustomersByInstaller = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/customers?installerCustomer=${installer.id}`);
      if (response.ok) {
        const data = await response.json();
        setCustomers(data); // Alınan müşterileri state'e atayın
        console.log(data);
      } else {
        // Hata durumunda kullanıcıya bilgi vermek için bir mesaj gösterebilirsiniz
        message.error("Müşteriler alınamadı.");
      }
    } catch (error) {
      console.error("Veri hatası:", error);
    }
  };

  useEffect(() => {
    if (installer && installer.id) {
      fetchCustomersByInstaller(installer.id);
    } else {
      console.error("Kurulumcu bilgisi bulunamadı.");
    }
  }, []);

  const filteredCustomers = customers.filter(customer => customer.installerCustomer === installer.id);

  return (
    <div id='customers' className="container mt-4">
      <h2 className="mb-4">Kurulumcu Müşterileri</h2>
      <div className="row">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="col-md-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{customer.firstName} {customer.lastName}</Card.Title>
                <Card.Text>
                  <strong>E-posta:</strong> {customer.email}<br />
                  <strong>Telefon:</strong> {customer.phone}<br />
                  <strong>Adres:</strong> {customer.address}<br />
                  <strong>Şehir:</strong> {customer.city}<br />
                  <strong>İlçe:</strong> {customer.country}<br />
                  <strong>installerCustomer:</strong> {customer.installerCustomer}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Installers;
