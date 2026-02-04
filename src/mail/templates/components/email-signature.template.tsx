import * as React from 'react';

export const EmailSignature: React.FC = () => {
  return (
    <table
      width="100%"
      cellPadding="0"
      cellSpacing="0"
      style={{ borderCollapse: 'collapse' }}
    >
      <tbody>
        <tr>
          <td style={{ padding: '24px 0 0 0' }}>
            <table
              cellPadding="0"
              cellSpacing="0"
              style={{ borderCollapse: 'collapse' }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      borderTop: '1px solid #e6ebf1',
                      paddingTop: '20px',
                    }}
                  >
                    <table
                      cellPadding="0"
                      cellSpacing="0"
                      style={{ borderCollapse: 'collapse' }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              fontSize: '14px',
                              color: '#484848',
                              fontFamily:
                                '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                            }}
                          >
                            Best regards,
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              fontSize: '16px',
                              fontWeight: 'bold',
                              color: '#484848',
                              paddingTop: '8px',
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
                              color: '#8898aa',
                              paddingTop: '4px',
                              fontFamily:
                                '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                            }}
                          >
                            Full Stack Developer | MERN Stack Specialist
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default EmailSignature;
