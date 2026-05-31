import { formatSpeed } from "../utils/formatters.js";

export default function NetworkCard({ rx, tx, iface }) {
  return (
    <div className="dashboard-card network-card">
      <div className="metric-label">
        <i className="ti ti-network" aria-hidden="true" />
        Network RX/TX
        {iface && <span className="card-chip">{iface}</span>}
      </div>
      <div className="network-grid">
        <div>
          <span>
            <i className="ti ti-arrow-down" aria-hidden="true" />
            RX
          </span>
          <strong>{formatSpeed(rx)}</strong>
        </div>
        <div>
          <span>
            <i className="ti ti-arrow-up" aria-hidden="true" />
            TX
          </span>
          <strong>{formatSpeed(tx)}</strong>
        </div>
      </div>
    </div>
  );
}
