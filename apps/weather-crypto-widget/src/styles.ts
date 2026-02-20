import { css } from 'lit';

export const globalStyles = css`
  :host {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  }

  .widget-card {
    background: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    min-width: 320px;
    max-width: 400px;
  }

  .widget-content {
    padding: 1.25rem;
    color: #6b7280;
  }

  .widget-secondary-text {
    font-size: 0.75rem;
  }

  .weather-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 1.25rem;
  }

  .weather-title {
    font-size: 2rem;
    color: #1a1a2e;
  }

  .weather-icon {
    width: 64px;
    height: 64px;
  }

  .bitcoin-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .bitcoin-title {
    font-size: 1.5rem;
    color: #1a1a2e;
  }

  .bitcoin-icon {
    display: flex;
    width: 64px;
    height: 64px;
    justify-content: center;
  }

  .bitcoin-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #f7931a 0%, #ffab40 100%);
    border-radius: 50%;
    color: white;
    font-weight: 700;
    font-size: 1.5rem;
  }

  .bitcoin-up {
    font-weight: 700;
    color: #10b981;
  }

  .bitcoin-down {
    font-weight: 700;
    color: #ef4444;
  }

  /* Loading */

  .loading-state {
    padding: 3rem 2rem;
    text-align: center;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e5e7eb;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .loading-text {
    color: var(--widget-text-secondary);
    font-size: 0.875rem;
  }

  /* Error section */
  .error-state {
    padding: 2rem;
    text-align: center;
  }

  .error-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #ebce51;
  }

  .error-message {
    color: #ef4444;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
`;
