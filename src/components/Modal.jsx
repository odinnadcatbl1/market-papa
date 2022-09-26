import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import styled, { css } from "styled-components";
import { useActions } from "../hooks/useActions";
import {
    StyledActions,
    StyledButton,
    StyledInput,
    StyledTitle,
    ModalLayout,
    ModalContent,
    StyledForm,
} from "../styles/components";

const Modal = ({ active, setActive, clickedId, options }) => {
    const { data } = useSelector((state) => state.data);
    const { addPost, changePost } = useActions();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userId, setUserId] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        if (userId.value && title && body) {
            if (clickedId) {
                changePost({
                    id: clickedId,
                    userId: userId.value,
                    title: title,
                    body: body,
                });
            } else {
                addPost({
                    id: data.length + 1,
                    userId: userId.value,
                    title: title,
                    body: body,
                });
            }
            setTitle("");
            setBody("");
            setUserId("");
            setActive(false);
        }
    };

    useEffect(() => {
        if (active) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        if (clickedId) {
            setUserId(
                [...data].filter((post) => post.id === clickedId)[0].userId
            );
            setTitle(
                [...data].filter((post) => post.id === clickedId)[0].title
            );
            setBody([...data].filter((post) => post.id === clickedId)[0].body);
        }
    }, [active]);

    return (
        <ModalLayout active={active} onClick={() => setActive(false)}>
            <ModalContent active={active} onClick={(e) => e.stopPropagation()}>
                <StyledForm onSubmit={(e) => onSubmit(e)}>
                    <StyledTitle textAlign={"center"}>
                        {clickedId ? "Редактирование" : "Добавление"}
                    </StyledTitle>
                    <StyledInput
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Введите заголовок.."
                    />
                    <StyledInput
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Введите описание.."
                    />
                    <Select
                        options={options}
                        placeholder={"Выберите userId"}
                        onChange={setUserId}
                        value={userId}
                    />
                    <StyledActions>
                        <StyledButton
                            type="button"
                            onClick={() => setActive(false)}
                        >
                            Отменить
                        </StyledButton>
                        <StyledButton type="submit">Сохранить</StyledButton>
                    </StyledActions>
                </StyledForm>
            </ModalContent>
        </ModalLayout>
    );
};

export default Modal;
