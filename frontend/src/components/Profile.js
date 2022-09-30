import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';



const Profile = () => {
    
    const userInfo=JSON.parse(localStorage.getItem('userInfo'));
  return (
    <div>
      <title>User Profile</title>
      <h1 className='my-3'>User Profile</h1>
      <Row>
        <Col>
        <Card>
            <div className='my-3  mx-3'>
                User  :  {userInfo.name}
            </div>
            
        </Card>

        <Card>
            <div className='my-3  mx-3'>
                User Email  :  {userInfo.email}
            </div>
            
        </Card>

        <Card>
            <div className='my-3  mx-3 '>

                <Link to={'/update-user'}>
                    <Button >Update User</Button>
                     </Link>
            </div>
            
        </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Profile
