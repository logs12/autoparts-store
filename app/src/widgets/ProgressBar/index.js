import "./styles/style.scss";
import React, {Component} from "react";

export default class ProgressBar extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        componentHandler.upgradeDom();
    }

    render() {
        return (
            <div id="p2" className="progress-bar mdl-progress mdl-js-progress mdl-progress__indeterminate">
            </div>
        )
    }
}

