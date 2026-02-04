import * as React from 'react';

export const EmailFooter: React.FC = () => {
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
              backgroundColor: '#f6f9fc',
              padding: '24px 48px',
              borderTop: '1px solid #e6ebf1',
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
                      textAlign: 'center' as const,
                      paddingBottom: '16px',
                    }}
                  >
                    <a
                      href="https://github.com/abhishekgarg"
                      style={{
                        color: '#5469d4',
                        textDecoration: 'none',
                        marginRight: '16px',
                        fontSize: '14px',
                        fontFamily:
                          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                      }}
                    >
                      GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/abhishekgarg"
                      style={{
                        color: '#5469d4',
                        textDecoration: 'none',
                        marginRight: '16px',
                        fontSize: '14px',
                        fontFamily:
                          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                      }}
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://abhishekgarg.dev"
                      style={{
                        color: '#5469d4',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontFamily:
                          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                      }}
                    >
                      Portfolio
                    </a>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: 'center' as const,
                      color: '#8898aa',
                      fontSize: '12px',
                      lineHeight: '18px',
                      fontFamily:
                        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                    }}
                  >
                    © {new Date().getFullYear()} Abhishek Garg. All rights
                    reserved.
                    <br />
                    This is an automated email. Please do not reply directly to
                    this message.
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default EmailFooter;
