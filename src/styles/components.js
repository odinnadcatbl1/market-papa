import styled, { css } from "styled-components";

export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 25px 15px;
`;

export const StyledTable = styled.table`
    padding: 20px 0;
    width: 100%;
    border: none;

    thead {
        th {
            font-weight: bold;
            border: none;
            padding: 10px 15px;
            background: #d8d8d8;
            font-size: 16px;
            transition: all 0.2s ease;
            cursor: pointer;

            &:hover {
                background-color: #f3f3f3;
            }

            &:first-child {
                border-radius: 10px 0 0 10px;
            }

            &:last-child {
                border-radius: 0 10px 10px 0;
            }
        }
    }

    tbody {
        width: 100%;
        td {
            text-align: left;
            border: none;
            padding: 10px 15px;
            font-size: 14px;
            vertical-align: top;
        }
        tr {
            &:nth-child(even) {
                background-color: #f3f3f3;
            }

            td {
                &:first-child {
                    border-radius: 10px 0 0 10px;
                }

                &:last-child {
                    border-radius: 0 10px 10px 0;
                }
            }
        }
    }
`;

export const StyledTableTitle = styled.h2`
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.04;
    text-transform: uppercase;
`;

export const StyledTableHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const StyledTableActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const StyledButton = styled.button`
    margin: 0 10px;
    background-color: ${(props) => props.color || "#d8d8d8"};
    border: none;
    border-radius: 5px;
    color: black;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 20px;
    cursor: pointer;

    transition: all 0.2s ease;
    &:hover {
        opacity: 0.7;
    }
`;

export const StyledInput = styled.input`
    width: ${(props) => props.width || "auto"};
    margin: 0 10px;
    padding: 10px 20px;
    border: 1px solid black;
    border-radius: 8px;
    color: black;
    font-size: 16px;

    &::placeholder {
        color: black;
        opacity: 1;
    }
`;

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
