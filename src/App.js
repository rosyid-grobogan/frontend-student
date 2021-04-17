import './App.css';
import React, { Component } from 'react';
import { getAllStudents } from './helpers/client';
import { Table, Avatar, Tag } from 'antd';
import Container from './Container';

class App extends Component {
  state = {
    student: [],
  };

  componentDidMount() {
    this.fetchStudent();
  }

  fetchStudent = () => {
    getAllStudents().then((res) =>
      res.json().then((students) => {
        console.log(students);
        this.setState({
          // students: students
          students,
        });
      })
    );
  };

  //   {getAllStudents().then((res) =>
  //   res.json().then((students) => {
  //     console.log(students);
  //   })
  // )}
  render() {
    // const { students } = this.props;
    const { students } = this.state;

    if (students && students.length) {
      // return students.map((student, id) => {
      //   return (
      //     <div key={id}>
      //       <h2>{student.studentId}</h2>
      //       <p>{student.firstName}</p>
      //       <p>{student.lastName}</p>
      //       <p>{student.gender}</p>
      //       <p>{student.email}</p>
      //     </div>
      //   );
      // });
      const columns = [
        {
          title: '',
          key: 'avatar',
          render: (text, student) => (
            <Avatar size='large'>
              {`${student.firstName.charAt(0).toUpperCase()}`}
              {`${student.lastName.charAt(0).toUpperCase()}`}
            </Avatar>
          ),
        },
        {
          title: 'StudentId',
          dataIndex: 'studentId',
          key: 'studentId',
        },
        {
          title: 'FirstName',
          dataIndex: 'firstName',
          key: 'firstName',
        },
        {
          title: 'LastName',
          dataIndex: 'lastName',
          key: 'lastName',
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (status) => (
            <>
              <Tag color={status === 'ACTIVED' ? 'green' : 'red'}>
                {status.toUpperCase()}
              </Tag>
            </>
          ),
        },
      ];

      return (
        <Container>
          <Table
            dataSource={students}
            columns={columns}
            rowKey='studentId'
            pagination={false}
          />
        </Container>
      );
    }

    return <h2>No Students found</h2>;
  }
}

export default App;
