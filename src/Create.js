import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setisPending] = useState(false);
  const history = useHistory(); //this object represent history

  //On clicking to button this function will be CALLED
  const handleSumbit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setisPending(true);
    //Making POST Request
    fetch("http://localhost:8000/blogs", {
      method: "POST", //tYPE OF REQUEST WE ARE MAKING
      headers: { "Content-Type": "application/json" }, //We are sending the file type where to add
      body: JSON.stringify(blog), //We are sending the type of object to JSON File
    }).then(() => {
      console.log("New Blog Added"); //aFTER ADDING THIS WILL BE PRINTED IN CONSOLE
      setisPending(false);

      //history.go(-1);//Going number of steps back -1 means 1 step back
      history.push("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a New Blog!</h2>
      <form onSubmit={handleSumbit}>
        <label>Blog Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} //e=event Object
          required
        />

        <label>Blog Body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <label>Blog Author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
