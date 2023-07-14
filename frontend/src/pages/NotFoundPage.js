import {Button, Result} from "antd";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useKeyPress from "../components/UseKeyPress";

export const NotFoundPage = () => {

    const [isAllArrowsPressed, setIsAllArrowsPressed] = useState(false)
    const [count, setCount] = useState(0)
    const [text, setText] = useState("Кажется что-то изменилось")

    const isArrowLeftPressed = useKeyPress("ArrowLeft");
    const isArrowUpPressed = useKeyPress("ArrowUp");
    const isArrowRightPressed = useKeyPress("ArrowRight");
    const isArrowDownPressed = useKeyPress("ArrowDown");

    useEffect(() => {
        if (isArrowLeftPressed && isArrowUpPressed && isArrowRightPressed && isArrowDownPressed) {
            setIsAllArrowsPressed(true);
            setCount(count + 1);
        }
    }, [isArrowLeftPressed, isArrowUpPressed, isArrowRightPressed, isArrowDownPressed]);

    const handleClick = () => {
        if (count === 1) {
            setText("Эй ты, да, ты, давай ещё раз")
        }
        if (count === 2) {
            setText("Кажется, нужно ещё раз")
        }
        if (count === 3) {
            setText("Тыкни кнопку ещё раз")
        }
        if (count === 4) {
            setText("Давай ещё")
        }
        if (count === 5) {
            setText("Кажется мы уже близко")
        }

        setCount(count + 1);
        setIsAllArrowsPressed(false)
    }



    return (
        <Result
            status="404"
            title="404"
            subTitle={isAllArrowsPressed || count > 1 ? <div>{text}</div>
                : <div>Страница не найдена</div>}
            extra={
                <div>
                    <Button style={{marginBottom: 15}} type="primary"><Link to="/tasks">Назад на главную</Link></Button>
                    <br/>
                    {isAllArrowsPressed || (count > 0 && count < 6) ? <Button onClick={handleClick} type="primary"><Link to="/notfoundpage">Войти в неизвестность</Link></Button> : <></>}
                    {count === 6 ? <Button onClick={handleClick} type="primary"><Link to="https://youtu.be/JhigElj5Jto">Войти в неизвестность</Link></Button> : <></>}
                </div>
            }
        />
    )
}