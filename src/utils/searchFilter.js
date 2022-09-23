const searchFilter = (data, searchWord) => {
    const filteredData = data.filter((item) => {
        let flag = false;
        Object.keys(item).forEach((key) => {
            if (item[key].toString().includes(searchWord)) {
                flag = true;
            }
        });
        return flag;
    });

    return filteredData;
};

export default searchFilter;
