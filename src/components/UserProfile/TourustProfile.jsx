import React, { useEffect } from 'react';
import s from './TouristProfile.module.css';
import { Field, Form, Formik } from 'formik';
import LogoutButton from '../Buttons/ButtonLogout';
import LoadAvatarContainer from '../Formik/LoadAvatarContainer';

export default function TourustProfile(props) {
  return (
    <div>
      <LoadAvatarContainer />
    </div>
  )
}
