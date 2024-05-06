import { useState, useEffect } from "react";
import "./App.css";
import { getInvoiceData } from "./getInvoiceData";

function App() {
  const [code, setCode] = useState(null);
  const [clientCredentials, setClientCredentials] = useState({
    client_id:
      localStorage.getItem("client_id") || process.env.REACT_APP_CLIENT_ID,
    client_secret:
      localStorage.getItem("client_secret") ||
      process.env.REACT_APP_CLIENT_SECRET,
  });
  const [tokens, setTokens] = useState({ accessToken: "", refreshToken: "" });
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [baseUrl, setBaseUrl] = useState(
    "https://openapi.taxes.gov.il/shaam/tsandbox/"
  );

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const retrievedCode = query.get("code");
    if (retrievedCode && !code) {
      setCode(retrievedCode);
      window.history.pushState({}, null, window.location.pathname); // Optionally clear code from URL
    }
  }, [code]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setClientCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleBaseUrlChange = (event) => {
    setBaseUrl(event.target.value);
  };

  const authorize = () => {
    if (!clientCredentials.client_id || !clientCredentials.client_secret) {
      alert("Client ID and Client Secret are required.");
      return;
    }
    window.location.href = `${baseUrl}longtimetoken/oauth2/authorize?response_type=code&client_id=${clientCredentials.client_id}&scope=scope`;
  };

  const getToken = () => {
    if (
      !clientCredentials.client_id ||
      !clientCredentials.client_secret ||
      !code
    ) {
      alert("Client ID, Client Secret, and Authorization Code are required.");
      return;
    }
    setLoading(true);
    const authHeader = `Basic ${btoa(
      `${clientCredentials.client_id}:${clientCredentials.client_secret}`
    )}`;
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://localhost:3001/",
      scope: "scope",
    });

    fetch(`${baseUrl}longtimetoken/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authHeader,
      },
      body: body.toString(),
    })
      .then((response) => response.json())
      .then((data) => {
        setTokens({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        });
        setCode(null); // Optionally clear the code after it's used
        setMessage("Token retrieved successfully.");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Get token error:", error);
        setMessage("Failed to retrieve token.");
        setLoading(false);
      });
  };

  const getInvoice = () => {
    setLoading(true);
    fetch(`${baseUrl}Invoices/v1/Approval`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.accessToken}`,
        Accept: "application/json",
      },
      body: JSON.stringify(getInvoiceData()),
    })
      .then((response) => response.json())
      .then((data) => {
        setConfirmationNumber(data.Confirmation_Number);
        setMessage("Invoice processed successfully.");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Approval error:", error);
        setMessage("Failed to process invoice.");
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Application Control Panel</h1>
      <div className="card mb-3">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="baseUrl" className="form-label">
              Base URL
            </label>
            <select
              className="form-select"
              id="baseUrl"
              value={baseUrl}
              onChange={handleBaseUrlChange}
            >
              <option value="https://openapi.taxes.gov.il/shaam/tsandbox/">
                Sandbox
              </option>
              <option value="https://openapi.taxes.gov.il/shaam/production/">
                Production
              </option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="client_id" className="form-label">
              Client ID
            </label>
            <input
              type="text"
              className="form-control"
              id="client_id"
              name="client_id"
              value={clientCredentials.client_id}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="client_secret" className="form-label">
              Client Secret
            </label>
            <input
              type="text"
              className="form-control"
              id="client_secret"
              name="client_secret"
              value={clientCredentials.client_secret}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={authorize}
            disabled={loading}
          >
            {code ? "Reauthorize" : "Get Authorization Code"}
          </button>
          {code && (
            <button
              className="btn btn-secondary ms-2"
              onClick={getToken}
              disabled={loading}
            >
              Get Token
            </button>
          )}
        </div>
      </div>

      {code && (
        <div className="alert alert-info">Authorization Code: {code}</div>
      )}

      {message && (
        <div
          className={`alert ${
            message.includes("successfully") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}

      {tokens.accessToken && (
        <div className="card">
          <div className="card-body">
            <h4>Access Token: {tokens.accessToken}</h4>
            <h4>Refresh Token: {tokens.refreshToken}</h4>
            <button
              className="btn btn-primary"
              onClick={getInvoice}
              disabled={loading}
            >
              Get Invoice
            </button>
          </div>
        </div>
      )}
      {confirmationNumber && (
        <div className="card mt-3">
          <div className="card-body">
            <h3>Confirmation Number: {confirmationNumber}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
