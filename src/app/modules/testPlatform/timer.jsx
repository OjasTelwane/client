import React from 'react'
import { useTimer } from 'react-timer-hook';

const Timer = ({expiryTimestamp}) => {
    const {
        seconds,
        minutes,
        hours
    } = useTimer({expiryTimestamp, onExpire: () => console.warn('onExpire called')});
    return (
            <div style={{fontSize: '30px'}}>
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
    )
}

export default Timer;
