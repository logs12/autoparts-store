import React, {Component} from "react";
import shallowEqual from "react-redux/lib/utils/shallowEqual";


/**
 *
    @fetchData(
        ({auth: email}, {folder}) => ({email, folder}),
        ({email, folder}, actions) => email && actions.fetchStatus(folder)
    )
 * Декоратор для загрузки данных
 * @param getter
 * @param executor
 * @returns {function(): FetchDataDecorator}
 */
export default function fetchData(getter, executor) {
    return (DecoratedComponent) => class FetchDataDecorator extends Component {

        /**
         *  Перед началом рендера компонента
         */
        componentWillMount() {
            executor(getter(this.props, this.props.params), this.props.actions);
        }

        /**
         * Вызывается сразу после render.
         * @param prevProps
         */
        componentDidUpdate(prevProps) {
            const params = getter(this.props, this.props.params);
            const prevParams = getter(prevProps, prevProps.params);
            !shallowEqual(params, prevParams)
            && executor(params, this.props.actions);
        }

        render() {
            return <DecoratedComponent {...this.props} />;
        }
    };
};