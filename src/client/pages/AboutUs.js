import React from 'react';
import name from '../../../public/avatar.jpg';

export default class NewComponent extends React.Component {
  render() {
    return (
      <div>
        <div className='about-section'>
          <h1>About Us Page</h1>
          <p>
            Dormlink is a platform for CUHK student to find and match their
            potential roommate
          </p>
          <p>which is made by group 39 in CSCI3100 Spring 2020</p>
          <p>
            <a
              className='button'
              href='https://github.com/seanohare98/dormlink'
            >
              view more on GitHub
            </a>{' '}
          </p>
        </div>
        <div className='our-team'>
          <h1>Our Team</h1>
        </div>
        <div className='box'>
          <a style={{ float: 'left', margin: '20px' }}>
            <img src={name} height='150px' width='150px' />
          </a>
          <div className='teammate-information'>
            <h2>Sean O’Hare</h2>
            <p style={{ color: 'grey' }}>Team Leader</p>
            <p>Major : CS</p>
            <p>
              Git account :{' '}
              <a href='https://github.com/seanohare98'>seanohare98</a>{' '}
            </p>{' '}
            <p>Email : 1155116399@link.cuhk.edu.hk</p>
          </div>
        </div>
        <br />
        <br />
        <div className='box'>
          <a style={{ float: 'left', margin: '20px' }}>
            <img src={name} height='150px' width='150px' />
          </a>
          <div className='teammate-information'>
            <h2>Po Tsz Ying</h2>
            <p style={{ color: 'grey' }}>Team member</p>
            <p>Major : CE</p>
            <p>
              Git account :{' '}
              <a href='https://github.com/poilk199881'>poilk199881</a>{' '}
            </p>
            <p>Email : 1155110767@link.cuhk.edu.hk</p>
          </div>
        </div>
        <br />
        <br />
        <div className='box'>
          <a style={{ float: 'left', margin: '20px' }}>
            <img src={name} height='150px' width='150px' />
          </a>
          <div className='teammate-information'>
            <h2> Kong Chun Hay Leon</h2>
            <p style={{ color: 'grey' }}>Team member</p>
            <p>Major : CS/CE</p>
            <p>
              Git account : <a href='https://github.com/kchleon'>kchleon</a>{' '}
            </p>
            <p>Email : 1155108154@link.cuhk.edu.hk</p>
          </div>
        </div>
        <br />
        <br />
        <div className='box'>
          <a style={{ float: 'left', margin: '20px' }}>
            <img src={name} height='150px' width='150px' />
          </a>
          <div className='teammate-information'>
            <h2> Wong Ki Long</h2>
            <p style={{ color: 'grey' }}>Team member</p>
            <p>Major : CS/CE</p>
            <p>
              Git account : <a href='https://github.com/2013612'>2013612</a>{' '}
            </p>
            <p>Email : 1155093001@link.cuhk.edu.hk</p>
          </div>
        </div>
        <br />
        <br />
        <div className='box'>
          <a style={{ float: 'left', margin: '20px' }}>
            <img src={name} height='150px' width='150px' />
          </a>
          <div className='teammate-information'>
            <h2> LI Cheuk Man</h2>
            <p style={{ color: 'grey' }}>Team member</p>
            <p>Major : CS/CE</p>
            <p>
              Git account : <a href='https://github.com/LCM288'>LCM288</a>{' '}
            </p>
            <p>Email : 1155094029@link.cuhk.edu.hk</p>
          </div>
        </div>
      </div>
    );
  }
}
