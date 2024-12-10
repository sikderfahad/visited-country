export const setListItem = (items) => {
  if (typeof items === "object") {
    return (
      <ul className="list-decimal pl-4">
        {Object.values(items).map((lang, idx) => (
          <li key={idx}>{lang}</li>
        ))}
      </ul>
    );
  }
};

export const getDataFromLS = () => {
  const isData = localStorage.getItem("visited");
  if (isData) {
    return JSON.parse(isData);
  }
  return [];
};

export const saveDataToLs = (id, isRemove = false) => {
  const existingdata = getDataFromLS();
  if (existingdata.includes(id)) {
    if (isRemove) {
      const newData = existingdata.filter((saveId) => saveId !== id);
      localStorage.setItem("visited", JSON.stringify(newData));
      return newData;
    }
  }
  if (!existingdata.includes(id)) {
    const newData = [...existingdata, id];
    localStorage.setItem("visited", JSON.stringify(newData));
    return newData;
  }
  return existingdata;
};
