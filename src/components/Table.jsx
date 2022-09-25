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

import usePagination from "../hooks/usePagination";

import { useActions } from "../hooks/useActions";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import searchFilter from "../utils/searchFilter";
import sortByField from "../utils/sortByField";
import Pagination from "./Pagination";

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

    const { prev, next, jump, maxPage, currentData, currentPage } =
        usePagination(filteredData, 10);

    const handlerSort = (e) => {
        jump(1);

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

    const onSearch = (e) => {
        jump(1);
        setSearchWord(e.target.value);
        if (selectValues.length) {
            setFilteredData(
                searchFilter(data, e.target.value)
                    .sort(sortByField(sortValue.sortBy, sortValue.direction))
                    .filter((data) => {
                        return selectValues
                            .map((select) => select.value)
                            .includes(data.userId);
                    })
            );
        } else {
            setFilteredData(
                searchFilter(data, e.target.value).sort(
                    sortByField(sortValue.sortBy, sortValue.direction)
                )
            );
        }
    };

    const onSelect = (values) => {
        jump(1);

        setSelectValues(values);
        if (values.length) {
            setFilteredData(
                searchFilter(data, searchWord)
                    .sort(sortByField(sortValue.sortBy, sortValue.direction))
                    .filter((data) => {
                        return values
                            .map((select) => select.value)
                            .includes(data.userId);
                    })
            );
        } else {
            setFilteredData(
                searchFilter(data, searchWord).sort(
                    sortByField(sortValue.sortBy, sortValue.direction)
                )
            );
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        setFilteredData(searchFilter(data, searchWord));

        setSelectOptions(
            [...new Set(data.map((data) => data.userId))].map((select) => {
                return { value: select, label: select };
            })
        );
    }, [data]);

    useEffect(() => {
        if (currentPage === 0) {
            jump(1);
        }
    }, [searchWord]);

    return (
        <Container>
            <StyledTableHeader>
                <StyledTableTitle>Posts</StyledTableTitle>
                <StyledTableActions>
                    <StyledButton>Добавить</StyledButton>
                    <StyledInput
                        width={"300px"}
                        placeholder="Поиск"
                        onChange={onSearch}
                        value={searchWord}
                    />
                    <Select
                        options={selectOptions}
                        closeMenuOnSelect={false}
                        components={makeAnimated()}
                        isMulti
                        onChange={onSelect}
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
                    {error && !loading && (
                        <tr>
                            <td>Не удалось загрузить данные: {error}</td>
                        </tr>
                    )}

                    {loading && (
                        <tr>
                            <td>Загрузка данных, подождите.</td>
                        </tr>
                    )}
                    {currentData().length ? (
                        currentData().map((data) => (
                            <tr key={data.id}>
                                <td>{data.userId}</td>
                                <td>{data.id}</td>
                                <td>{data.title}</td>
                                <td>{data.body}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>Ничего не найдено..</td>
                        </tr>
                    )}
                </tbody>
            </StyledTable>

            {filteredData.length > 10 && (
                <Pagination
                    prev={prev}
                    next={next}
                    jump={jump}
                    currentPage={currentPage}
                    currentData={filteredData}
                    maxPage={maxPage}
                />
            )}
        </Container>
    );
};

export default Table;
