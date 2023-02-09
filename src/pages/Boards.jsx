import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Badge } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';    


const Boards = ({createBoard}) => {
    const { currentUser } = useAuth();
   return (
    <>
    <Card className="text-center mb-4 w-50" bg={'ligth'}>
      <Card.Header>
        <Badge bg="secondary" as="button">
            New
        </Badge>
      </Card.Header>
      <Card.Body>
        <Card.Title>100 moments together</Card.Title>
        <Card.Text>
          Scratch, like and share with others !.
        </Card.Text>
        <Button 
          variant="primary"
          onClick={() => createBoard(currentUser.uid, '01')}
        >Go!</Button>
      </Card.Body>
      <Card.Footer className="text">37/100</Card.Footer>
    </Card>

     <Card className="text-center mb-4 w-50" bg={'ligth'}>
      <Card.Header>
        <Badge bg="secondary" as="button">
            New
        </Badge>
      </Card.Header>
      <Card.Body>
        <Card.Title>50 date ideas</Card.Title>
        <Card.Text>
          Scratch, like and share with others !.
        </Card.Text>
        <Button 
          variant="primary"
          onClick={() => createBoard(currentUser.uid, '02')}
        >Go!</Button>
      </Card.Body>
      <Card.Footer className="text">15/100</Card.Footer>
    </Card>
{/*
    <Card className="text-center" bg={'secondary'}>
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>100 moments together</Card.Title>
        <Card.Text>
          Scratch, like and share with others !.
        </Card.Text>
        <Button variant="primary">Go!</Button>
      </Card.Body>
      <Card.Footer className="text">37/100</Card.Footer>
    </Card> */}
    </>
  )
}

export default Boards