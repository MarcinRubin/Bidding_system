import React from 'react'
import { Text } from '@chakra-ui/react';
import { BsSuitSpadeFill as Spade, BsSuitHeartFill as Heart, BsSuitDiamondFill as Diamond, BsSuitClubFill as Club} from "react-icons/bs";

const suit_map = {
  "$C": <Club/>,
  "$D": <Diamond color="red"/>,
  "$H": <Heart color ="red"/>,
  "$S": <Spade/>,
};

const BidMeaning = ({children}) => {
  
  const render_line = (line) =>{
    const fragments = line.split(/\$[CDSH]/g);
    const suits = line.match(/\$[CDSH]/g);
    return(
      <>
        {fragments.map((i, idx) => (
          <React.Fragment key={idx}> {i} {suits && suits[idx] ? suit_map[suits[idx]]: ""}</React.Fragment>
      ))}
      </>
    )
  };
  
  const lines = children.split("\n");
  
  return (
        lines.map((line, idx) => (
          <Text display="flex" flexDirection="row" alignItems="center" justifyContent="left" key={idx}>
            {render_line(line)}
          </Text>
        ))
  )
}

export default BidMeaning