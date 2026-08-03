import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function contactApiDevPlugin() {
  return {
    name: 'contact-api-dev-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/contact.php', (req: any, res: any, _next: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk.toString();
        });

        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            let resendApiKey = process.env.RESEND_API_KEY || '';
            if (!resendApiKey) {
              try {
                const fs = await import('fs');
                const path = await import('path');
                const configPath = path.resolve('public/api/config.php');
                if (fs.existsSync(configPath)) {
                  const content = fs.readFileSync(configPath, 'utf-8');
                  const match = content.match(/'resend_api_key'\s*=>\s*'([^']+)'/);
                  if (match) resendApiKey = match[1];
                }
              } catch (e) { /* ignore */ }
            }
            const recipientEmail = 'contact@frostrek.com';
            const senderEmail = 'Frostrek AI Portal <contact@frostrek.com>';

            const firstName = data.firstName || '';
            const lastName = data.lastName || '';
            const fullName = `${firstName} ${lastName}`.trim();
            const workEmail = data.workEmail || '';
            const company = data.company || 'N/A';
            const jobTitle = data.jobTitle || 'N/A';
            const reachType = data.reachType || 'Sales Enquiry';
            const projectDetails = data.projectDetails || '';

            if (!firstName || !lastName || !workEmail || !projectDetails) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Required fields are missing.' }));
              return;
            }

            const mailtoSubject = encodeURIComponent("Re: New Contact Inquiry: " + reachType);
            const htmlTemplate = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>New Message from Frostrek Website</title></head>
<body style="margin:0;padding:28px 24px;background-color:#FFFFFF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1E293B;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#FFFFFF;width:100%;">
    <tr><td style="padding-bottom:18px;border-bottom:2px solid #2D6A4F;width:100%;"><h1 style="margin:0;color:#2D6A4F;font-size:24px;font-weight:700;font-family:'Playfair Display',Georgia,serif;">New Message from Frostrek Website</h1></td></tr>
    <tr><td style="padding:20px 0 16px;border-bottom:1px solid #E2E8F0;width:100%;"><p style="margin:0;font-size:15px;color:#334155;">You have received a new inquiry via the Contact Form.</p></td></tr>
    <tr><td style="padding:0;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;line-height:1.6;width:100%;">
        <tr><td width="140" valign="top" style="padding:16px 0;color:#475569;font-weight:700;border-bottom:1px solid #F1F5F9;">Name:</td><td style="padding:16px 0;color:#0F172A;font-weight:600;border-bottom:1px solid #F1F5F9;">${fullName}</td></tr>
        <tr><td width="140" valign="top" style="padding:16px 0;color:#475569;font-weight:700;border-bottom:1px solid #F1F5F9;">Email:</td><td style="padding:16px 0;border-bottom:1px solid #F1F5F9;"><a href="mailto:${workEmail}" style="color:#2D6A4F;font-weight:600;text-decoration:none;">${workEmail}</a></td></tr>
        <tr><td width="140" valign="top" style="padding:16px 0;color:#475569;font-weight:700;border-bottom:1px solid #F1F5F9;">Company:</td><td style="padding:16px 0;color:#0F172A;border-bottom:1px solid #F1F5F9;">${company}</td></tr>
        <tr><td width="140" valign="top" style="padding:16px 0;color:#475569;font-weight:700;border-bottom:1px solid #F1F5F9;">Job Title:</td><td style="padding:16px 0;color:#0F172A;border-bottom:1px solid #F1F5F9;">${jobTitle}</td></tr>
        <tr><td width="140" valign="top" style="padding:16px 0;color:#475569;font-weight:700;border-bottom:1px solid #F1F5F9;">Subject:</td><td style="padding:16px 0;color:#0F172A;border-bottom:1px solid #F1F5F9;">New Contact Inquiry: ${reachType}</td></tr>
        <tr><td width="140" valign="top" style="padding:22px 0;color:#475569;font-weight:700;">Message:</td><td style="padding:22px 0;"><div style="background-color:#FAFCFB;border:1px solid #E2E8F0;border-left:4px solid #2D6A4F;border-radius:8px;padding:18px;color:#1E293B;font-size:14px;line-height:1.6;white-space:pre-wrap;width:100%;box-sizing:border-box;">${projectDetails}</div></td></tr>
        <tr><td colspan="2" align="center" style="padding:36px 0 20px;"><a href="mailto:${workEmail}?subject=${mailtoSubject}" style="display:inline-block;background-color:#2D6A4F;color:#FFFFFF;font-weight:600;font-size:15px;text-decoration:none;padding:14px 32px;border-radius:9999px;box-shadow:0 4px 6px -1px rgba(45,106,79,0.25);">Reply Directly to &rarr;</a></td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

            const resendResponse = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                from: senderEmail,
                to: [recipientEmail],
                reply_to: workEmail,
                subject: `New Contact Inquiry: ${reachType} - ${fullName}`,
                html: htmlTemplate
              })
            });

            const resendData: any = await resendResponse.json();
            res.statusCode = resendResponse.status;
            res.setHeader('Content-Type', 'application/json');
            if (resendResponse.ok) {
              res.end(JSON.stringify({ success: true, message: 'Message sent successfully via dev server.', id: resendData.id }));
            } else {
              res.end(JSON.stringify({ success: false, error: resendData.message || 'Resend API error', details: resendData }));
            }
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err.message || 'Internal Dev Server Error' }));
          }
        });
      });
    }
  }
}



// https://vite.dev/config/
export default defineConfig({
  plugins: [
    contactApiDevPlugin(),
    react(),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
    chunkSizeWarningLimit: 1600,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-gsap': ['gsap', '@gsap/react'],
          'vendor-lenis': ['lenis'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
})
