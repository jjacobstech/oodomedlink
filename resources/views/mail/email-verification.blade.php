<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email verification</title>
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
    <div style="display:none;max-height:0px;overflow:hidden;mso-hide:all;">Use the one-time code to verify your email.
        This code expires in 10 minutes.</div>

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
                            <h1 style="margin:0;font-size:20px;letter-spacing:0.2px;">Verify your email</h1>
                            <p style="margin:6px 0 0;font-size:13px;opacity:0.95">Enter the code below to confirm your
                                email address.</p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding:28px;color:#0f1724;">

                            <p style="margin:0 0 16px;font-size:15px;">Hi There,</p>

                            <p style="margin:0 0 24px;font-size:15px;color:#334155;line-height:1.45;">Thanks for
                                creating an account. Use the one-time code below to verify your email. The code will
                                expire in <strong>10 minutes</strong>.</p>

                            <!-- OTP box -->
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                                style="margin:18px 0 26px;">
                                <tr>
                                    <td align="center">
                                        <div
                                            style="display:inline-block;padding:18px 28px;border-radius:12px;border:1px dashed #e6eef9;background:linear-gradient(180deg, #ffffff, #fcfeff);">
                                            <p style="margin:0;font-size:28px;font-weight:700;letter-spacing:4px;color:#0f1724"
                                                class="otp">
                                                {{ $otp}}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- Button fallback -->
                            {{-- <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                    <td align="center">
                                        <a href="<!--{{verification_url}}-->"
                                            style="display:inline-block;padding:12px 22px;border-radius:10px;background:#0466fc;color:#ffffff;text-decoration:none;font-weight:600;border:1px solid rgba(0,0,0,0.03);box-shadow:0 6px 18px rgba(4,102,252,0.12);">Verify
                                            email</a>
                                    </td>
                                </tr>
                            </table> --}}

                            <p style="margin:20px 0 0;font-size:13px;color:#64748b;">If you didn't request this, you can
                                safely ignore this email — no changes were made to your account.</p>

                            <hr style="border:none;border-top:1px solid #eef2f7;margin:20px 0;" />

                            <p style="margin:0;font-size:13px;color:#94a3b8;">Need help? Reply to this email or contact
                                our support.</p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background:#fbfdff;padding:18px 24px 28px;color:#94a3b8;font-size:12px;">
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                    <td style="vertical-align:middle;">
                                        <strong style="color:#0f1724;font-size:13px">Your Company</strong>
                                        <div style="font-size:12px;margin-top:6px;">This email was sent to
                                            {{$recipient}}. © {{$year}} OodoMedlink
                                        </div>
                                    </td>
                                    <td align="right" style="vertical-align:middle;">
                                        <a href="#"
                                            style="text-decoration:none;color:#0466fc;font-weight:600;margin-left:8px;">Help</a>
                                        <span style="color:#cbd5e1;margin:0 6px">·</span>
                                        <a href="#"
                                            style="text-decoration:none;color:#4CAF50;font-weight:600;margin-left:8px;">Privacy</a>
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