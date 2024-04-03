
import "./CustomerForm.css";
import { message } from "antd";
import { useEffect, useState } from "react";

const CustomerFormPage = () => {
  // State'leri tanımla
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: "",
    address: '',
    city: "",
    country: "",
    installerCustomer: "",
  });
  
  const [installers, setInstallers] = useState([]);

  const [cities] = useState(['Istanbul', 'Ankara', 'Izmir']);
  const countries = {
    Istanbul: ['Sisli', 'Besiktas', 'Kadikoy'],
    Ankara: ['Cankaya', 'Kecioren', 'Yenimahalle'],
    Izmir: ['Konak', 'Bornova', 'Karsiyaka', 'Buca'],
  };
  const apiUrl = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    const fetchInstallers = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/installers`);

        if (response.ok) {
          const data = await response.json();
          setInstallers(data);
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchInstallers();
  }, [apiUrl]);


  // Form verileri değiştikçe state'i güncelle 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    const selectedCountry = countries[selectedCity] && countries[selectedCity].join(', ')
    setFormData({
      ...formData,
      city: selectedCity,
      country: selectedCountry,
    });
  };

  // Form submit işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form verilerini kullanarak istek gönder (örnek)
    const response = await fetch(`${apiUrl}/api/customers`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Yanıtı işle (örnek)
    if (response.ok) {
      console.log('Form başarıyla gönderildi!');
      // Başarılı gönderim sonrası işlemler
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: "",
        address: '',
        city: "",
        country: "",
        installerCustomer: "",
      });

      message.success("Kayıt başarılı.");
    } else {
      console.error('Form gönderilirken hata oluştu!');
      // Hata sonrası işlemler
      message.error("Kayıt başarısız.");
    }
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <label>
        Ad:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Soyad:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        E-posta:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Telefon:
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Adres:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        İl:
        <select name="city" value={formData.city} onChange={handleCityChange} required>
          <option value="" disabled>
            İl seçin
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>

      <label>
        İlçe:
        <select name="country" value={formData.city && countries[formData.city] ? formData.country : ''} onChange={handleChange} required>
          <option value="" disabled>
            İlçe seçin
          </option>
          {formData.city && countries[formData.city].map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </label>

      <label>
        Kurulumcu:
        <select name="installerCustomer" value={formData.installer} onChange={handleChange} required>
          <option value="" disabled>
            Kurulumcu Seçin:
          </option>
          {installers.filter(installer => installer.role === "installer").map((installer) => (
            <option key={installer._id} value={installer._id}>
              {installer.username}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomerFormPage;
