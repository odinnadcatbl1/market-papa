import styled, { css } from "styled-components";
import { StyledButton } from "../styles/components";
import {
    StyledPagination,
    PaginationList,
    PaginationItem,
} from "../styles/components";

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
