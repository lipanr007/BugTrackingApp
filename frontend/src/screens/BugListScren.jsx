import React from 'react';
import BugTableProj from '../components/TableBugsProj';
import Header from '../components/Header';
import { NavLink } from 'react-router-dom';
import Button from '@mui/joy/Button';

function BugListScreen() {
  return (
    <div>
      <Header />
      <BugTableProj />
    </div>
  );
}

export default BugListScreen;