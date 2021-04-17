import './App.css';
import React, { Component } from 'react';
import { getAllStudents } from './helpers/client';
import { Table } from 'antd';

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
      ];

      return (
        <Table dataSource={students} columns={columns} rowKey='studentId' />
      );
    }

    return <h2>No Students found</h2>;
  }
}

export default App;
