<!doctype html>
<html lang="en">

<head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Oodomedlink</title>
      <style>
            /* CLIENT-SAFE INLINE STYLES RECOMMENDED — keep this block minimal for preview clients */
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
                  width: 100% !important
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
      style="background:#f4f6f8;margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">

      <!-- Hidden preheader text : shows in inbox preview -->


      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
                  <td align="center">

                        <!-- Outer container -->
                        <table class="container" width="600" cellpadding="0" cellspacing="0" role="presentation"
                              style="width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(10,15,30,0.08);">

                              <!-- Header -->
                              <tr>
                                    <td
                                          style="padding:24px 28px ;background:linear-gradient(90deg,#0466fc 0%,#4CAF50 100%);color:white;">
                                          <h1 style="margin:0;font-size:20px;letter-spacing:0.2px;">
                                                {{ $receipient->full_name }} Test Result
                                          </h1>
                                          <p style="margin:6px 0 0;font-size:13px;opacity:0.95">Thank you for visiting
                                                {{ $clinic->name ?? '' }}
                                                </p>
                                                </td>
                                                </tr>

                                                <!-- Content -->
                                                <tr>
                                                      <td style="padding:28px;color:#0f1724;">

                                                            <p style="margin:0 0 16px;font-size:15px;">Hello {{ $receipient->full_name }},
                                                            </p>

                                                            <p style="margin:0 0 24px;font-size:15px;color:#334155;line-height:1.45;">
                                                                  Thank you for visiting {{ Str::ucfirst($clinic->name) ?? '' }}, here is your test result
                                                attaches to this mail.

                                          </p>

                                          <p style="margin:0 0 24px;font-size:15px;color:#334155;line-height:1.45;">
                                                {{ Str::ucfirst($notes) }}
                                          </p>

                                          <p style="margin:20px 0 0;font-size:13px;color:#64748b;">If you didn't request
                                                this, you can
                                                safely ignore this email.</p>

                                          <hr style="border:none;border-top:1px solid #eef2f7;margin:20px 0;" />

                                          <p style="margin:0;font-size:13px;color:#94a3b8;">Need help? Send a mail to
                                                <a href="mailto:{{ $clinic->email }} ">{{ Str::ucfirst($clinic->name) }}</a>
                                                or contact {{ $clinic->phone_no }} for support.
                                          </p>

                                    </td>
                              </tr>

                              <!-- Footer -->
                              <tr>
                                    <td style="background:#fbfdff;padding:18px 24px 28px;color:#94a3b8;font-size:12px;">
                                          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr>
                                                      <td style="vertical-align:middle;">
                                                            <strong style="color:#0f1724;font-size:13px">{{ Str::ucfirst($clinic->name) }}</strong>
                                                            <div style="font-size:12px;margin-top:6px;">This email was
                                                                  sent to
                                                                  {{$receipient->full_name}}. © {{$year}} OodoMedlink
                                                            </div>
                                                      </td>
                                                </tr>
                                          </table>
                                    </td>
                              </tr>

                        </table>

                  </td>
            </tr>
      </table>

</body>

</html>