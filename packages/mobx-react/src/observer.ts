import React, { FC, useEffect, useCallback, useState } from 'react';
import { reaction } from 'mobx';

export const observer = (component: FC) => {
  return React.memo((props) => {
    let rendering = null
    const [, setState] = useState([])
    const forceUpdate = useCallback(() => setState([]), [])
    const dispose = reaction(() => { rendering = component(props) }, forceUpdate)
    useEffect(() => dispose, [])
    return rendering
  })
}