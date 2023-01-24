import React from "react";
import { Card, Image } from "semantic-ui-react";

const CardExampleCard = ({ name, description, image }) => (
  <Card>
    <Image src={image} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      {/* <Card.Meta>
        <span className="date">Joined in 2015</span>
      </Card.Meta> */}
      <Card.Description>{description}</Card.Description>
    </Card.Content>
  </Card>
);

export default CardExampleCard;
