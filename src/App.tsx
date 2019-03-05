import * as React from 'react';
import './App.css';
import Draft from "./components/Draft";
import Player from "./models/Player";
import Preset from "./models/Preset";

class App extends React.Component {
    public render() {
        return (
            <div id={'wrapper'} className={'wrapper'}>
                <Draft preset={Preset.SAMPLE} nameGuest={'Beastly Barbarossa'} nameHost={'Sneaky Saladin'}
                       events={[]} nextAction={0} whoAmI={Player.HOST}/>
            </div>
        );
    }
}

export default App;
