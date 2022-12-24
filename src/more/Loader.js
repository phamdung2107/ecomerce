import "./Loading.css";

const Loading = () => {
    return (
        <div className="loading">
           <input type="checkbox" id="check" />
           <label className="label1" htmlFor="check">
          <div className="check-icon"></div>
          </label>
        </div>
    )
}

export default Loading;
