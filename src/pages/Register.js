import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import Header from '../components/Header';
import RegisterForm from '../components/Dashboard/RegisterForm';
import SideMenu from '../components/SideMenu';

const Register = ({ state }) => (
  <div>
    <Helmet title="Register" />
    <SideMenu />
    <div className="container-fluid">
      <Header
        title="Agrument"
        subTitle="Register"
        small
      />
      <RegisterForm data={state.forms.register} />
    </div>
  </div>
);

Register.propTypes = {
  state: PropTypes.shape().isRequired,
};

Register.defaultProps = {
  state: {},
};

export default Register;