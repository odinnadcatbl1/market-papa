import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Container,
    StyledTable,
    StyledTableHeader,
    StyledTableTitle,
    StyledTableActions,
    StyledInput,
    StyledButton,
} from "../styles/components";
import { useActions } from "../hooks/useActions";

const Table = () => {
    const { data } = useSelector((state) => state);
    const { fetchPosts } = useActions();

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <Container>
            <StyledTableHeader>
                <StyledTableTitle>Posts</StyledTableTitle>
                <StyledTableActions>
                    <StyledButton>Добавить</StyledButton>
                    <StyledInput width={"300px"} placeholder="Поиск" />
                </StyledTableActions>
            </StyledTableHeader>
            <StyledTable>
                <thead className="table__head">
                    <tr>
                        <th id="id" onClick={() => {}}>
                            ID
                        </th>
                        <th id="title" onClick={() => {}}>
                            Заголовок
                        </th>
                        <th id="body" onClick={() => {}}>
                            Описание
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>example</td>
                        <td>example</td>
                        <td>example</td>
                    </tr>
                </tbody>
            </StyledTable>
        </Container>
    );
};

export default Table;
