import { Container, Navbar, NavbarBrand, Card, CardBody, CardTitle, CardText, CardImg, Button } from 'reactstrap';


function Home() {

  return (
    <Container>


      <Card className="my-2">
        <CardImg
          className="img-fluid"
          alt="Card image cap"
          src="/card-img.jpg"
          style={{ height: "50%" }}
          top
          width="100%"
        />
        <CardBody>
          <CardTitle tag="h5">Welcome to Navi!</CardTitle>
          <CardText>
            This is a wider card with supporting text below as a natural lead-in to additional content.
          </CardText>
          <CardText>
            <small className="text-muted">Last updated 3 mins ago</small>
          </CardText>
        </CardBody>
      </Card>

      
    </Container>
  );
}

export default Home;
