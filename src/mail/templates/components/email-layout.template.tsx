import * as React from 'react';
import { Html, Head, Body } from '@react-email/components';
import { EmailHeader } from './email-header.template';
import { EmailFooter } from './email-footer.template';
import { EmailSignature } from './email-signature.template';

interface EmailLayoutProps {
  title: string;
  children: React.ReactNode;
  showSignature?: boolean;
}

export const EmailLayout: React.FC<EmailLayoutProps> = ({
  title,
  children,
  showSignature = true,
}) => {
  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: '#f6f9fc',
          fontFamily:
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
          margin: 0,
          padding: 0,
        }}
      >
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          style={{
            borderCollapse: 'collapse',
            backgroundColor: '#f6f9fc',
            padding: '40px 0',
          }}
        >
          <tbody>
            <tr>
              <td align="center">
                <table
                  width="600"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{
                    borderCollapse: 'collapse',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <tbody>
                    {/* Header */}
                    <tr>
                      <td>
                        <EmailHeader title={title} />
                      </td>
                    </tr>

                    {/* Body Content */}
                    <tr>
                      <td style={{ padding: '32px 48px' }}>
                        {children}
                        {showSignature && <EmailSignature />}
                      </td>
                    </tr>

                    {/* Footer */}
                    <tr>
                      <td>
                        <EmailFooter />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </Body>
    </Html>
  );
};

export default EmailLayout;
