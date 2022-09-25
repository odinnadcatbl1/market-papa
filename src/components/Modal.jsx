import { useEffect } from "react";
import Select from "react-select";
import styled, { css } from "styled-components";
import {
    StyledActions,
    StyledButton,
    StyledInput,
    StyledTitle,
    ModalLayout,
    ModalContent,
} from "../styles/components";

const Modal = ({ active, setActive, onSubmit, isEditing, clickedId }) => {
    useEffect(() => {
        if (active) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [active]);

    return (
        <ModalLayout active={active} onClick={() => setActive(false)}>
            <ModalContent active={active} onClick={(e) => e.stopPropagation()}>
                <StyledTitle textAlign={"center"}>
                    {isEditing ? "Редактирование" : "Добавление"}
                </StyledTitle>
                <StyledInput placeholder="Введите заголовок.." />
                <StyledInput placeholder="Введите описание.." />
                <Select defaultValue={{ value: "1", label: "1" }} />
                <StyledActions>
                    <StyledButton onClick={() => setActive(false)}>
                        Отменить
                    </StyledButton>
                    <StyledButton>Сохранить</StyledButton>
                </StyledActions>
            </ModalContent>
        </ModalLayout>
    );
};

export default Modal;
