import * as React from 'react';
import { EmailLayout } from './components';

interface PasswordResetConfirmationEmailProps {
  userName: string;
  loginUrl: string;
}

export const PasswordResetConfirmationEmail: React.FC<
  PasswordResetConfirmationEmailProps
> = ({ userName, loginUrl }) => {
  return (
    <EmailLayout title="Password Reset Successful">
      <table
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        style={{ borderCollapse: 'collapse' }}
      >
        <tbody>
          {/* Greeting */}
          <tr>
            <td
              style={{
                fontSize: '16px',
                lineHeight: '1.5',
                color: '#484848',
                paddingBottom: '16px',
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
              }}
            >
              Hello {userName},
            </td>
          </tr>

          {/* Success Message */}
          <tr>
            <td style={{ paddingBottom: '20px' }}>
              <table
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                style={{
                  borderCollapse: 'collapse',
                  backgroundColor: '#d4edda',
                  borderRadius: '5px',
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        padding: '16px',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        color: '#155724',
                        fontFamily:
                          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                      }}
                    >
                      ✓ Your password has been successfully reset.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Information */}
          <tr>
            <td
              style={{
                fontSize: '16px',
                lineHeight: '1.5',
                color: '#484848',
                paddingBottom: '16px',
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
              }}
            >
              Your password has been changed successfully. You can now log in to
              your account using your new password.
            </td>
          </tr>

          {/* Security Notice */}
          <tr>
            <td style={{ paddingBottom: '20px' }}>
              <table
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                style={{
                  borderCollapse: 'collapse',
                  backgroundColor: '#fff3cd',
                  borderRadius: '5px',
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        padding: '16px',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        color: '#856404',
                        fontFamily:
                          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                      }}
                    >
                      <strong>Security Notice:</strong> If you did not make this
                      change, please contact our support team immediately as
                      your account may have been compromised.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* CTA Button */}
          <tr>
            <td style={{ paddingBottom: '24px', paddingTop: '8px' }}>
              <table
                cellPadding="0"
                cellSpacing="0"
                style={{ borderCollapse: 'collapse' }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        backgroundColor: '#5469d4',
                        borderRadius: '5px',
                        textAlign: 'center' as const,
                      }}
                    >
                      <a
                        href={loginUrl}
                        style={{
                          display: 'inline-block',
                          padding: '14px 32px',
                          color: '#ffffff',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          textDecoration: 'none',
                          fontFamily:
                            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                        }}
                      >
                        Log In Now
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Timestamp */}
          <tr>
            <td
              style={{
                fontSize: '12px',
                lineHeight: '1.5',
                color: '#8898aa',
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
              }}
            >
              This password change was made on{' '}
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </EmailLayout>
  );
};

export default PasswordResetConfirmationEmail;
