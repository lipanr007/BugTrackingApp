import React from 'react';
import DynamicTableBugs from '../components/DynamicTableBugs';
import Header from '../components/Header';
import { NavLink } from 'react-router-dom';
import Button from '@mui/joy/Button';

function TesterProjects() {
  return (
    <div>
      <Header />
      <DynamicTableBugs />
    </div>
  );
}

export default TesterProjects;
