export default function Signup() {
  return (
    <form className="auth-form">
      <div className="input-group">
        <label className="label">Username:</label>
        <input className="input" placeholder="Input your username..." />
      </div>
      <div className="input-group">
        <label className="label">Password:</label>
        <input className="input" placeholder="Input your password..." />
      </div>
      <input
        className="w-full blue-button cursor-pointer"
        type="submit"
        value="Submit"
      />
    </form>
  );
}
