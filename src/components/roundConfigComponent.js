import React, {useState} from "react";
import {Container, Form, Button} from "semantic-ui-react";
import {secondsToMS} from "../utils";

const RoundConfigComponent = (props) => {
    const [rounds, setRounds] = useState(12);
    const [roundSeconds, setRoundSeconds] = useState(180);
    const [roundRest, setRoundRest] = useState(60);
    const [warmUp, setWarmUp] = useState(30);

    const submitConfig = () => {
        props.onConfig({
            rounds,
            roundSeconds,
            roundRest,
            warmUp
        });
    }

    return <Container>
        <Form>
            <Form.Field>
                <Form.Input
                    label={`Rondas: ${rounds}`}
                    min={1}
                    max={12}
                    name='rondas'
                    onChange={(event, data) => { setRounds(parseInt(data.value)) }}
                    step={1}
                    type='range'
                    value={rounds}
                />
            </Form.Field>
            <Form.Field>
                <Form.Input
                    label={`Tiempo por ronda: ${secondsToMS(roundSeconds)}`}
                    min={10}
                    max={180}
                    name='tiempo'
                    onChange={(event, data) => { setRoundSeconds(parseInt(data.value)) }}
                    step={10}
                    type='range'
                    value={roundSeconds}
                />
            </Form.Field>
            <Form.Field>
                <Form.Input
                    label={`Descanso entre rondas: ${secondsToMS(roundRest)}`}
                    min={5}
                    max={120}
                    name='rest'
                    onChange={(event, data) => { setRoundRest(parseInt(data.value)) }}
                    step={5}
                    type='range'
                    value={roundRest}
                />
            </Form.Field>
            <Form.Field>
                <Form.Input
                    label={`Calentamiento inicial: ${secondsToMS(warmUp)}`}
                    min={5}
                    max={60}
                    name='warm'
                    onChange={(event, data) => { setWarmUp(parseInt(data.value)) }}
                    step={5}
                    type='range'
                    value={warmUp}
                />
            </Form.Field>
            <Button color={"blue"} fluid onClick={submitConfig}>A luchar!</Button>
        </Form>
    </Container>;
}

export default RoundConfigComponent;
