import React from 'react'
import { Text } from '@chakra-ui/react';
import { BsSuitSpadeFill as Spade, BsSuitHeartFill as Heart, BsSuitDiamondFill as Diamond, BsSuitClubFill as Club} from "react-icons/bs";

const suit_map = {
  "$C": <Club display="inline"/>,
  "$D": <Diamond color="red" display="inline"/>,
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
          <React.Fragment key={idx}>{i} {suits && suits[idx] ? suit_map[suits[idx]]: ""}</React.Fragment>
      ))}
      </>
    )
  };
  
  const lines = children.split("\n");
  
  return (
        lines.map((line, idx) => (
          <Text as="span" display="inline-flex" justifyContent="center" alignItems="center" key={idx}>
            {render_line(line)}
          </Text>
        ))
  )
}

export default BidMeaning

//display="flex" flexDirection="row" alignItems="center" justifyContent="left"