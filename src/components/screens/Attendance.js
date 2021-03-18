import { Container, Content, Body, Text, Card, CardItem, Left, Right, Icon } from "native-base";
import React from "react";
import { SideBarMenu } from "../sidebar";
import { Col, Row, Grid } from 'react-native-easy-grid';
const Attendance = (props) => {
    return (
      <Container>
        <SideBarMenu title={"Attendance"} navigation={props.navigation} />

        <Content>
          <Grid>
            <Row style={{ backgroundColor: '#635DB7', height: 150 }}>
              <Body>
                <Text>Attendance of</Text>
                <Text>Michael Jordan</Text>
              </Body>
            </Row>
            <Row style={{ marginTop: -50 }}>
              <Content padder>
                <Body>
                  <Card>
                    <CardItem style={{ width: "100%", height: 60 }}>
                      <Col size={1}>
                        <Left>
                          <Text>04:00pm-06:00pm</Text>
                        </Left>
                      </Col>
                      <Col size={1}>
                        <Left>
                          <Body>
                            <Text>Double Black Stripe</Text>
                          </Body>
                        </Left>
                      </Col>

                      <Col size={0.2}>
                        <Right>
                          <Icon name="arrow-forward-circle" />
                        </Right>
                      </Col>
                    </CardItem>
                  </Card>


                  <Card>
                    <CardItem style={{ width: "100%", height: 60 }}>
                      <Col size={1}>
                        <Left>
                          <Text>04:00pm-06:00pm</Text>
                        </Left>
                      </Col>
                      <Col size={1}>
                        <Left>
                          <Body>
                            <Text>Children Green Belt</Text>
                          </Body>
                        </Left>
                      </Col>

                      <Col size={0.2}>
                        <Right>
                          <Icon name="arrow-forward-circle" />
                        </Right>
                      </Col>
                    </CardItem>
                  </Card>



                  <Card>
                    <CardItem style={{ width: "100%", height: 60 }}>
                      <Col size={1}>
                        <Left>
                          <Text>04:00pm-06:00pm</Text>
                        </Left>
                      </Col>
                      <Col size={1}>
                        <Left>
                          <Body>
                            <Text>Children White Belt</Text>
                          </Body>
                        </Left>
                      </Col>

                      <Col size={0.2}>
                        <Right>
                          <Icon name="arrow-forward-circle" />
                        </Right>
                      </Col>
                    </CardItem>
                  </Card>
                </Body>
              </Content>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
}
export default Attendance