import React, { useState } from "react";
import { useShortenUrlMutation } from "../apis/applicationApi";
import styles from "../pages/dashBoard.module.css";

const Dashboard =()=> {
  const [longUrl, setLongUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [shortenUrl, { isLoading }] = useShortenUrlMutation();

  const handleShortenUrl = async () => {
     if (!longUrl) {
        setMessage({ text: "Please enter a URL", type: "error" });
        return;
    }
    setMessage({ text: "", type: "" });
    setShortenedUrl(null);

    try {
      const result = await shortenUrl({longUrl}).unwrap();
      console.log(result)
      const shortCode = result.data.shortUrl;
      setShortenedUrl(`${import.meta.env.VITE_URL_SHORTNER_SYSTEM}/url/r/${shortCode}`);;
      setMessage({ text: "URL shortened successfully!", type: "success" });
    } catch (error) {
      const errorMessage = error?.data?.message || error?.message ||"Failed to shorten URL. Please try again.";
      setMessage({
        text: errorMessage,
        type: "error",
      });
      console.log(error.data?.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setMessage({ text: "Copied to clipboard!", type: "success" });
    setTimeout(() => setMessage({ text: "", type: "" }), 2000);
  };

  const handleNewUrl = () => {
    setLongUrl("");
    setShortenedUrl(null);
    setMessage({ text: "", type: "" });
  };

  return (
    <div className={styles.container}>
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.headerLeft}>
                    <div className={styles.logo}>🔗</div>
                    <h1 className={styles.title}>URL Shortener</h1>
                </div>
                <button className={styles.logoutBtn} onClick={() => {localStorage.removeItem("token");
                     window.location.href = "/";}}>
                     Logout
                </button>
            </div>
        </header>

        <main className={styles.main}>
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>Shorten Your URL</h2>

          {message.text && (
            <div className={message.type === "success"
                  ? `${styles.message} ${styles.messageSuccess}`
                  : `${styles.message} ${styles.messageError}`}>
              {message.text}
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>Enter Long URL</label>
            <input
              type="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com/your-very-long-url"
              className={styles.input}
              disabled={isLoading}
              required
            />
          </div>

          <button
            onClick={handleShortenUrl}
            disabled={isLoading}
            className={styles.submitBtn}
          >
            {isLoading ? "Shortening..." : "Shorten URL"}
          </button>

          {shortenedUrl && (
            <div className={styles.resultSection}>
              <div className={styles.resultLabel}>Your shortened URL:</div>
              <div className={styles.resultBox}>
                <input
                  type="text"
                  value={shortenedUrl}
                  readOnly
                  className={styles.resultInput}
                />
                <button onClick={copyToClipboard} className={styles.copyBtn}>
                  📋 Copy
                </button>
              </div>
              <button onClick={handleNewUrl} className={styles.newUrlBtn}>
                Create Another Short URL
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
export default Dashboard
