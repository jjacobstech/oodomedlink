<!doctype html>
<html lang="en">

<head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Lab Test Results - OodoMedlink</title>
      <style>
            body,
            table,
            td {
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
            }

            img {
                  border: 0;
                  height: auto;
                  line-height: 100%;
                  outline: none;
                  text-decoration: none;
                  -ms-interpolation-mode: bicubic
            }

            table {
                  border-collapse: collapse !important
            }

            body {
                  margin: 0;
                  padding: 0;
                  width: 100% !important;
                  background-color: #f4f6f8;
            }

            a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: none !important
            }

            .mobile-center {
                  text-align: center !important
            }

            @media screen and (max-width:600px) {
                  .container {
                        width: 100% !important;
                        padding: 16px !important
                  }

                  .otp {
                        font-size: 34px !important
                  }
            }
      </style>
</head>

<body
      style="background-color:#f4f6f8;margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
                  <td align="center">
                  
                        <!-- Outer container -->
                        <table class="container" width="600" cellpadding="0" cellspacing="0" role="presentation"
                              style="width:600px;background-color:#ffffff;border-radius:12px;box-shadow:0 2px 8px rgba(10,15,30,0.1);overflow:hidden;">

                              <!-- Header -->
                              <tr>
                                    <td style="padding:24px 28px;background:linear-gradient(90deg,#0466fc 0%,#4CAF50 100%);color:white;">
                                          <h1 style="margin:0;font-size:20px;font-weight:600;letter-spacing:0.2px;line-height:1.4;">
                                                {{ $receipient->full_name }}'s Test Result
                                          </h1>
                                          <p style="margin:8px 0 0;font-size:13px;color:white;">
                                                Thank you for visiting {{ $clinic->name ?? 'OodoMedlink' }}
                                          </p>
                                    </td>
                              </tr>

                              <!-- Content -->
                              <tr>
                                    <td style="padding:28px;color:#0f1724;font-size:15px;line-height:1.6;">
                                    
                                          <p style="margin:0 0 16px;font-size:15px;color:#0f1724;">
                                                Hello {{ $receipient->full_name }},
                                          </p>

                                          <p style="margin:0 0 24px;font-size:15px;color:#334155;line-height:1.6;">
                                                Thank you for visiting
                                                {{ Str::ucfirst($clinic->name) ?? 'OodoMedlink' }}. Your test results
                                                are attached to this email.
                                          </p>

                                          @if ($notes)
                                                                  <div style="margin:20px 0;padding:16px;background-color:#f9fafb;border-left:4px solid #0466fc;border-radius:4px;">
                                                                          <p style="margin:0;font-size:15px;color:#334155;line-height:1.6;">
                                                                                    {{ strip_tags($notes) }}
                                                                          </p>
                                                                  </div>
                                                            @endif
                                          <p style="margin:24px 0 0;font-size:13px;color:#64748b;line-height:1.5;">
                                                If you didn't request this, you can safely ignore this email.
                                          </p>
                                          
                                          <hr style="border:none;border-top:1px solid #eef2f7;margin:24px 0;" />

                                          <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.6;">
                                                <strong style="color:#0f1724;">Need help?</strong><br>
                                                Email: <a href="mailto:{{ $clinic->email }}"
                                                      style="color:#0466fc;text-decoration:none;">{{ $clinic->email }}</a><br>
                                                Phone: {{ $clinic->phone_no }}<br>
                                                Organization: {{ Str::ucfirst($clinic->name) }}
                                          </p>

                                    </td>
                              </tr>

                              <!-- Footer -->
                        <tr>
                              <td style="padding:28px;color:#0f1724;font-size:15px;line-height:1.6;">
                              
                                    This is a transactional healthcare communication sent by
                              <span style="text-transform: capitalize">{{ $clinic->name }}</span> via OodoMedlink.<br>
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