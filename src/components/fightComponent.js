import React, {useEffect, useState} from "react";
import {Button, Container, Statistic} from "semantic-ui-react";
import BellSound from '../assets/sounds/bell.mp3';
import GongSound from '../assets/sounds/gong.mp3';
import {secondsToMS} from "../utils";

const WARMUP_STATE = 'warmup';
const FIGHT_STATE = 'fight';
const REST_STATE = 'rest';

const getColor = (status) => ([WARMUP_STATE, REST_STATE].includes(status)) ? 'green': 'red';

const getStatusText = (status) => {
    if (status === WARMUP_STATE) return 'Calienta!';
    if (status === REST_STATE) return 'Descansa!';
    return 'Lucha!';
}

const FightComponent = (props) => {
    const [currentState, setCurrentState] = useState(WARMUP_STATE);
    const [currentTimer, setCurrentTimer] = useState(props.config.warmUp);
    const [currentRound, setCurrentRound] = useState(0);

    const [currentTime, setCurrentTime] = useState(0);
    const [lastTime, setLastTime] = useState(0);


    useEffect(() => {
        if(currentTime === lastTime) {
            return;
        }

        if (currentTimer > 0 ) {
            setCurrentTimer(currentTimer - 1);
        } else {
            let sound;
            switch(currentState) {
                case WARMUP_STATE:
                case REST_STATE:
                    setCurrentRound(currentRound + 1);

                    setCurrentState(FIGHT_STATE);
                    setCurrentTimer(props.config.roundSeconds);
                    if (currentRound === props.config.rounds) {
                        return props.onComplete();
                    }
                    sound = BellSound;
                    break;
                case FIGHT_STATE:
                    setCurrentState(REST_STATE);
                    setCurrentTimer(props.config.roundRest);
                    sound = GongSound;
                    break;
                default:
                    throw new Error('Undefined state');
            }
            (new Audio(sound)).play();
        }

        setLastTime(currentTime);
    }, [props, currentTime, lastTime, currentState, currentTimer, currentRound]);

    //Clock effect
    useEffect(() => {
        const timing = setTimeout(() => {
            setCurrentTime(currentTime + 1);
        }, 1000);
        return () => {clearTimeout(timing)};
    }, [currentTime]);

    return <Container>
        <Statistic size={"huge"} color={getColor(currentState)} className={"action"}>
            <Statistic.Value>{secondsToMS(currentTimer)}</Statistic.Value>
            <Statistic.Label>{getStatusText(currentState)}</Statistic.Label>
        </Statistic>

        <Statistic color={"violet"} className={"round"}>
            <Statistic.Value>{currentRound}/{props.config.rounds}</Statistic.Value>
            <Statistic.Label>Ronda</Statistic.Label>
        </Statistic>

        <Button color={"red"} fluid onClick={props.onComplete}>Cancelar</Button>

    </Container>;
}

export default FightComponent;
