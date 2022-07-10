import React from 'react';
import containerStyle from './container.module.css';

const Container = (props) => {
  return (
    <div className={containerStyle.container}>
        {props.children}
    </div>
  )
}

export default Container;