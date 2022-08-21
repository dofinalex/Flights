import React, { Component } from 'react';
import Pagination from './common/pagination';
import { paginate } from './utilities/paginate';
import {getAdmin,deleteAdmin} from '../services/adminServices';

class RemoveAdmin extends Component {
    state={
       admin_lst:[],
       pageSize:20,
       currentPage:1,
     
    }
    handleBack = () => {
        // Navigate to /products
        // this.props.history.push('/products')
        this.props.history.replace('/admin')
      };
    async componentDidMount(){
        const {data:admins}=await getAdmin()
        console.log(admins)
          this.setState({
            admin_lst:[...admins]
          })
      }
      handlePageChange =page=>{
        this.setState({currentPage:page})
       }
       handleDelete=async (admin)=>{
        const admins=this.state.admin_lst.filter(c=>c.id !==admin.id)
        this.setState({admin_lst:admins})
        await deleteAdmin(admin.id)
        this.props.history.replace('/admin')
        }
    render() {
    if (this.state.admin_lst.length===0)
       return (<div>
              <button onClick={this.handleBack} className="btn btn-primary">Back</button>
              <h1>There is no records</h1>
              </div>)
    const admins=paginate(this.state.admin_lst,this.state.currentPage,this.state.pageSize)
    return (<div> 
            <button onClick={this.handleBack} className="btn btn-primary">Back</button>
            <h1>General Administators Information</h1>
            <p>There are {this.state.admin_lst.length} records</p>
           <table className="table">
            <thead>
                <tr>
                    <th>admin id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>User id</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {admins.map(admin=>{
                return(
                 <tr key={admin.id}>
                 <td>{admin.id}</td>
                 <td>{admin.first_name}</td>
                 <td>{admin.last_name}</td>
                 <td>{admin.user_id}</td>
                 <td><button onClick={()=>this.handleDelete(admin)} className="btn btn-danger btn-sm">delete</button></td>
                </tr> 
                )  
                })}
           
            </tbody>
           </table>
           <Pagination ItemCount={this.state.admin_lst.length} 
                       pageSize={this.state.pageSize} 
                       currentPage={this.state.currentPage}
                       onPageChange={this.handlePageChange}>
           </Pagination>
           </div>)
    }
}
export default RemoveAdmin

