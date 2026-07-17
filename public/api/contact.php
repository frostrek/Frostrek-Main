<?php
/**
 * Frostrek AI — Resend API Contact Form Handler for Hostinger Production
 * 
 * Handles POST requests from ContactPage.tsx and sends styled HTML emails
 * directly via Resend REST API (https://api.resend.com/emails).
 */

// Handle CORS for local testing & development if needed
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed. Only POST is accepted."]);
    exit();
}

// Resend API Configuration
// API Key provided for Frostrek AI domain (frostrek.com)
$resendApiKey = 're_AqHk2y24_C7LYQDfLwyxp74WTKwcvBWnS';
$recipientEmail = 'contact@frostrek.com';
$senderEmail = 'Frostrek AI Portal <contact@frostrek.com>';

// Read JSON input from request body
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid JSON payload received."]);
    exit();
}

// Extract and validate required fields
$firstName = trim($data['firstName'] ?? '');
$lastName = trim($data['lastName'] ?? '');
$company = trim($data['company'] ?? 'N/A');
$jobTitle = trim($data['jobTitle'] ?? 'N/A');
$workEmail = trim($data['workEmail'] ?? '');
$reachType = trim($data['reachType'] ?? 'Sales Enquiry');
$projectDetails = trim($data['projectDetails'] ?? '');

if (empty($firstName) || empty($lastName) || empty($workEmail) || empty($projectDetails)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Required fields are missing."]);
    exit();
}

if (!filter_var($workEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid email address."]);
    exit();
}

$fullName = $firstName . ' ' . $lastName;

// Sanitize inputs for safe display inside HTML email template
$safeFullName = htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8');
$safeFirstName = htmlspecialchars($firstName, ENT_QUOTES, 'UTF-8');
$safeLastName = htmlspecialchars($lastName, ENT_QUOTES, 'UTF-8');
$safeCompany = htmlspecialchars($company, ENT_QUOTES, 'UTF-8');
$safeJobTitle = htmlspecialchars($jobTitle, ENT_QUOTES, 'UTF-8');
$safeWorkEmail = htmlspecialchars($workEmail, ENT_QUOTES, 'UTF-8');
$safeReachType = htmlspecialchars($reachType, ENT_QUOTES, 'UTF-8');
$safeProjectDetails = nl2br(htmlspecialchars($projectDetails, ENT_QUOTES, 'UTF-8'));
$mailtoSubject = rawurlencode("Re: New Contact Inquiry: " . $reachType);

// Construct Frostrek AI website-themed full-width HTML email template
$htmlTemplate = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Message from Frostrek Website</title>
</head>
<body style="margin: 0; padding: 28px 24px; background-color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFFFFF; width: 100%;">
        <!-- Header Title -->
        <tr>
            <td style="padding-bottom: 18px; border-bottom: 2px solid #2D6A4F; width: 100%;">
                <h1 style="margin: 0; color: #2D6A4F; font-size: 24px; font-weight: 700; font-family: 'Playfair Display', Georgia, serif; letter-spacing: -0.01em;">
                    New Message from Frostrek Website
                </h1>
            </td>
        </tr>

        <!-- Subtitle -->
        <tr>
            <td style="padding: 20px 0 16px; border-bottom: 1px solid #E2E8F0; width: 100%;">
                <p style="margin: 0; font-size: 15px; color: #334155;">
                    You have received a new inquiry via the Contact Form.
                </p>
            </td>
        </tr>

        <!-- Details Table -->
        <tr>
            <td style="padding: 0; width: 100%;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; line-height: 1.6; width: 100%;">
                    <!-- Name -->
                    <tr>
                        <td width="140" valign="top" style="padding: 16px 0; color: #475569; font-weight: 700; border-bottom: 1px solid #F1F5F9;">Name:</td>
                        <td style="padding: 16px 0; color: #0F172A; font-weight: 600; border-bottom: 1px solid #F1F5F9;">{$safeFullName}</td>
                    </tr>
                    <!-- Email -->
                    <tr>
                        <td width="140" valign="top" style="padding: 16px 0; color: #475569; font-weight: 700; border-bottom: 1px solid #F1F5F9;">Email:</td>
                        <td style="padding: 16px 0; border-bottom: 1px solid #F1F5F9;">
                            <a href="mailto:{$safeWorkEmail}" style="color: #2D6A4F; font-weight: 600; text-decoration: none;">{$safeWorkEmail}</a>
                        </td>
                    </tr>
                    <!-- Company -->
                    <tr>
                        <td width="140" valign="top" style="padding: 16px 0; color: #475569; font-weight: 700; border-bottom: 1px solid #F1F5F9;">Company:</td>
                        <td style="padding: 16px 0; color: #0F172A; border-bottom: 1px solid #F1F5F9;">{$safeCompany}</td>
                    </tr>
                    <!-- Job Title -->
                    <tr>
                        <td width="140" valign="top" style="padding: 16px 0; color: #475569; font-weight: 700; border-bottom: 1px solid #F1F5F9;">Job Title:</td>
                        <td style="padding: 16px 0; color: #0F172A; border-bottom: 1px solid #F1F5F9;">{$safeJobTitle}</td>
                    </tr>
                    <!-- Subject -->
                    <tr>
                        <td width="140" valign="top" style="padding: 16px 0; color: #475569; font-weight: 700; border-bottom: 1px solid #F1F5F9;">Subject:</td>
                        <td style="padding: 16px 0; color: #0F172A; border-bottom: 1px solid #F1F5F9;">New Contact Inquiry: {$safeReachType}</td>
                    </tr>
                    <!-- Message -->
                    <tr>
                        <td width="140" valign="top" style="padding: 22px 0; color: #475569; font-weight: 700;">Message:</td>
                        <td style="padding: 22px 0;">
                            <div style="background-color: #FAFCFB; border: 1px solid #E2E8F0; border-left: 4px solid #2D6A4F; border-radius: 8px; padding: 18px; color: #1E293B; font-size: 14px; line-height: 1.6; white-space: pre-wrap; width: 100%; box-sizing: border-box;">{$safeProjectDetails}</div>
                        </td>
                    </tr>
                    <!-- Reply Directly To Button -->
                    <tr>
                        <td colspan="2" align="center" style="padding: 36px 0 20px;">
                            <a href="mailto:{$safeWorkEmail}?subject={$mailtoSubject}" style="display: inline-block; background-color: #2D6A4F; color: #FFFFFF; font-weight: 600; font-size: 15px; text-decoration: none; padding: 14px 32px; border-radius: 9999px; box-shadow: 0 4px 6px -1px rgba(45, 106, 79, 0.25);">
                                Reply Directly to &rarr;
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;

// Prepare payload for Resend REST API
$postData = [
    "from" => $senderEmail,
    "to" => [$recipientEmail],
    "reply_to" => $workEmail,
    "subject" => "New Contact Inquiry: {$safeReachType} - {$safeFullName}",
    "html" => $htmlTemplate
];

// Execute cURL request to Resend
$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $resendApiKey,
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// Check Resend response
if ($curlError) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "cURL error while calling Resend: " . $curlError]);
    exit();
}

$responseData = json_decode($response, true);

if ($httpStatus >= 200 && $httpStatus < 300) {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Message sent successfully.",
        "id" => $responseData['id'] ?? null
    ]);
} else {
    http_response_code($httpStatus);
    $errorMsg = $responseData['message'] ?? 'Failed to send email via Resend API.';
    echo json_encode([
        "success" => false,
        "error" => $errorMsg,
        "details" => $responseData
    ]);
}
