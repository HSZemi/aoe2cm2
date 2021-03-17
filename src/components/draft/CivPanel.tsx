import * as React from 'react';
import ActionType from "../../constants/ActionType";
import Civilisation from "../../models/Civilisation";
import PlayerEvent from "../../models/PlayerEvent";
import Player from "../../constants/Player";
import CivPanelType from "../../constants/CivPanelType";
import {Util} from "../../util/Util";
import {Trans, WithTranslation, withTranslation} from "react-i18next";
import {Validator} from "../../models/Validator";
import {DraftsStore} from "../../models/DraftsStore";
import Draft from "../../models/Draft";
import {IDraftState} from "../../types";
import Preset from "../../models/Preset";

interface IProps extends WithTranslation {
    civilisation?: Civilisation;
    active: boolean;
    sniped?: Civilisation;
    stolen?: Civilisation;
    civPanelType: CivPanelType;
    whoAmI?: Player;
    triggerAction?: ActionType;
    byOpponent?: boolean;
    player?: Player;
    draft?: IDraftState;
    nextAction: number;
    iconStyle: string;
    flipped?: boolean;
    smooch?: boolean;
    side?: Player;

    onClickCivilisation?: (playerEvent: PlayerEvent, callback: any) => void;
}

interface IState {
    used: string;
}

class CivPanel extends React.Component<IProps, IState> {

    USED_CLASSES = ['is-hidden', 'used-crown', 'used-skull'];

    constructor(props: IProps) {
        super(props);
        this.state = {used: this.USED_CLASSES[0]};
    }

