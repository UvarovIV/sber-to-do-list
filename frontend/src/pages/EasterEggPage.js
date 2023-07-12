import {Button, Result} from "antd";
import {Link} from "react-router-dom";
import React from "react";

export const EasterEggPage = () => {

    const handleClick = () => {

    }


    return (
        <Result
            status="404"
            title="404"
            subTitle={<div>Страница не найдена</div>}
            extra={
                <div>
                    <Button style={{marginBottom: 15}} type="primary">
                        <Link to="/profile">
                            Назад на главную
                        </Link>
                    </Button>
                </div>
            }
        />
    )
}

export default EasterEggPage