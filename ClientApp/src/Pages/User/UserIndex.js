import React, { Component } from 'react'
import {data} from '../../config/data.js'
import { Modal } from 'react-bootstrap';

/**
 * This component is used to display user's page.
 * Data that gets displays in this page, retrieved from
 * SQL database (currently local but plan to change serverless db)
 * 
 */

export default class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user : [],
            modalTitle : "",
            UserName : "",
            FirstName : "",
            SecondName : ""
        }
    }

    refreshList(){
        fetch(data.API_URL+'users')
        .then(response => { 
            if (!response.ok) {
                console.log(response)
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
        .then(data => {
            this.setState({user:data});
        });
        
    }

    componentDidMount(){
        this.refreshList();
    }

    changeUserName = (user) => {
        this.setState({UserName : user.target.value});
    }

    changeFirstName = (user) => {
        this.setState({FirstName : user.target.value});
    }

    changeSecondName = (user) => {
        this.setState({SecondName : user.target.value});
    }

    addClick() {
        this.setState({
            modalTitle: 'New User',
            UserId: '',
            UserName: '',
            FirstName: '',
            SecondName: ''
        })
    }

    editClick(user) {
        this.setState({
            modalTitle: 'Edit User',
            UserId: user.UserId,
            UserName: user.UserName,
            FirstName: user.FirstName,
            SecondName: user.SecondName
        })
    }

    render () {

        const {
            user,
            UserId,
            modalTitle,
            UserName,
            FirstName,
            SecondName
        } = this.state;
        
        return (
            <div>
                <button type='button' 
                    className='btn btn-primary m-2 float-end' 
                    data-toggle="modal" data-target="#exampleModal" 
                    onClick={()=> this.addClick()}> 
                        Add User 
                </button>

                <div className='modal fade' id='userModal' tabIndex='-1' aria-hidden='true'>
                <div className='modal-dialog modal-lg modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'> {modalTitle} </h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>User Name</span>
                                <input type='text' className='form-control' value={UserName} onChange={this.changeUserName}/>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>First Name</span>
                                <input type='text' className='form-control' value={FirstName} onChange={this.changeFirstName}/>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>Second Name</span>
                                <input type='text' className='form-control' value={SecondName} onChange={this.changeSecondName}/>
                            </div>
                            
                            {!UserId ? <button type='button' className='btn btn-primary float-start'>Create</button> : null }
                            {UserId ? <button type='button' className='btn btn-primary float-start'>Update</button> : null }

                            </div>
                        </div>
                    </div>
                </div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>
                                User Name
                            </th>
                            <th>
                                First Name
                            </th>
                            <th>
                                Last Name
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map(user =>
                            <tr key={user.UserId}>
                                <td>{user.UserName}</td>
                                <td>{user.FirstName}</td>
                                <td>{user.LastName}</td>
                                <td >
                                    <button type='button' className='btn btn-light mr-1' data-toggle="modal" data-target="#exampleModal" onClick={()=> this.editClick(user)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>
                                    <button type='button' className='btn btn-light mr-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            
            {/* <div className='modal fade' id='userModal' tabIndex='-1' aria-hidden='true'>
                <div className='modal-dialog modal-lg modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'> {modalTitle} </h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>User Name</span>
                                <input type='text' className='form-control' value={UserName} onChange={this.changeUserName}/>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>First Name</span>
                                <input type='text' className='form-control' value={FirstName} onChange={this.changeFirstName}/>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>Second Name</span>
                                <input type='text' className='form-control' value={SecondName} onChange={this.changeSecondName}/>
                            </div>
                            
                            {!UserId ? <button type='button' className='btn btn-primary float-start'>Create</button> : null }
                            {UserId ? <button type='button' className='btn btn-primary float-start'>Update</button> : null }

                        </div>
                    </div>
                </div>
            </div> */}
        </div>
        )
    }
}