    public render() {
        const civilisation: Civilisation | undefined = this.props.civilisation;
        let image = <></>;
        let imageSrc: string = "";
        let civilisationKey = '';
        let civilisationName = '';
        let textClass: string = 'stretchy-text';
        let imageContainerClass: string = 'stretchy-image civ-indicator';
        if (civilisation !== undefined) {
            civilisationName = civilisation.name;
            imageSrc = "/images/civs/" + civilisationName.toLowerCase() + ".png";
            image = <img src={imageSrc} alt={civilisationName}/>;
            if (this.props.iconStyle === 'emblems') {
                imageSrc = "/images/civemblems/" + civilisationName.toLowerCase() + ".png";
                image = <img src={imageSrc} alt={civilisationName}/>;
            }
            if (this.props.iconStyle === 'units-animated' && !Util.isTechnicalCivilisation(civilisation)) {
                let videoSource = `/images/units-animated/${civilisationName.toLowerCase()}-right.webm`;
                let videoKey = 'video-right';
                if (this.useFlippedImage()) {
                    videoSource = `/images/units-animated/${civilisationName.toLowerCase()}-left.webm`;
                    videoKey = 'video-left';
                }
                image = <video autoPlay muted loop key={videoKey}>
                    <source src={videoSource} type="video/webm"/>
                </video>;
            }
            civilisationKey = 'civs.' + civilisationName;
            if (Util.isTechnicalCivilisation(civilisation)) {
                textClass += ' is-hidden';
            }
        }
        let className: string = 'civ-panel ' + this.props.civPanelType.toString();
        if (this.props.byOpponent) {
            className += ' by-opponent';
        }
        let onClickAction = () => {
        };
        if (this.props.civPanelType === CivPanelType.CHOICE) {
            className += ' is-inline-block';
            if (this.isValidOption()) {
                onClickAction = this.onClickCiv;
                className += ' choice-' + this.props.triggerAction;
            } else {
                className += ' choice-disabled';
            }
        } else {
            if ((this.props.civPanelType === CivPanelType.PICK || this.props.civPanelType === CivPanelType.STEAL) && this.isDraftCompleted()) {
                onClickAction = () => {
                    this.setState({...this.state, used: this.nextUsed(this.state.used)});
                }
            }
            className += ' is-inline-block';
        }
        if (this.props.active) {
            className += " active-choice";
        } else if (civilisation !== undefined) {
            className += ' has-value';
        }
        let contentClass: string = "box-content element-stack";
        if (this.props.civilisation !== undefined) {
            contentClass += " is-visible";
        }
        let snipeMarkerClass = "stretchy-image snipe-marker";
        if (this.props.sniped) {
            className += ' is-sniped';
        } else {
            snipeMarkerClass += ' is-hidden';
        }
        let stealMarkerClass = "stretchy-image steal-marker";
        if (this.props.stolen) {
            className += ' is-stolen';
        } else {
            stealMarkerClass += ' is-hidden';
        }
        let usedMarkerClass = "stretchy-image used-marker " + this.state.used;
        if (this.state.used !== this.USED_CLASSES[0]) {
            className += ' is-used';
        }
        let randomMarkerClass = "random-pick";
        if (!this.props.civilisation || !this.props.civilisation.isRandomlyChosenCiv) {
            randomMarkerClass += ' is-hidden';
        }
        let snipeRandomMarkerClass = "random-snipe";
        if (!this.props.sniped || !this.props.sniped.isRandomlyChosenCiv) {
            snipeRandomMarkerClass += ' is-hidden';
        }
        let stealRandomMarkerClass = "random-steal";
        if (!this.props.stolen || !this.props.stolen.isRandomlyChosenCiv) {
            stealRandomMarkerClass += ' is-hidden';
        }

        let randomMarker = <div className={randomMarkerClass} title="Random"/>;
        let randomStealMarker = <div className={stealRandomMarkerClass} title="Random Steal"/>;
        let randomSnipeMarker = <div className={snipeRandomMarkerClass} title="Random Snipe"/>;

        if (this.props.iconStyle === 'units-animated') {
            randomMarker = <div className={randomMarkerClass + ' animated'} title="Random">
                <video autoPlay muted loop key={'random-selection'}>
                    <source src="/images/units-animated/random-right.webm" type="video/webm"/>
                </video>
            </div>;
            randomStealMarker = <div className={stealRandomMarkerClass + ' animated'} title="Random Steal">
                <video autoPlay muted loop key={'random-steal'}>
                    <source src="/images/units-animated/random-right.webm" type="video/webm"/>
                </video>
            </div>;
            randomSnipeMarker = <div className={snipeRandomMarkerClass + ' animated'} title="Random Snipe">
                <video autoPlay muted loop key={'random-snipe'}>
                    <source src="/images/units-animated/random-right.webm" type="video/webm"/>
                </video>
            </div>;
        }

        return (
            <div className={className} onClick={onClickAction}>
                <div className={'stretchy-background'}/>
                <div className={contentClass}>
                    <div className="stretchy-wrapper">
                        <div className={imageContainerClass}>
                            {image}
                        </div>
                        {randomMarker}
                        <div className={stealMarkerClass}/>
                        {randomStealMarker}
                        <div className={snipeMarkerClass}/>
                        {randomSnipeMarker}
                        <div className={usedMarkerClass}/>
                        <div className={textClass}>
                            <Trans>{civilisationKey}</Trans>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private useFlippedImage() {
        return this.props.civPanelType !== CivPanelType.CHOICE
            && this.props.smooch
            && ((this.props.side === Player.HOST && !this.props.flipped)
                || (this.props.side === Player.GUEST && this.props.flipped));
    }

    private onClickCiv = () => {
        if (Util.notUndefined(this.props.onClickCivilisation, this.props.civilisation, this.props.whoAmI, this.props.player, this.props.triggerAction)) {
            const whoAmI = this.props.whoAmI as Player;
            const player = this.props.player as Player;
            if (whoAmI === Player.NONE) {
                return;
            }
            const civilisation = this.props.civilisation as Civilisation;
            const triggerAction = this.props.triggerAction as ActionType;
            const onClickCivilisation = this.props.onClickCivilisation as (playerEvent: PlayerEvent, callback: any) => void;
            onClickCivilisation(new PlayerEvent(player, triggerAction, civilisation, whoAmI), (data: any) => {
                console.log('act callback', data);
                if (data.status !== 'ok') {
                    alert(Util.buildValidationErrorMessage(data));
                }
            });
        }
    };


    private isValidOption() {
        if (Util.notUndefined(this.props.draft, this.props.whoAmI, this.props.triggerAction, this.props.player, this.props.civilisation)) {
            const whoAmI = this.props.whoAmI as Player;
            const player = this.props.player as Player;
            if (whoAmI === Player.NONE) {
                return false;
            }
            const draft = Draft.from(this.props.draft as Draft);
            const triggerAction = this.props.triggerAction as ActionType;
            if (![ActionType.PICK, ActionType.BAN, ActionType.SNIPE, ActionType.STEAL].includes(triggerAction)) {
                return false;
            }
            const civilisation = this.props.civilisation as Civilisation;
            let draftsStore = new DraftsStore();
            draftsStore.createDraft('draftId', draft);
            const errors = Validator.checkAllValidations('draftId', draftsStore, new PlayerEvent(player, triggerAction, civilisation, whoAmI));
            return errors.length === 0;
        }
        return false;
    }

    private isDraftCompleted(): boolean {
        if (this.props.draft === undefined || this.props.draft.preset === undefined) {
            return false;
        } else {
            const draft = this.props.draft;
            const preset = draft.preset as Preset;
            return this.props.nextAction >= preset.turns.length;
        }
    }

    private nextUsed(current: string) {
        const index = (this.USED_CLASSES.indexOf(current) + 1) % this.USED_CLASSES.length;
        return this.USED_CLASSES[index];
    }
}

export default withTranslation()(CivPanel);
