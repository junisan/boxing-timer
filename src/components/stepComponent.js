import React from "react";
import {Step, Icon} from "semantic-ui-react";

const StepComponent = (props) => {

    return <Step.Group fluid>
        <Step active={props.step === 1} completed={props.step > 1}>
            <Icon name='cogs'/>
            <Step.Content>
                <Step.Title>Configuración</Step.Title>
                <Step.Description>Configure las rondas</Step.Description>
            </Step.Content>
        </Step>

        <Step disabled={props.step < 2} active={props.step === 2}>
            <Icon name='play'/>
            <Step.Content>
                <Step.Title>Competir</Step.Title>
                <Step.Description>A luchar!</Step.Description>
            </Step.Content>
        </Step>
    </Step.Group>
}

export default StepComponent;
