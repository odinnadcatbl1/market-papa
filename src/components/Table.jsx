import { useEffect, useState } from "react";
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
import Select from "react-select";
import makeAnimated from "react-select/animated";

import searchFilter from "../utils/searchFilter";
import sortByField from "../utils/sortByField";

const Table = () => {
    const { data, error, loading } = useSelector((state) => state.data);
    const { fetchPosts } = useActions();

    const [selectValues, setSelectValues] = useState([]);
    const [selectOptions, setSelectOptions] = useState([{}]);
    const [searchWord, setSearchWord] = useState("");
    const [sortValue, setSortValue] = useState({
        sortBy: "id",
        direction: false,
    });
    const [filteredData, setFilteredData] = useState([]);

    const handlerSort = (e) => {
        if (sortValue.sortBy === e.target.id) {
            setSortValue({
                sortBy: e.target.id,
                direction: !sortValue.direction,
            });

            setFilteredData(
                [...filteredData].sort(
                    sortByField(e.target.id, !sortValue.direction)
                )
            );
        } else {
            setSortValue({
                sortBy: e.target.id,
                direction: false,
            });

            setFilteredData(
                [...filteredData].sort(sortByField(e.target.id, false))
            );
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        const selectOptions = [
            ...new Set(
                data.map((data) => {
                    return data.userId;
                })
            ),
        ];

        setSelectOptions(
            selectOptions.map((select) => {
                return { value: select, label: select };
            })
        );

        setFilteredData(data);
    }, [data]);

    useEffect(() => {
        if (selectValues.length) {
            const searchedData = searchFilter(data, searchWord);
            setFilteredData(
                searchedData.filter((data) => {
                    return selectValues
                        .map((select) => select.value)
                        .includes(data.userId);
                })
            );
        } else {
            setFilteredData(searchFilter(data, searchWord));
        }
    }, [searchWord, selectValues]);

    return (
        <Container>
            <StyledTableHeader>
                <StyledTableTitle>Posts</StyledTableTitle>
                <StyledTableActions>
                    <StyledButton>Добавить</StyledButton>
                    <StyledInput
                        width={"300px"}
                        placeholder="Поиск"
                        onChange={(e) => setSearchWord(e.target.value)}
                        value={searchWord}
                    />
                    <Select
                        options={selectOptions}
                        closeMenuOnSelect={false}
                        components={makeAnimated()}
                        isMulti
                        onChange={setSelectValues}
                        placeholder={"Фильтр"}
                        value={selectValues}
                    />
                </StyledTableActions>
            </StyledTableHeader>
            <StyledTable>
                <thead className="table__head">
                    <tr>
                        <th id="userId" onClick={handlerSort}>
                            UserId
                            {sortValue.sortBy === "userId" &&
                                (sortValue.direction ? (
                                    <>&#x25b2;</>
                                ) : (
                                    <>&#x25bc;</>
                                ))}
                        </th>
                        <th id="id" onClick={handlerSort}>
                            ID
                            {sortValue.sortBy === "id" &&
                                (sortValue.direction ? (
                                    <>&#x25b2;</>
                                ) : (
                                    <>&#x25bc;</>
                                ))}
                        </th>
                        <th id="title" onClick={handlerSort}>
                            Заголовок
                            {sortValue.sortBy === "title" &&
                                (sortValue.direction ? (
                                    <>&#x25b2;</>
                                ) : (
                                    <>&#x25bc;</>
                                ))}
                        </th>
                        <th id="body" onClick={handlerSort}>
                            Описание
                            {sortValue.sortBy === "body" &&
                                (sortValue.direction ? (
                                    <>&#x25b2;</>
                                ) : (
                                    <>&#x25bc;</>
                                ))}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {error ? (
                        <tr>Не удалось загрузить данные: {error}</tr>
                    ) : (
                        <></>
                    )}

                    {loading ? <tr>Загрузка данных, подождите..</tr> : <></>}
                    {filteredData.length ? (
                        filteredData.map((data) => (
                            <tr key={data.id}>
                                <td>{data.userId}</td>
                                <td>{data.id}</td>
                                <td>{data.title}</td>
                                <td>{data.body}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>Ничего не найдено..</tr>
                    )}
                </tbody>
            </StyledTable>
        </Container>
    );
};

export default Table;
