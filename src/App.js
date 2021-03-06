import './App.css';
import React, { Component } from 'react';
import { getAllStudents } from './helpers/client';
import { Table, Avatar, Tag, Spin, Modal, Empty } from 'antd';
import Container from './Container';
import Footer from './components/Footer';
import AddStudentForm from './forms/AddStudentForm';
import { errorNotification } from './helpers/Notification';

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

    getAllStudents()
      .then((res) =>
        res.json().then((students) => {
          console.log(students);
          this.setState({
            // students: students
            students,
            isFetching: false,
          });
        })
      )
      .catch((error) => {
        console.log(error.error);
        const message = error.error.message;
        const description = error.error.error;
        errorNotification(message, description);
        this.setState({
          isFetching: false,
        });
      });
  };

  //   {getAllStudents().then((res) =>
  //   res.json().then((students) => {
  //     console.log(students);
  //   })
  // )}
  render() {
    // const { students } = this.props;
    const { students, isFetching, isAddStudentModalVisible } = this.state;

    const elementAddModal = () => (
      <div>
        <Modal
          title='Add New Student'
          visible={isAddStudentModalVisible}
          onOk={this.closeAddStudentModal}
          onCancel={this.closeAddStudentModal}
          width={1000}
        >
          <AddStudentForm
            onSuccess={() => {
              this.closeAddStudentModal();
              this.fetchStudent();
            }}
            onFailure={(error) => {
              console.log(JSON.stringify(error));
              const message = error.error.message;
              const description = error.error.httpStatus;
              errorNotification(message, description);
            }}
          />
        </Modal>
        <Footer
          numberOfStudents={students.length}
          handleAddStudentClickEvent={this.openAddStudentModalVisible}
        ></Footer>
      </div>
    );

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
          {elementAddModal()}
        </Container>
      );
    }

    return (
      <Container>
        <Empty description={<h2>No Students found</h2>} />
        {elementAddModal()}
      </Container>
    );
  }
}

export default App;
