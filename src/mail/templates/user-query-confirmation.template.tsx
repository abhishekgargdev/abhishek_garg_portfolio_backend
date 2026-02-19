import * as React from 'react';
import { EmailLayout } from './components';

interface UserQueryConfirmationEmailProps {
  userName: string;
  subject: string;
  message: string;
}

export const UserQueryConfirmationEmail: React.FC<
  UserQueryConfirmationEmailProps
> = ({ userName, subject, message }) => {
  return (
    <EmailLayout title="We Received Your Query">
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

          {/* Message */}
          <tr>
            <td
              style={{
                fontSize: '16px',
                lineHeight: '1.5',
                color: '#484848',
                paddingBottom: '20px',
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
              }}
            >
              Thank you for reaching out! We have received your query and will get
              back to you as soon as possible.
            </td>
          </tr>

          {/* Query Summary */}
          <tr>
            <td style={{ paddingBottom: '24px' }}>
              <table
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                style={{
                  borderCollapse: 'collapse',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '5px',
                }}
              >
                <tbody>
                  {/* Subject */}
                  <tr>
                    <td
                      style={{
                        padding: '12px 16px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#666666',
                        borderBottom: '1px solid #e9ecef',
                        fontFamily:
                          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                      }}
                    >
                      Subject
                    </td>
                    <td
                      style={{
                        padding: '12px 16px',
                        fontSize: '14px',
                        color: '#484848',
                        borderBottom: '1px solid #e9ecef',
                        fontFamily:
                          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                      }}
                    >
                      {subject}
                    </td>
                  </tr>

                  {/* Message Preview */}
                  <tr>
                    <td
                      style={{
                        padding: '12px 16px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#666666',
                        verticalAlign: 'top',
                        fontFamily:
                          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                      }}
                    >
                      Your Message
                    </td>
                    <td
                      style={{
                        padding: '12px 16px',
                        fontSize: '14px',
                        color: '#484848',
                        whiteSpace: 'pre-wrap',
                        fontFamily:
                          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                      }}
                    >
                      {message}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Response Time Note */}
          <tr>
            <td
              style={{
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#666666',
                paddingBottom: '16px',
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
              }}
            >
              <strong>Response Time:</strong> We typically respond within 24-48
              hours. If your query is urgent, please feel free to follow up.
            </td>
          </tr>

          {/* Closing */}
          <tr>
            <td
              style={{
                fontSize: '16px',
                lineHeight: '1.5',
                color: '#484848',
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
              }}
            >
              Best regards,
              <br />
              Abhishek Garg
            </td>
          </tr>
        </tbody>
      </table>
    </EmailLayout>
  );
};

export default UserQueryConfirmationEmail;

