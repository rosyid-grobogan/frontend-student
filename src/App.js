import './App.css';
import React, { Component } from 'react';
import { getAllStudents } from './helpers/client';
import { Table, Avatar, Tag, Spin, Modal } from 'antd';
import Container from './Container';
import Footer from './components/Footer';
import AddStudentForm from './forms/AddStudentForm';

class App extends Component {
  state = {
    students: [],
    isFetching: false,
    isAddStudentModalVisible: false,
  };

  componentDidMount() {
    this.fetchStudent();
  }

  openAddStudentModalVisible = () =>
    this.setState({ isAddStudentModalVisible: true });

  closeAddStudentModal = () =>
    this.setState({ isAddStudentModalVisible: false });

  fetchStudent = () => {
    this.setState({
      isFetching: true,
    });

    getAllStudents().then((res) =>
      res.json().then((students) => {
        console.log(students);
        this.setState({
          // students: students
          students,
          isFetching: false,
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
    const { students, isFetching, isAddStudentModalVisible } = this.state;

    if (isFetching) {
      return (
        <Container>
          <Spin size='large' />
        </Container>
      );
    }

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
          <Modal
            title='Add New Student'
            visible={isAddStudentModalVisible}
            onOk={this.closeAddStudentModal}
            onCancel={this.closeAddStudentModal}
            width={1000}
          >
            <AddStudentForm />
          </Modal>
          <Footer
            numberOfStudents={students.length}
            handleAddStudentClickEvent={this.openAddStudentModalVisible}
          ></Footer>
        </Container>
      );
    }

    return <h2>No Students found</h2>;
  }
}

export default App;
