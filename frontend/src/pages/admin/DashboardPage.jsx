import { Col, Container, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const DashboardPage = () => {
    // dashboard page ıcersınde kac tane ınstaller varsa sayısını gostercez
    const [installerCount, setInstallerCount] = useState(0);

    const apiUrl = import.meta.env.VITE_API_BASE_URL;


    const fetchInstallers = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/installers`);
            const data = await response.json();
            setInstallerCount(data.length);
        } catch (error) {
            console.error('Error fetching installers:', error);
        }
    };

    useEffect(() => {
        fetchInstallers();
    })
  return (
    <Container>
        <Row className="mt-5">
            <Col>
                <h1 className="text-center">Dashboard</h1>
            </Col>
        </Row>
        <Row className="mt-3">
            <Col>
                <p className="text-center">Toplam Kurulumcu Sayısı: {installerCount}</p>
            </Col>
        </Row>
    </Container>
  )
}

export default DashboardPage
