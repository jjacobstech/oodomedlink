<!doctype html>
<html lang="en">

<head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Health Update – OodoMedlink</title>
      <style>
            body {
                  margin: 0;
                  padding: 0;
                  background-color: #f4f6f8;
                  font-family: Arial, Helvetica, sans-serif;
                  color: #0f1724;
            }

            table {
                  border-collapse: collapse;
            }

            .container {
                  width: 600px;
                  max-width: 100%;
                  background-color: #ffffff;
                  border-radius: 8px;
            }

            .header {
                  background-color: #0466fc;
                  color: #ffffff;
                  padding: 20px 24px;
            }

            .content {
                  padding: 24px;
                  font-size: 14px;
                  line-height: 1.6;
            }

            .footer {
                  padding: 20px 24px;
                  font-size: 12px;
                  color: #64748b;
                  background-color: #fbfdff;
                  border-top: 1px solid #eef2f7;
            }

            a {
                  color: #0466fc;
                  text-decoration: none;
            }

            @media screen and (max-width: 600px) {
                  .container {
                        width: 100% !important;
                  }
            }
      </style>
</head>

<body>
      <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                  <td align="center" style="padding:24px;">

                        <table class="container" cellpadding="0" cellspacing="0">
                              <!-- Header -->
                              <tr>
                                    <td class="header">
                                          <strong>OodoMedlink</strong><br>
                                          <span style="font-size:13px;">
                                                Secure Health Communication
                                          </span>
                                    </td>
                              </tr>

                              <!-- Content -->
                              <tr>
                                    <td class="content">
                                          <p>
                                                Hello {{ $receipient->full_name }},
                                          </p>

                                          <p>
                                                A new health update related to your recent visit at
                                                <strong>{{ Str::ucfirst($clinic->name) }}</strong> is now available.
                                          </p>
                                          
                                          <p>
                                                For privacy and security reasons, medical information is not included
                                                directly in this email.
                                          </p>
                                          
                                          <p>
                                                Please sign in to the clinic portal to securely view your information.
                                          </p>

                                          @if ($notes)
                                                                    <div style="margin:16px 0;padding:12px;background-color:#f9fafb;border-left:3px solid #0466fc;">
                                                                              <strong>Additional Notes</strong><br>
                                                                              {{ strip_tags($notes) }}
                                                                        </div>
                                                            @endif

                                          <p style="font-size:13px;color:#64748b;">
                                                If you did not request this update, no action is required.
                                          </p>
                                    </td>
                              </tr>

                              <!-- Footer -->
                              <tr>
                                    <td class="footer">
                                          <strong>{{ Str::ucfirst($clinic->name) }}</strong><br>
                                          Email: <a href="mailto:{{ $clinic->email }}">{{ $clinic->email }}</a><br>
                                          Phone: {{ $clinic->phone_no }}<br><br>
                                    
                                          This is a transactional healthcare communication sent by
                                          {{ $clinic->name }} via OodoMedlink.<br>
                                          No promotional content is included.
                                    
                                          <br><br>
                                          © {{ $year }} OodoMedlink. All rights reserved.
                                    </td>
                                    </tr>
                        </table>

                  </td>
            </tr>
      </table>
</body>

</html>