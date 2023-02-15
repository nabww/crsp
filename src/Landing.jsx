import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import div from '@mui/material/div';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import './App.css'
import App from './App';


export default function Landing() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='container '>
     
    <div >
       <TabContext value={value}>
      <div>
         <div className='cont'>
      <h3 className='d-flex justify-content-center mt-5 mb-3'>CRSP CALCULATOR 1.0</h3>
      </div>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="1" label="CIF Computation" />
        <Tab value="2" label="CRSP Computation" />
      </Tabs>
    </div>
    <TabPanel value="1" index={0}>
        Item One
      </TabPanel>
      <TabPanel value="2" index={1}>
        <App/>
      </TabPanel>
      </TabContext>
    </div>
    </div>
  );
}