import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import { Container, Nav} from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import logo from "./2gaz.png"
import './ContainerForm.css'

export default class Header extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="md"  variant="light">
                <Container >
                    <Navbar.Brand href="/">
                        <img
                            src={logo}
                            height="80"
                            width="300"
                            className="brand"
                            alt="Logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav expend='me-auto'>
                            <Nav.Link href='/' className='NaVLink'>Упаковщик</Nav.Link>
                            <Nav.Link href='/about' className='NaVLink1'>Как пользоваться</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}