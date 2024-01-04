import { inputLabels } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { updateInputs } from "../../slice/slice";

/**
 * Returns component that contains input fields
 * @return {ReactNode}
 */

const InputTable = () => {
  const dispatch = useDispatch();

  const { errors, data, isLoading } = useSelector((state) => state.reducer);

  const onUpdateState = (key, value) => {
    dispatch(updateInputs({ key, value }));
  };

  return (
    <table className="border border-dark d-flex flex-column ms-3 me-3 rounded">
      <thead className="w-100 bg-secondary rounded-top text-white my-auto">
        <tr>
          <th className="ps-2">Input</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="d-flex flex-row flex-wrap gap-3 mt-3 mb-3 ms-3 me-4">
            {inputLabels.map((label) => (
              <div key={label}>
                <p>{label}</p>
                <input
                  type="number"
                  placeholder="Value"
                  onChange={(e) => {
                    onUpdateState(label, e.target.value);
                  }}
                />
              </div>
            ))}
          </td>
        </tr>
      </tbody>
      {!isLoading &&
        (errors ? (
          <div className="m-3 bg-danger rounded">
            <p className="m-2 text-white">{`Error message: ${errors}`}</p>
          </div>
        ) : (
          data.length > 0 && (
            <div className="m-3 bg-success rounded">
              <p className="m-2 text-white">
                {"Successfully Obtained Calculations"}
              </p>
            </div>
          )
        ))}
    </table>
  );
};

export default InputTable;
