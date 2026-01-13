"use client";

import { Container, Row, Col, Nav } from "react-bootstrap";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container fluid>
      <Row>
        <Col md={3} lg={2} className="bg-light vh-100 p-3">
          <h4>Admin Menu</h4>
          <Nav className="flex-column">
            <Nav.Link as={Link} href="/admin/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} href="/admin/users">
              Users
            </Nav.Link>
            <Nav.Link as={Link} href="/admin/settings">
              Settings
            </Nav.Link>
          </Nav>
        </Col>
        <Col md={9} lg={10} className="py-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
