# Audit Email Setup Guide

The audit tool now sends PDF reports via email using Resend. Follow these steps to configure email sending:

## 1. Get a Resend API Key

1. Go to [https://resend.com](https://resend.com) and sign up for a free account
2. Navigate to **API Keys** in your dashboard
3. Create a new API key
4. Copy the API key (starts with `re_`)

## 2. Verify Your Domain (Optional but Recommended)

For production, you should verify your domain in Resend:
1. Go to **Domains** in your Resend dashboard
2. Add your domain (e.g., `novashift.ai`)
3. Add the DNS records provided by Resend to your domain's DNS settings
4. Wait for verification (usually takes a few minutes)

## 3. Configure Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# Resend API Key (required)
RESEND_API_KEY=re_your_api_key_here

# Email sender configuration (optional - defaults provided)
RESEND_FROM_EMAIL=noreply@novashift.ai
RESEND_FROM_NAME=NovaShift

# Site URL (for email links - optional)
NEXT_PUBLIC_SITE_URL=https://novashift.ai
```

### For Development:
- You can use Resend's test domain: `onboarding@resend.dev` (default)
- No domain verification needed for testing

### For Production:
- Use your verified domain email: `noreply@novashift.ai`
- Make sure your domain is verified in Resend

## 4. Test the Email Functionality

1. Complete an audit on your site
2. Enter your email address when prompted
3. Check your inbox for the PDF report

## Troubleshooting

### Email not sending?
- Check that `RESEND_API_KEY` is set correctly
- Verify the API key is active in Resend dashboard
- Check server logs for error messages
- Make sure you're not hitting Resend's rate limits (free tier: 100 emails/day)

### PDF not attaching?
- Check server logs for PDF generation errors
- Verify `@react-pdf/renderer` is installed correctly

### Domain verification issues?
- Double-check DNS records are correct
- Wait a few minutes for DNS propagation
- Use Resend's test domain for development

## Email Template

The email includes:
- Professional HTML template with NovaShift branding
- PDF attachment with the full audit report
- Call-to-action button linking to contact page
- Summary of the report contents

You can customize the email template in `app/[locale]/audit/api/send-email/route.ts`.




