import {shallow} from "enzyme";
import * as React from "react";
import Draft from "../../components/Draft";
import Player from "../../models/Player";
import Preset from "../../models/Preset";

it('Draft renders correctly', () => {
    const component = shallow(<Draft preset={Preset.SAMPLE} nameGuest={'Beastly Barbarossa'} nameHost={'Sneaky Saladin'}
                                     events={[]} nextAction={0} whoAmI={Player.HOST}/>);
    expect(component).toMatchSnapshot();
});
