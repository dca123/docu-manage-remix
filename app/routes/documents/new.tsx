export default function NewDocumentRoute() {
  return (
    <div>
      <h1 className="text-lg font-bold">New Document</h1>
      <form method="post">
        <div>
          <label>
            Name: <input type="text" name="name" />
          </label>
        </div>
        <button type="submit">Create Document</button>
      </form>
    </div>
  );
}
