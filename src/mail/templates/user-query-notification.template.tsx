import * as React from 'react';
import { EmailLayout } from './components';

interface UserQueryNotificationEmailProps {
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
  queryId: string;
}

export const UserQueryNotificationEmail: React.FC<
  UserQueryNotificationEmailProps
> = ({ userName, userEmail, subject, message, queryId }) => {
  return (
    <EmailLayout title="New User Query Received">
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
              Hello Admin,
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
              You have received a new query from your portfolio website. Here are
              the details:
            </td>
          </tr>

          {/* Query Details */}
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
                  {/* Query ID */}
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
                      Query ID
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
                      {queryId}
                    </td>
                  </tr>

                  {/* User Name */}
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
                      Name
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
                      {userName}
                    </td>
                  </tr>

                  {/* User Email */}
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
                      Email
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
                      <a
                        href={`mailto:${userEmail}`}
                        style={{ color: '#5469d4', textDecoration: 'none' }}
                      >
                        {userEmail}
                      </a>
                    </td>
                  </tr>

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

                  {/* Message */}
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
                      Message
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

          {/* Footer Note */}
          <tr>
            <td
              style={{
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#666666',
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
              }}
            >
              Please respond to this query at your earliest convenience.
            </td>
          </tr>
        </tbody>
      </table>
    </EmailLayout>
  );
};

export default UserQueryNotificationEmail;

