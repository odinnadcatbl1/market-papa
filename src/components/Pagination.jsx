import styled, { css } from "styled-components";
import { StyledButton } from "../styles/components";

export const StyledPagination = styled.div`
    padding: 30px 0;
    display: flex;
    justify-content: end;
`;

export const PaginationList = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
`;

export const PaginationItem = styled.li`
    padding: 15px;
    margin: 10px;
    background-color: #d8d8d8;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 700;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }

    ${(props) =>
        props.active &&
        css`
            color: white;
            background-color: #404040;
        `}
`;

const Pagination = ({ prev, next, jump, currentPage, maxPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= maxPage; i++) {
        pageNumbers.push(i);
    }

    if (maxPage === 0) {
        return <></>;
    }

    return (
        <StyledPagination>
            <StyledButton onClick={prev}>&#x25c0;</StyledButton>
            <PaginationList>
                {pageNumbers.map((page) => (
                    <PaginationItem
                        key={page}
                        active={currentPage === page}
                        onClick={() => {
                            jump(page);
                        }}
                    >
                        {page}
                    </PaginationItem>
                ))}
            </PaginationList>
            <StyledButton onClick={next}>&#x25ba;</StyledButton>
        </StyledPagination>
    );
};

export default Pagination;
