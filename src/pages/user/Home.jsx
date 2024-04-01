import React, { useEffect, useState } from 'react';
import Rooms from '../../components/user/Rooms'
import Banner from '../../components/user/Banner'
import { useNavigate } from 'react-router-dom';
import HomeMainPanel from '../../components/user/HomeMainPanel';
import Testimony from '../../components/user/Testimony';

export default function Home() {




  return (
    <div>
      <HomeMainPanel />
      <Rooms />
      <Banner />
      <Testimony />
    </div>
  )
}
