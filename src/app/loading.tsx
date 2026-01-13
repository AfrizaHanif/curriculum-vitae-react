export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  // For this example, we'll use a simple Bootstrap spinner.
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5 className="mt-2">Loading...</h5>
      </div>
    </div>
  );
}
