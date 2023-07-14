import { useEffect, useState } from "react";

const useKeyPress = (keyTarget) => {
    const [isKeyPressed, setIsKeyPressed] = useState(false);

    const downHandler = ({ key }) => {
        if (key === keyTarget) {
            setIsKeyPressed(true);
        }
    };

    const upHandler = ({ key }) => {
        if (key === keyTarget) {
            setIsKeyPressed(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            downHandler(event);
        };

        const handleKeyUp = (event) => {
            upHandler(event);
        };

        window.addEventListener("keydown", handleKeyDown);
        //window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [keyTarget]);

    return isKeyPressed;
};

export default useKeyPress;