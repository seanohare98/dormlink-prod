import React, { useContext } from 'react';
import Redirect from 'react-router-dom/es/Redirect';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import useFormFields from '../hooks/useFormFields';
import { UserContext } from '../contexts/UserProvider';
import { UPDATE_USER, ADD_USER_HOBBY } from '../utils/gqlQueries';
import BasicInfo from '../components/BasicInfo';
import Preferences from '../components/Hobbies';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '75%'
  },
  buttonLayout: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: '25%',
    paddingRight: '25%'
  },
  stepper: {
    backgroundColor: 'transparent'
  },
  button: {
    margin: theme.spacing(2),
    width: theme.spacing(5)
  },
  instructions: {
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  }
}));

function getSteps() {
  return ['Basic Info', 'Hobbies & Preferences', 'Submit'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Tell us who you are!';
    case 1:
      return 'Tell us what you like!';
    case 2:
      return 'All done!';
    default:
      return 'Unknown step';
  }
}

const defaultFormFields = {
  cleanliness: 50,
  sleep: [40, 60],
  hobbies: []
};

export default function RegistrationPage(props) {
  const classes = useStyles();
  const steps = getSteps();
  const [UpdateUser] = useMutation(UPDATE_USER);
  const [UpdateUserHobby] = useMutation(ADD_USER_HOBBY);
  const [user, setUser] = useContext(UserContext);
  const [missingField, setMissingField] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [redirect, setRedirect] = React.useState(user.isComplete);
  const [fieldsFilled, updateFields] = useFormFields(
    props.formFields ? props.formFields : defaultFormFields
  );

  const handleNext = () => {
    if (
      activeStep !== 0 ||
      (fieldsFilled.dorm && fieldsFilled.age && fieldsFilled.gender)
    ) {
      setMissingField(false);
      return setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
    setMissingField(true);
  };
  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);
  const handleSubmit = () => {
    UpdateUser({
      variables: {
        email: user.email,
        dorm: fieldsFilled.dorm,
        age: fieldsFilled.age,
        classStanding: fieldsFilled.classStanding,
        sleepStart: fieldsFilled.sleep[0],
        sleepEnd: fieldsFilled.sleep[1],
        cleanliness: fieldsFilled.cleanliness,
        major: fieldsFilled.major
      }
    })
      .then(() => {
        fieldsFilled.hobbies.forEach(hobbyName => {
          UpdateUserHobby({
            variables: {
              hobby: hobbyName
            }
          });
        });
      })
      .then(async () => {
        setRedirect(true);
      });
  };

  if (redirect === true) {
    setUser({ ...user, update: true });
    return <Redirect to='/' />;
  }

  return (
    <div className={classes.root}>
      <Stepper classes={{ root: classes.stepper }} activeStep={activeStep}>
        {steps.map(label => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        <div className={classes.instructions}>
          <Typography variant='h5'>{getStepContent(activeStep)}</Typography>
        </div>
        {activeStep === 0 && (
          <BasicInfo
            value={fieldsFilled}
            onChange={updateFields}
            child={
              missingField && (
                <Alert severity='error'>Some field are missing.</Alert>
              )
            }
          />
        )}
        {activeStep === 1 && (
          <Preferences value={fieldsFilled} onChange={updateFields} />
        )}
        <div className={classes.buttonLayout}>
          <Button
            variant='contained'
            className={classes.button}
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={
              activeStep === steps.length - 1 ? handleSubmit : handleNext
            }
            className={classes.button}
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}
