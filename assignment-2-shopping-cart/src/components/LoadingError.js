export default function LoadingError({ message = "Loading ..." }) {
  return <div className="loading-error text-red">{message}</div>;
}
