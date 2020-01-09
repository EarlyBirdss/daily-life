import React, { useState, useEffect } from 'react';
import { getDairyList } from './service';

export default function Config() {
  const [list, setList] = useState([]);
  // useEffect(() => {
  //   setTimeout(() => console.log(32), 1000);
  // }, []);
  getDairyList()
    .then(res => console.log(res))
  return {
    render: () => <>Config</>
  }
}
