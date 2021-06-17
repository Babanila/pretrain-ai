import React from "react";
import { useHistory } from "react-router-dom";
import { cx, css } from "emotion";
import FormComponent from "./FormComponent";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";
import SingleButton from "./SingleButton";
import { fetcher, localDatabaseUrl, dataPoster } from "./Utils";

const intentDetailsDivStyle = css`
  margin-top: 8em;
  width: 400px;
  height: auto;
  display: flex;
  align-self: center;
  flex-direction: column;
  border: 1px solid #f54b3a;
  border-radius: 5px;
`;

const intentDetailsDivTitle = css`
  align-self: center;
  font-size: 2em;
  padding: 20px 0px;
`;

const intentDetailsBtnGroup = css`
  margin-bottom: 20px;
  width: 65%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  outline: none;
  background-color: #ffffff;
  color: #000000;
  font-size: 1.2em;
`;

const updateBtnStyle = css`
  padding: 10px;
  font-size: 1em;
  color: #009900;
  border: 2px solid #009900;
  background-color: #ffffff;
  border-radius: 5px;
  outline: none;
  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #009900;
  }
`;

const deleteBtnStyle = css`
  padding: 10px;
  font-size: 1em;
  outline: none;
  border: 2px solid #ff0000;
  border-radius: 5px;
  color: #ff0000;
  background-color: #ffffff;
  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #ff0000;
  }
`;

const backBtnStyle = css`
  padding: 10px;
  font-size: 1em;
  color: #000000;
  background-color: #ffffff;
  border: 2px solid #000000;
  border-radius: 5px;
  outline: none;
  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #000000;
  }
`;

function SingleIntentDetails({ match }) {
  const history = useHistory();
  const [selectedIntent, setSelectedIntent] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const id = parseInt(match.params.id);
  const url = `${localDatabaseUrl}/intent/${id}`;
  const updateUrl = `${localDatabaseUrl}/edit_intent/${id}`;
  const deleteUrl = `${localDatabaseUrl}/delete_intent/${id}`;

  const getIntentById = (intents, id) => {
    const result = intents.find((intent) => intent.id === id);
    return result ? result : "Intent not there";
  };

  React.useEffect(() => {
    fetcher(url, setSelectedIntent, setError, setLoading);
  }, [id, url, updateUrl, deleteUrl]);

  const handleDataChange = ({ target }) => {
    const { name, value } = target;
    setSelectedIntent((state) => ({
      ...state,
      reply: {
        ...state.reply,
        id: name === "id" ? value : state.reply.id,
        text: name === "text" ? value : state.reply.text,
      },
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      if (isNaN(selectedIntent.name)) {
        alert("Name must be given.");
      } else {
        const { data } = await dataPoster(updateUrl, "put", selectedIntent);
        alert(data);
        history.push(`/intent/${id}`);
      }
    } catch (_) {}
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await dataPoster(deleteUrl, "delete", "");
      alert(data);
      history.push("/");
    } catch (_) {}
  };

  const handleBack = () => history.push(`/`);

  if (error) return <ErrorComponent />;
  if (loading) return <LoadingComponent />;

  return (
    <div className={cx(intentDetailsDivStyle)}>
      <div className={cx(intentDetailsDivTitle)}>Intent Details</div>
      <FormComponent
        formData={selectedIntent}
        handleSubmit={handleUpdate}
        handleInputChange={handleDataChange}
      />
      <div className={cx(intentDetailsBtnGroup)}>
        <SingleButton btnName="Update" btnClick={handleUpdate} btnStyles={updateBtnStyle} />
        <SingleButton btnName="Delete" btnClick={handleDelete} btnStyles={deleteBtnStyle} />
        <SingleButton btnName="Back" btnClick={handleBack} btnStyles={backBtnStyle} />
      </div>
    </div>
  );
}

export default SingleIntentDetails;
