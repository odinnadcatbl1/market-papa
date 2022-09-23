import styled from "styled-components";

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
    background-color: #d8d8d8;
    border: none;
    border-radius: 5px;
    color: black;
    font-size: 16px;
    padding: 10px 20px;
    cursor: pointer;

    transition: all 0.2s ease;
    &:hover {
        background-color: #f3f3f3;
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
