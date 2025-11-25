<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>Email verification</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Exo:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <style>
        /* CLIENT-SAFE INLINE STYLES RECOMMENDED — keep this block minimal for preview clients */
        body,
        table,
        td {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            font-family: 'Exo', sans-serif;
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
            background-color: #f8fafc;
            height: 100vh;
            display: flex;
            align-items: center;
            padding: 40px;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important
        }

        .mobile-center {
            text-align: center !important
        }

        /* Container styles */
        .container {
            width: 600px;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(10, 15, 30, 0.08), 0 2px 4px -1px rgba(10, 15, 30, 0.06);
        }

        /* Header styles */
        .header-bg {
            padding: 24px 28px;
            background: linear-gradient(90deg, #0466fc 0%, #4CAF50 100%) !important;
            color: #ffffff !important;
            border-radius: 12px 12px 0 0;
        }

        .logo-text-wrapper {
            width: 100%;
        }

        .logo-row {
            display: flex;
            gap: 16px;
            justify-content: center;
            align-items: center;
        }

        .logo-cell {
            background-color: #ffffff;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            padding: 16px 32px;
        }

        .logo-cell img {
            width: 50%;
            height: auto;
        }

        /* Content styles */
        .content-cell {
            padding: 28px;
            color: #0f1724 !important;
        }

        .text-md {
            font-size: 16px;
            line-height: 1.5;
            margin: 0 0 16px 0;
        }

        .text-lg {
            font-size: 18px;
        }

        .text-xl {
            font-size: 20px;
        }

        .text-3xl {
            font-size: 30px;
        }

        .font-extrabold {
            font-weight: 800;
        }

        .font-bold {
            font-weight: 700;
        }

        .text-black {
            color: #000000;
        }

        .text-white {
            color: #ffffff;
        }

        /* OTP styles */
        .otp-container {
            margin: 18px 0 26px;
            width: 100%;
        }

        .otp-bg {
            display: flex;
            justify-content: center;
        }

        .otp {
            background-image: linear-gradient(90deg, #0466fc 0%, #4CAF50 100%);
            color: #ffffff;
            border-radius: 8px;
            padding: 12px;
            letter-spacing: 0.1em;
            font-size: 30px;
            font-weight: 800;
            display: inline-block;
            margin: 0;
        }

        /* Footer styles */
        .footer-bg {
            background: #fbfdff !important;
            padding: 18px 24px 28px;
            color: #94a3b8 !important;
            font-size: 12px;
            border-radius: 0 0 12px 12px;
        }

        .footer-table {
            width: 100%;
            display: flex;
            align-items: center;
        }

        .footer-left {
            width: 80%;
        }

        .footer-right {
            width: 20%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
            color: #000000;
            font-weight: 800;
        }

        .footer-right a {
            color: #000000;
            text-decoration: none;
            transition: all 0.3s ease-in-out;
        }

        .footer-right a:hover {
            transform: translateY(-4px);
            color: #2563eb;
        }

        .text-gray-600 {
            color: #4b5563;
            font-weight: 800;
            font-size: 16px;
        }

        /* Dark mode override styles */
        @media (prefers-color-scheme: dark) {
            .light-only {
                background-color: #ffffff !important;
            }

            .header-bg {
                background: linear-gradient(90deg, #0466fc 0%, #4CAF50 100%) !important;
            }

            .text-dark {
                color: #0f1724 !important;
            }

            .text-gray {
                color: #334155 !important;
            }

            .text-light-gray {
                color: #64748b !important;
            }

            .footer-bg {
                background: #fbfdff !important;
            }

            .border-color {
                border-color: #e6eef9 !important;
            }

            .otp-bg {
                background: linear-gradient(180deg, #ffffff, #fcfeff) !important;
            }
        }

        /* Force light mode for specific email clients */
        [data-ogsc] .light-only {
            background-color: #ffffff !important;
        }

        [data-ogsc] .header-bg {
            background: linear-gradient(90deg, #0466fc 0%, #4CAF50 100%) !important;
        }

        @media screen and (max-width:600px) {
            .container {
                width: 100% !important;
                padding: 16px !important
            }

            .otp {
                font-size: 34px !important
            }

            .logo-text-wrapper {
                display: block !important;
            }

            .logo-cell {
                display: block !important;
                margin-bottom: 12px !important;
            }
        }
    </style>

</head>

<body>

    <!-- Hidden preheader text : shows in inbox preview -->
    <div style="display:none;max-height:0px;overflow:hidden;mso-hide:all;">Use the one-time code to verify your email.
        This code expires in 10 minutes.</div>

    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
            <td align="center">

                <!-- Outer container -->
                <table class="container light-only" width="600" cellpadding="0" cellspacing="0" role="presentation">

                    <!-- Header -->
                    <tr>
                        <td class="header-bg">
                        
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" class="logo-text-wrapper">
                                <tr class="logo-row">
                                    <!-- Logo space -->
                                    <td class="logo-cell">
                                        <img src="{{ asset('assets/logo1.jpg') }}" alt="Company Logo" width="100" height="48">
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td class="content-cell">

                            <p class="text-md font-extrabold text-black">Hi There,</p>

                            <p class="text-md font-bold">Thanks for creating an account. Use the one-time code below to verify your email. The code
                                will expire in <strong class="text-xl font-extrabold">10 minutes</strong>.</p>

                            <!-- OTP box -->
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" class="otp-container">
                                <tr>
                                    <td align="center">
                                        <div class="otp-bg">
                                            <p class="otp">123456</p>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <p class="text-black font-extrabold text-md">
                                If you didn't request this, you can safely ignore this email — no changes were made to your account.</p>

                            <hr style="border:none;border-top:1px solid #eef2f7;margin:20px 0;" />

                            <p class="text-md font-extrabold">Need help? Reply to this email or contact our support.</p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td class="footer-bg">
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" class="footer-table">
                                <tr>
                                    <td class="footer-left">
                                        <strong class="text-black font-extrabold text-lg">Your Company</strong>
                                        <div class="text-gray-600">This email was sent to Test Patient. © 2025 OodoMedlink</div>
                                    </td>
                                    <td class="footer-right" style="vertical-align:middle;">
                                        <a href="#" style="margin-right:15px;">Help</a>
                                        <a href="#">Privacy</a>
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