import { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';

const AdminInstaller = () => {
  const [installers, setInstallers] = useState([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchInstallers = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/installers`); // API endpoint
      const data = await response.json();
      setInstallers(data);
    } catch (error) {
      console.error('Error fetching installers:', error);
    }
  };

  useEffect(() => {
    fetchInstallers();
  }, []);

  const handleDelete = async (email) => {
    try {
      await fetch(`${apiUrl}/api/installers/${email}`, {
        method: 'DELETE',
      });
      // Kurulumcu başarıyla silindiğinde kurulumcu listesini yeniden getir
      fetchInstallers();
    } catch (error) {
      console.error('Error deleting installer:', error);
    }
  };

  return (
    <div className="admin-installer">
      <h2>Kurulumcu Listesi</h2>
      {installers.filter((installer) => installer.role === 'installer').length > 0 ? (
        <ListGroup>
          {installers.filter((installer) => installer.role === 'installer').map((installer) => (
            <ListGroupItem key={installer._id} className='d-flex justify-content-between align-items-center mb-2'>
              {installer.username}
              <Button variant="danger" size="sm" onClick={() => handleDelete(installer.email)}>Sil</Button>
            </ListGroupItem>
          ))}
        </ListGroup>
      ) : (
        <p>Hiçbir kurulumcu bulunamadı.</p>
      )}
    </div>
  );
};

export default AdminInstaller;
