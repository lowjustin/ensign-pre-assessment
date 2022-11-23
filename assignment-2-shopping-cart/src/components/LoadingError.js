export default function LoadingError(props) {
  const { message } = props;
  return <div className="loading-error text-red">{message}</div>;
}
