import React, {useState} from 'react';
import './App.scss';
import StepComponent from "./components/stepComponent";
import RoundConfigComponent from "./components/roundConfigComponent";
import FightComponent from "./components/fightComponent";

function App() {
    const [config, setConfig] = useState(null);

    const getFightConfig = (configs) => setConfig(configs);

    const resetConfig = () => setConfig(null);

    return (
        <div className="App">
            <StepComponent step={config ? 2 : 1}/>
            {!config && <RoundConfigComponent onConfig={getFightConfig}/>}
            {config && <FightComponent config={config} onComplete={resetConfig}/>}
        </div>
    );
}

export default App;
