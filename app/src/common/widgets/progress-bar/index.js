import "./styles/style.scss";
import React, {Component} from "react";

import ProgressBarMdl from 'react-mdl/lib/ProgressBar';

export default class ProgressBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            completed: 0,
        };
    }


    componentDidMount() {
        this.timer = setTimeout(() => this.progress(5), 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    progress(completed) {
        console.log('completed = ',completed);
        if (completed > 100) {
            this.setState({completed: 100});
        } else {
            this.setState({completed});
            const diff = Math.random() * 10;
            this.timer = setTimeout(() => this.progress(completed + diff), 50);
        }
        console.log('completed = ',this.state.completed);
    }

    render() {

        return (
            <ProgressBarMdl indeterminate className="progress-bar"/>
        )
    }
}

