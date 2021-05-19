import React from 'react';
import Container from '../Container';
import { Button, Avatar } from 'antd';
import '../assets/Footer.css';

const Footer = (props) => {
  return (
    <div className='footer'>
      <Container>
        {props.numberOfStudents ? (
          <Avatar
            style={{ backgroundColor: '#f56a00', marginRight: '5px' }}
            size='large'
          >
            {props.numberOfStudents}
          </Avatar>
        ) : null}
        <Button
          onClick={() => props.handleAddStudentClickEvent()}
          type='primary'
        >
          Add New Student +
        </Button>
      </Container>
    </div>
  );
};

export default Footer;
