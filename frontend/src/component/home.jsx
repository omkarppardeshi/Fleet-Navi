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
            Discover a smarter way to manage your fleet with Navi. Track vehicles, monitor trips, and optimize routes—all in one place.
            Designed for efficiency and simplicity, Navi helps you stay in control while saving time and resources.
          </CardText>
          <CardText>
            <small className="text-muted">Updated just now</small>
          </CardText>
        </CardBody>

      </Card>


    </Container>
  );
}

export default Home;
