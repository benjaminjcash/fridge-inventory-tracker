import React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { Tag, KIND } from 'baseui/tag';
import { Block } from 'baseui/block';
import { RED, YELLOW, GREEN } from '../../styles/colors';

const Dashboard = ({ items }) => {
  const [css] = useStyletron();
  const [tagState, setTagState] = React.useState({});

  const getTodaysDate = () => {
    let now = new Date();
    return now.toLocaleDateString("en-US", {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  }

  React.useEffect(() => {
    let badTotal = 0;
    let closeTotal = 0;
    let fineTotal = 0;
    items.forEach(item => {
      if (item.expiration_health == "bad") badTotal++;
      if (item.expiration_health == "close") closeTotal++;
      if (item.expiration_health == "fine") fineTotal++;
    });
    setTagState({
      bad: {
        show: badTotal > 0,
        total: badTotal
      },
      close: {
        show: closeTotal > 0,
        total: closeTotal
      },
      fine: {
        show: fineTotal > 0,
        total: fineTotal
      }
    });
  }, [items]);

  return (
    <Card className={css({ height: 'auto', width: 'auto', paddingBottom: '16px' })} >
      <StyledBody>
        <Block><h3>{getTodaysDate()}</h3></Block>
        <Block className={css({ marginTop: '-15px' })}>
        {
          tagState?.bad?.show && 
          <Tag
            color={RED}
            kind={KIND.custom}
            onActionClick={() => {
              setTagState({
                ...tagState,
                bad: {
                  show: false
                }
              });
            }}
          >Throw away: {tagState?.bad?.total}</Tag>
        }
        {
          tagState?.close?.show && 
          <Tag
            color={YELLOW}
            kind={KIND.custom}
            onActionClick={() => {
              setTagState({
                ...tagState,
                close: {
                  show: false
                }
              });
            }}
          >Use ASAP: {tagState?.close?.total}</Tag>
        }
        {
          tagState?.fine?.show && 
          <Tag
            color={GREEN}
            kind={KIND.custom}
            onActionClick={() => {
              setTagState({
                ...tagState,
                fine: {
                  show: false
                }
              });
            }}
          >Use this week: {tagState?.fine?.total}</Tag>
        }
        </Block>
      </StyledBody>
    </Card>
  );
}

export default Dashboard;