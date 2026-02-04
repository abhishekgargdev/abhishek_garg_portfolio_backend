import * as React from 'react';

interface EmailHeaderProps {
  title: string;
}

export const EmailHeader: React.FC<EmailHeaderProps> = ({ title }) => {
  return (
    <table
      width="100%"
      cellPadding="0"
      cellSpacing="0"
      style={{ borderCollapse: 'collapse' }}
    >
      <tbody>
        <tr>
          <td
            style={{
              backgroundColor: '#5469d4',
              padding: '24px 48px',
              textAlign: 'center' as const,
            }}
          >
            <table
              width="100%"
              cellPadding="0"
              cellSpacing="0"
              style={{ borderCollapse: 'collapse' }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#ffffff',
                      fontFamily:
                        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                    }}
                  >
                    Abhishek Garg
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      fontSize: '12px',
                      color: '#e0e0e0',
                      paddingTop: '4px',
                      fontFamily:
                        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                    }}
                  >
                    Full Stack Developer
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td
            style={{
              backgroundColor: '#4354b5',
              padding: '16px 48px',
              textAlign: 'center' as const,
            }}
          >
            <span
              style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#ffffff',
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
              }}
            >
              {title}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default EmailHeader;
