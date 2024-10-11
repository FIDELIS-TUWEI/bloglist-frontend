import PropTypes from "prop-types";

import { useState } from "react";

const Toggleable = (props) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: loginVisible ? 'none' : '' };
    const showWhenVisible = { display: loginVisible ? '': 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
};

Toggleable.propTypes = {
    buttonLabel: PropTypes.string,
    children: PropTypes.node.isRequired
}

export default Toggleable;