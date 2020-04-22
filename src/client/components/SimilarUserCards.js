import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { SIMILAR, USER_SID } from '../utils/gqlQueries';
import { UserContext } from '../contexts/UserProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import avatar from '../../../public/avatar.jpg';

const useStyles = makeStyles(theme => ({
  grid: {
    width: '100%',
    display: 'grid',
    gridAutoRows: '200px',
    gridTemplateColumns: '1fr',
    columnGap: '10px',
    rowGap: '15px'
  },
  card: {
    width: '100%',
    height: '100%'
  },
  media: {
    paddingTop: '56.25%' // 16:9
  },
  content: {
    flexGrow: 1
  }
}));

const levels = {
  0: 'No Way',
  25: 'Not really',
  50: 'sometimes',
  75: 'pretty much',
  100: 'definitely'
};

const UserCard = props => {
  const classes = useStyles();
  const { data, error, loading } = useQuery(USER_SID, {
    variables: { sid: props.sid }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Container className={classes.grid} maxWidth='md'>
      {/* End hero unit */}
      <Grid container spacing={4}>
        <Grid item key={data.userSid.sid} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image='https://i.picsum.photos/id/743/200/200.jpg'
              title={data.userSid.firstName + data.userSid.lastName}
            />
            <CardContent className={classes.content}>
              <Typography gutterBottom variant='h5' component='h2'>
                {`${data.userSid.firstName} ${data.userSid.lastName}`}
              </Typography>
              <Typography>
                {`Sleeps late: ${levels[data.userSid.schedule]}`}
              </Typography>
              <Typography>
                {`Keeps Clean: ${levels[data.userSid.cleanliness]}`}
              </Typography>
              <Typography>
                {`Active in the community: ${
                  levels[data.userSid.participation]
                }`}
              </Typography>
              <Typography>
                {`A+ Student: ${levels[data.userSid.studious]}`}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small' color='primary'>
                View
                {data.userSid.firstName}
                's Profile
              </Button>
              <Button size='small' color='primary'>
                Match with {data.userSid.firstName}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default () => {
  const [user, setUser] = useContext(UserContext);
  const { loading, error, data } = useQuery(SIMILAR, {
    variables: { sid: user.sid }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>Not found</p>;

  if (data)
    return data.similar.map(({ sid, age, gender }) => (
      <UserCard key={sid} sid={sid} gender={gender} age={age} />
    ));
};
