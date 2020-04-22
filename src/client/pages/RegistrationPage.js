import React, { useContext } from 'react';
import Redirect from 'react-router-dom/es/Redirect';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import useFormFields from '../hooks/useFormFields';
import { UserContext } from '../contexts/UserProvider';
import {
  UPDATE_USER,
  MERGE_STUDENT,
  ADD_TRAIT_STUDENT_TRAITS
} from '../utils/gqlQueries';
import BasicInfo from '../components/BasicInfo';
import Preferences from '../components/Preferences';

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
  return ['Basic Info', 'Interests and Preferences', 'Submit'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Tell us who you are!';
    case 1:
      return 'Are you...';
    case 2:
      return "You're all done!";
    default:
      return 'Unknown step';
  }
}

export default function RegistrationPage() {
  const classes = useStyles();
  const steps = getSteps();
  const [UpdateUser] = useMutation(UPDATE_USER);
  const [MergeStudent] = useMutation(MERGE_STUDENT);
  const [AddTraitStudentTraits] = useMutation(ADD_TRAIT_STUDENT_TRAITS);
  const [user, setUser] = useContext(UserContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [redirect, setRedirect] = React.useState(false);
  const [fieldsFilled, updateFields] = useFormFields({
    gender: 'female',
    age: 18,
    hostel: 'PMHC High Block',
    schedule: 50,
    cleanliness: 50,
    participation: 50,
    studious: 50
  });

  const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);
  const handleSubmit = () => {
    console.log(fieldsFilled);
    UpdateUser({
      variables: {
        sid: user.sid,
        hostel: fieldsFilled.hostel,
        schedule: fieldsFilled.schedule,
        cleanliness: fieldsFilled.cleanliness,
        participation: fieldsFilled.participation,
        studious: fieldsFilled.studious
      }
    })
      .then(async () => {
        await MergeStudent({
          variables: {
            sid: user.sid,
            hostel: fieldsFilled.hostel,
            age: fieldsFilled.age,
            gender: fieldsFilled.gender
          }
        });
        Object.keys(fieldsFilled).map(async key => {
          if (key !== 'gender' && key !== 'age' && key !== 'hostel')
            await AddTraitStudentTraits({
              variables: {
                from: { sid: user.sid },
                to: { name: `${key}` },
                data: { strength: fieldsFilled[key] }
              }
            });
        });
      })
      .then(() => {
        setRedirect(true);
      });
  };

  if (redirect === true) return <Redirect to='/' />;

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
          <BasicInfo value={fieldsFilled} onChange={updateFields} />
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
