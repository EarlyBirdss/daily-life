import React from 'react';
import { Result, Button } from 'antd';
import './index.less';

export default function Welcome() {
  return (
    <>
      <Result
        icon={<div className="welcome-icon" />}
        title="WELCOME!"
        subTitle="Welcome to Mathilda's Little Cabin. Get started and record anything related your life, then tell yourself how pleased you are!"
        extra={<Button type="primary">GO THIS WAY</Button>}
      />
    </>
  )
}