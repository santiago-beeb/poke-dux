import { Input } from "antd";
import { useDispatch } from "react-redux";
import { setFilter } from "../slices/dataSlice";

const Searcher = () => {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <Input.Search
      placeholder="Buscar..."
      onChange={handleOnChange}
      style={{ marginBottom: "10px" }}
    />
  );
};
export { Searcher };
