export default function ErrorBanner({ message }) {
  if (!message) return null;

  return (
    <div className="error-banner">
      <i className="ti ti-wifi-off" aria-hidden="true" />
      <span>
        Tidak dapat terhubung ke backend <code>{message}</code>
      </span>
    </div>
  );
}
