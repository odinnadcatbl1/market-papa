const sortByField = (field, direction) => {
    if (direction === true) {
        return (a, b) => (a[field] < b[field] ? 1 : -1);
    }
    return (a, b) => (a[field] > b[field] ? 1 : -1);
};

export default sortByField;
