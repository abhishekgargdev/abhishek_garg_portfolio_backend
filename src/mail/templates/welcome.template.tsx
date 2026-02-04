import * as React from 'react';
import { EmailLayout } from './components';

interface WelcomeEmailProps {
  userName: string;
  loginUrl: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  userName,
  loginUrl,
}) => {
  return (
    <EmailLayout title="Welcome to Our Platform">
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

          {/* Welcome Message */}
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
              Welcome to Abhishek Garg's Portfolio Platform! We're thrilled to
              have you on board. Your account has been successfully created.
            </td>
          </tr>

          {/* Features List */}
          <tr>
            <td style={{ paddingBottom: '16px' }}>
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
                        fontSize: '16px',
                        lineHeight: '1.5',
                        color: '#484848',
                        paddingBottom: '12px',
                        fontFamily:
                          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                      }}
                    >
                      Here's what you can do with your account:
                    </td>
                  </tr>
                  {[
                    'View and explore portfolio projects',
                    'Access exclusive content and resources',
                    'Connect and collaborate on projects',
                    'Stay updated with the latest updates',
                  ].map((feature, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          fontSize: '14px',
                          lineHeight: '1.5',
                          color: '#666666',
                          paddingLeft: '16px',
                          paddingBottom: '8px',
                          fontFamily:
                            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                        }}
                      >
                        • {feature}
                      </td>
                    </tr>
                  ))}
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
                        Get Started
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Help Text */}
          <tr>
            <td
              style={{
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#8898aa',
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
              }}
            >
              If you have any questions or need assistance, feel free to reach
              out. We're here to help!
            </td>
          </tr>
        </tbody>
      </table>
    </EmailLayout>
  );
};

export default WelcomeEmail;
